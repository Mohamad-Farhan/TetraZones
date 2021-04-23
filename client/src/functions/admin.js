import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserAddresses = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/addresses`, {
    headers: {
      authtoken,
    },
  });

export const getUserFirstNames = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/firstNames`, {
    headers: {
      authtoken,
    },
  });

export const getUserLastNames = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/lastNames`, {
    headers: {
      authtoken,
    },
  });

export const getUserPhoneNumbers = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/phoneNumbers`, {
    headers: {
      authtoken,
    },
  });

export const getUserCityes = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cityes`, {
    headers: {
      authtoken,
    },
  });

export const getUserRegiones = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/regiones`, {
    headers: {
      authtoken,
    },
  });

  export const getUserQuestions = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/questions`, {
    headers: {
      authtoken,
    },
  });

  