import React from "react";
import { Link } from "react-router-dom";

const SallerNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/user/history" className="nav-link">
                    عمليات الشراء
        </Link>
            </li>
            <li className="nav-item">
                <Link to="/saller/product" className="nav-link">
                    اضف منتج
        </Link>
            </li>

            <li className="nav-item">
                <Link to="/user/password" className="nav-link">
                    تغير كلمة السر
        </Link>
            </li>

            <li className="nav-item">
                <Link to="/saller/wishlist" className="nav-link">
                    المفضلة
        </Link>
            </li>
        </ul>
    </nav>
);

export default SallerNav;
