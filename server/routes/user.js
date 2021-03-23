const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
  saveFirstName,
  saveLastName,
  saveCity,
  savePhoneNumber,
  saveRegion,
  firstNames,
  lastNames,
  phoneNumbers,
  addresses,
  cityes,
  regiones
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart

router.post("/user/address", authCheck, saveAddress);
router.get("/user/addresses", authCheck, addresses);

router.post("/user/firstName", authCheck, saveFirstName);
router.get("/user/firstNames", authCheck, firstNames);

router.post("/user/lastName", authCheck, saveLastName);
router.get("/user/lastNames", authCheck, lastNames);

router.post("/user/phoneNumber", authCheck, savePhoneNumber);
router.get("/user/phoneNumbers", authCheck, phoneNumbers);

router.post("/user/city", authCheck, saveCity);
router.get("/user/cityes", authCheck, cityes);

router.post("/user/region", authCheck, saveRegion);
router.get("/user/regiones", authCheck, regiones);

router.post("/user/order", authCheck, createOrder); // stripe
router.post("/user/cash-order", authCheck, createCashOrder); // cod
router.get("/user/orders", authCheck, orders);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
