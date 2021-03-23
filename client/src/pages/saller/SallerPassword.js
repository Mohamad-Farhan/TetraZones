import React, { useState } from "react";
import SallerNav from "../../components/nav/SeallerNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Header from '../../components/nav/Header'

const SallerPassword = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password updated");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>كلمة السر خاصتك</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control text-right"
                    placeholder="أدخل كلمة المرور جديدة"
                    disabled={loading}
                    value={password}
                />
                <button
                    className="btn btn-primary"
                    disabled={!password || password.length < 6 || loading}
                >
                    تحديث
        </button>
            </div>
        </form>
    );

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col mt-4 text-right">
                        {loading ? (
                            <h4 className="text-danger">Loading..</h4>
                        ) : (
                            <h4>تحديث كلمة المرور</h4>
                        )}
                        <br />
                        {passwordUpdateForm()}
                    </div>
                    <div className="col-sm-0 mt-4">
                        <SallerNav />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SallerPassword;
