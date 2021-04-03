import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LRHeader from "../../components/nav/LRHeader";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `تم ارسال بريد الكتروني الى ${email} انقر على الرابط لاتمام عملية التسجيل`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control text-right"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ادخل الأميل"
        autoFocus
      />

      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <>
    <LRHeader/>
    <div className="container p-5">
      
      <div className="row">
        <div className="col-md-6 offset-md-3">
            <h4 className='text-right'>تسجيل الدخول</h4>
            <br/>
          {registerForm()}
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
