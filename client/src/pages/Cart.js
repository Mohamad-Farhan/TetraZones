import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import Header from '../components/nav/Header';

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return 3 + currentValue + nextValue.count * nextValue.price;
    }, 0);
  };



  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col" className='text-right'>الغاء المنتج</th>
          <th scope="col" className='text-right'>التوصيل</th>
          <th scope="col" className='text-right'>العدد</th>
          <th scope="col" className='text-right'> الرجاء اختيار اللون</th>
          <th scope="col" className='text-right'>الماركة</th>
          <th scope="col" className='text-right'>السعر</th>
          <th scope="col" className='text-right'>الأسم</th>
          <th scope="col" className='text-right'>الصورة</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <>
      <Header />
      <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-md-4 text-right">
            <h4>السلة</h4>
            <hr />
            <p>المنتجات</p>
            <p>يضاف 3 دنانير توصيل</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.price * c.count} JD = {c.title} x {c.count}
                </p>
              </div>
            ))}
            <hr />
            <b>{getTotal()} JD </b> :السعر الكامل
          <hr />
            {user ? (
              <>
                <button
                  onClick={saveCashOrderToDb}
                  className="btn btn-sm btn-warning mt-2"
                  disabled={!cart.length}
                >
                  شراء
              </button>
              </>
            ) : (
              <button className="btn btn-sm btn-primary mt-2">
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                >
                  سجل الدخول لاكمال عملية الشراء
              </Link>
              </button>
            )}
          </div>
          <div className="col-md-8">
            <h4 className='text-right'>السلة /المنتج {cart.length} </h4>

            {!cart.length ? (
              <p>
                .لايوجد منتجات <Link to="/shop">.اكمل الشراء</Link>
              </p>
            ) : (
              showCartItems()
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
