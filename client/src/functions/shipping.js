import axios from "axios";

export const getShippings = async () =>
    await axios.get(`${process.env.REACT_APP_API}/shippings`);

export const getShipping = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/shipping/${slug}`);

export const removeShipping = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/shipping/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const updateShipping = async (slug, shipping, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/shipping/${slug}`, shipping, {
        headers: {
            authtoken,
        },
    });

export const createShipping = async (shipping, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/shipping`, shipping, {
        headers: {
            authtoken,
        },
    });
