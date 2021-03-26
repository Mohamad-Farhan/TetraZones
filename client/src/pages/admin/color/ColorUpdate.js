import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getColor, updateColor } from "../../../functions/color";
import ColorForm from "../../../components/forms/ColorForm";
import Header from '../../../components/nav/Header';

const ColorUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadColor();
        // eslint-disable-next-line
    }, []);

    const loadColor = () =>
        getColor(match.params.slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateColor(match.params.slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push("/admin/color");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

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
                            <h4>Update color</h4>
                        )}

                        <ColorForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                        />
                        <hr />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ColorUpdate;
