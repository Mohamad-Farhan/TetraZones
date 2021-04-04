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
import Search from "../forms/Search";
import '../../../src/helper.css'

const { SubMenu, Item } = Menu;

const Header = () => {
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
        <Menu onClick={handleClick} selectedKeys={[current]} mode='vertical' className='nav-color'>
            <div className='float-right hover m-2'>
                <Link to="/">
                    <img src={Logo} className='img-fluid' />
                </Link>
            </div>

            <Item key="shop" icon={<ShoppingOutlined style={{ color: 'white', fontSize: '20px' }} />} className='float-right hover'>
                <Link to="/shop"><b className='nav-text-icon'>الكل</b></Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined style={{ color: 'white', fontSize: '20px' }} />} className='float-left hover'>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        <b className='nav-text-icon'>السلة</b>
                    </Badge>
                </Link>
            </Item>

            {!user && (
                <Item
                    key="login"
                    className="nav-text-icon float-left hover"
                    style={{ width: '150px' }} icon={<UserOutlined />}>
                    <Link to="/login"><b className="nav-text-icon">تسجيل الدخول</b></Link>
                </Item>
            )}
            {user && (
                <SubMenu
                    title={'Hello' && user.email && user.email.split("@")[0]}
                    className="nav-text-icon float-left hover"
                    style={{ width: '155px' }}
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

                    {user && user.role === "saller" && (
                        <Item>
                            <Link to="/saller/dashboard">صفحة البائع</Link>
                        </Item>
                    )}
                    <Item>
                        <Link to="/help">هل تحتاج مساعدة؟</Link>
                    </Item>

                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        تسجيل الخروج
          </Item>
                </SubMenu>
            )}
            {user && (
                <Item className='hover width'>
                    <Link to="/user/history"><b className="nav-text-icon">مشترياتك</b></Link>
                </Item>
            )}
        </Menu>
    );
};

export default Header;
