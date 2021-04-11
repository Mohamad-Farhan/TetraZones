import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createShipping,
    getShippings,
    removeShipping,
} from "../../../functions/shipping";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ShippingForm from "../../../components/forms/ShippingForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import Header from '../../../components/nav/Header';

const ShippingCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [shippings, setShippings] = useState([]);
    // step 1
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadShippings();
    }, []);

    const loadShippings = () =>
        getShippings().then((s) => setShippings(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createShipping({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadShippings();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeShipping(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadShippings();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    // step 4
    const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col">
                        {loading ? (
                            <h4 className="text-danger">Loading..</h4>
                        ) : (
                            <h4>Create shipping</h4>
                        )}

                        <ShippingForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                        />

                        {/* step 2 and step 3 */}
                        <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                        {/* step 5 */}
                        {shippings.filter(searched(keyword)).map((s) => (
                            <div className="alert alert-secondary" key={s._id}>
                                {s.name}
                                <span
                                    onClick={() => handleRemove(s.slug)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <Link to={`/admin/shipping/${s.slug}`}>
                                    <span className="btn btn-sm float-right">
                                        <EditOutlined className="text-warning" />
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingCreate;
