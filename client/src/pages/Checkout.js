import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Form } from 'react-bootstrap';
import Header from '../components/nav/Header';
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  saveUserCity,
  saveUserFirstName,
  saveUserLastName,
  saveUserPhoneNumber,
  saveUserRegion
} from "../functions/user";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState('');
  const [region, setRegion] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // eslint-disable-next-line
  const [firstNameSaved, setFirstNameSaved] = useState(false);
  // eslint-disable-next-line
  const [lastNameSaved, setLastNameSaved] = useState(false);
  // eslint-disable-next-line
  const [regionSaved, setRegionSaved] = useState(false);
  // eslint-disable-next-line
  const [citySaved, setCitySaved] = useState(false);
  // eslint-disable-next-line
  const [phoneNumberSaved, setPhoneNumberSaved] = useState(false);
  // eslint-disable-next-line
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
    // eslint-disable-next-line
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
    });
  };

  const saveDetailsToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (!address) {
        toast.error("تاكد من اسم الشارع ورقم البناية")
      } else {
        setAddressSaved(true);
      }
    });
    saveUserFirstName(user.token, firstName).then((res) => {
      if (!firstName) {
        toast.error("تاكد من الاسم الاول")
      } else {
        setFirstNameSaved(true);
      }

    });
    saveUserLastName(user.token, lastName).then((res) => {
      if (!lastName) {
        toast.error("تاكد من الاسم الاخير")
      } else {
        setLastNameSaved(true);
      }
    });
    saveUserCity(user.token, city).then((res) => {
      if (!city) {
        toast.error("تاكد من المدينة")
      } else {
        setCitySaved(true);
      }
    });
    saveUserRegion(user.token, region).then((res) => {
      if (!region) {
        toast.error("تاكد من المنطقة")
      } else {
        setRegionSaved(true);
      }
    });
    saveUserPhoneNumber(user.token, phoneNumber).then((res) => {
      if (!phoneNumber || phoneNumber.length < 10) {
        toast.error("تاكد من رقم الهاتف")
      } else {
        setPhoneNumberSaved(true);
      }
    });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showdetails = () => (
    <>
      <Form>
        <Form.Row >
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className='float-right'></Form.Label>
            <Form.Control
              className='text-right'
              value={lastName}
              type='text'
              placeholder='الاسم الاخير'
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label className='float-right'> </Form.Label>
            <Form.Control
              className='text-right'
              value={firstName}
              placeholder='الاسم الاول'
              type='text'
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row >
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label className='float-right'>المدينة</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              onChange={(e) => {
                setCity(e.target.value)
              }}
            >
              <option>Choose...</option>
              <option>عمان</option>
              <option>الزرقاء</option>
              <option>اربد</option>
              <option>البلقاء</option>
              <option>جرش</option>
              <option>عجلون</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label className='float-right'>رقم الهاتف</Form.Label>
            <Form.Control
              className='text-right'
              value={phoneNumber}
              placeholder='07 xxx xxx xxx xxxx'
              type='phoneNumber'
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row >
          <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label className='float-right'></Form.Label>
            <Form.Control
              className='text-right'
              value={address}
              type='text'
              placeholder='اسم الشارع ورقم البناية'
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className='float-right'></Form.Label>
            <Form.Control
              className='text-right'
              type="password"
              placeholder="Password"
              // eslint-disable-next-line 
              value={region}
              // eslint-disable-next-line 
              type='text'
              // eslint-disable-next-line 
              placeholder='المنطقة'
              onChange={(e) => {
                setRegion(e.target.value)
              }}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" onClick={saveDetailsToDb} className='float-right'>حفظ</Button>
      </Form>

    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.price * p.count}
          {" "} = {p.count} x {p.product.title} ({p.color})
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        placeholder='ادخال كود الخصم'
        type="text"
        className="form-control text-right"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2 float-right">
        ادخال كود الخصم
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-md-6">
          <br />
          <h4 className='text-right'>ملخص الطلب</h4>
          <hr />
          <p className='text-right'> {products.length} المنتجات</p>
          <hr />
          <p className='text-right'>
            {showProductSummary()}
          </p>
          <p className='text-right'> .يضاف 3 دنانير توصيل</p>
          <hr />
          <p className='text-right'> {total + 3} JD السعر الكامل</p>

          {totalAfterDiscount > 0 && (
            <p className="bg-success p-2 text-right">
              {totalAfterDiscount}JD :السعر بعد الخصم
            </p>
          )}
          <hr />
          <br />
          <h4 className='text-right'>هل لديك خصم؟</h4>
          <br />
          {showApplyCoupon()}
          <br />
          <br />
          {discountError && <p className="bg-danger p-2">{discountError}</p>}
        </div>
        <div className="col-md-6">
          <br />
          <h4 className='text-right'>عنوان التسليم</h4>
          {showdetails()}
          <br />
          <div className="row">
            <div className="col-md-4">
              <button
                className="btn btn-primary float-right"
                onClick={createCashOrder}
                disabled={!phoneNumberSaved || !firstNameSaved || !lastNameSaved}
              >
                شراء
                </button>
            </div>
            <div className="col-md-4">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-primary float-right"
              >
                الغاء العملية
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
