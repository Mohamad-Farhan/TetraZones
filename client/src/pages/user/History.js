import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import {
  getUserOrders,
} from "../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Header from '../../components/nav/Header'
import { Link } from "react-router-dom";

const History = () => {
  const [orders, setOrders] = useState([]);


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
    // eslint-disable-next-line
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">الشحن</th>
          <th scope="col">العدد</th>
          <th scope="col">اللون</th>
          <th scope="col">الماركة</th>
          <th scope="col">السعر</th>
          <th scope="col">الاسم</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
            <td>{p.count}</td>
            <td>{p.color}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.price}</td>
            <td>
              <Link to={`/product/${p.product.slug}`}>
                <b>{p.product.title}</b>
              </Link>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
        </div>
      </div>
    ));

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col text-center mt-4">
            <h4>
              {orders.length > 0 ? "علميات الشراء التي قمت بها" : "لايوجد عمليات شراء"}
            </h4>
            {showEachOrders()}
          </div>
          <div className="col-sm-0 mt-4">
            <UserNav />
          </div>

        </div>
      </div>
    </>
  );
};

export default History;
