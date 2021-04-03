import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
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

export const saveUserFirstName = async (authtoken, firstName) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/firstName`,
    { firstName },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserFirstNames = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/firstNames`, {
    headers: {
      authtoken,
    },
  });

export const saveUserLastName = async (authtoken, lastName) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/lastName`,
    { lastName },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserLastNames = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/lastNames`, {
    headers: {
      authtoken,
    },
  });

export const saveUserPhoneNumber = async (authtoken, phoneNumber) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/phoneNumber`,
    { phoneNumber },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserPhoneNumbers = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/phoneNumbers`, {
    headers: {
      authtoken,
    },
  });

export const saveUserCity = async (authtoken, city) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/city`,
    { city },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCityes = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cityes`, {
    headers: {
      authtoken,
    },
  });

export const saveUserRegion = async (authtoken, region) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/region`,
    { region },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserRegiones = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/regiones`, {
    headers: {
      authtoken,
    },
  });

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
