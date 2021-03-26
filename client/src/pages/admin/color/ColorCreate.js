import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createColor,
    getColors,
    removeColor,
} from "../../../functions/color";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ColorForm from "../../../components/forms/ColorForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import Header from '../../../components/nav/Header';

const ColorCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);
    // step 1
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadColors();
    }, []);

    const loadColors = () =>
        getColors().then((c) => setColors(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createColor({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadColors();
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
            removeColor(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadColors();
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
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                            <h4>Create color</h4>
                        )}

                        <ColorForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                        />

                        {/* step 2 and step 3 */}
                        <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                        {/* step 5 */}
                        {colors.filter(searched(keyword)).map((c) => (
                            <div className="alert alert-secondary" key={c._id}>
                                {c.name}
                                <span
                                    onClick={() => handleRemove(c.slug)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <Link to={`/admin/color/${c.slug}`}>
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

export default ColorCreate;
