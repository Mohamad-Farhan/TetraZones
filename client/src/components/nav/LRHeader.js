import React, { useState } from "react";
import { Menu, Badge } from "antd";
import Logo from './logo6.png'
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const LRHeader = () => {
    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='sticky-top'>
            <Item className='float-right'>
                <img src={Logo} className='img-fluid' style={{ width: 200 }} alt="jsx-a11y/img-redundant-alt" />
                <Link to="/"></Link>
            </Item>

            <Item className='float-right' key="home" icon={<AppstoreOutlined />}>
                <Link to="/">الرئيسية</Link>
            </Item>

            <Item className='float-right' key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">الكل</Link>
            </Item>

            <Item className='float-right' key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        السلة
          </Badge>
                </Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-left">
                    <Link to="/register">انشاء حساب</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-left">
                    <Link to="/login">تسجيل الدخول</Link>
                </Item>
            )}

            {user && (
                <SubMenu
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split("@")[0]}
                    className="float-left"
                >
                    {user && user.role === "subscriber" && (
                        <Item>
                            <Link to="/user/history">صفحة المستخدم</Link>
                        </Item>
                    )}

                    {user && user.role === "admin" && (
                        <Item>
                            <Link to="/admin/dashboard">صفحة الأدمن</Link>
                        </Item>
                    )}

                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        تسجيل الخروج
          </Item>
                </SubMenu>
            )}
        </Menu>
    );
};

export default LRHeader;
