import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "../../components/nav/LRHeader";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <>
    <Header/>
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
          <h4 className='text-right'>نسيت كلمة المرور</h4>
      )}
      <br/>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control text-right"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ادخل الأيميل"
          autoFocus
        />
        <br />
        <button className="btn btn-raised float-right" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default ForgotPassword;
