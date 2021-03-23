import React, { useState, useEffect } from "react";
import SallerNav from "../../components/nav/SeallerNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import Header from '../../components/nav/Header'

const SallerWishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadWishlist();
        // eslint-disable-next-line
    }, []);

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            setWishlist(res.data.wishlist);
        });

    const handleRemove = (productId) =>
        removeWishlist(productId, user.token).then((res) => {
            loadWishlist();
        });

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col mt-4 text-right">
                        <h4>المفضلة</h4>

                        {wishlist.map((p) => (
                            <div key={p._id} className="alert alert-secondary">
                                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                                <span
                                    onClick={() => handleRemove(p._id)}
                                    className="btn btn-sm float-left"
                                >
                                    <DeleteOutlined className="text-danger float-left" />
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="col-sm-0 mt-4">
                        <SallerNav />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SallerWishlist;
