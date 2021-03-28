import React, { useState, useEffect } from "react";
import SallerNav from "../../../components/nav/SeallerNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSallerProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getColors } from "../../../functions/color";
import FileUpload from "../../../components/forms/SallerFileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import Header from '../../../components/nav/Header';

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    color: "",
    brand: "",
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setValues({ ...values, categories: c.data }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createSallerProduct(values, user.token)
            .then((res) => {
                console.log(res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCatagoryChange = (e) => {
        e.preventDefault();
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            setSubOptions(res.data);
        });
        getColors(e.target.value).then((res) => {
            setColorOptions(res.data);
        });
        setShowSub(true);
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        {loading ? (
                            <LoadingOutlined className="text-danger h1" />
                        ) : (
                            <h4 className='text-right'>  اضف منتج</h4>
                        )}
                        <hr />
                        <div className="p-3">
                            <FileUpload
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                            />
                        </div>
                        <ProductCreateForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            handleCatagoryChange={handleCatagoryChange}
                            subOptions={subOptions}
                            colorOptions={colorOptions}
                            showSub={showSub}
                        />
                    </div>

                    <div className="col-md-2">
                        <SallerNav/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCreate;
