const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqueid = require("uniqueid");

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true, userAddress });
};

exports.addresses = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userAdresses = await User.find({})
    .select('address')
    .exec();
  res.json(userAdresses);
};

exports.saveFirstName = async (req, res) => {
  const userFirstName = await User.findOneAndUpdate(
    { email: req.user.email },
    { firstName: req.body.firstName }
  ).exec();

  res.json({ ok: true, userFirstName });
};

exports.firstNames = async (req, res) => {

  let userFirstNames = await User.find({})
    .select('firstName')
    .exec();
  res.json(userFirstNames);
};

exports.saveLastName = async (req, res) => {
  const userLastName = await User.findOneAndUpdate(
    { email: req.user.email },
    { lastName: req.body.lastName }
  ).exec();

  res.json({ ok: true, userLastName });
};

exports.lastNames = async (req, res) => {

  let userLastName = await User.find({})
    .select('lastName')
    .exec();
  res.json(userLastName);
};

exports.saveCity = async (req, res) => {
  const userCity = await User.findOneAndUpdate(
    { email: req.user.email },
    { city: req.body.city }
  ).exec();

  res.json({ ok: true, userCity });
};

exports.cityes = async (req, res) => {
  let usercityes = await User.find({})
    .select('city')
    .exec();
  console.log(usercityes)
  res.json(usercityes);
};

exports.saveRegion = async (req, res) => {
  const userRegion = await User.findOneAndUpdate(
    { email: req.user.email },
    { region: req.body.region }
  ).exec();

  res.json({ ok: true, userRegion });
};

exports.regiones = async (req, res) => {
  let userRegiones = await User.find({})
    .select('region')
    .exec();
  res.json(userRegiones);
};

exports.savePhoneNumber = async (req, res) => {
  const userPhoneNumber = await User.findOneAndUpdate(
    { email: req.user.email },
    { phoneNumber: req.body.phoneNumber }
  ).exec();

  res.json({ ok: true, userPhoneNumber });
};

exports.phoneNumbers = async (req, res) => {
  let userPhoneNumbers = await User.find({})
    .select('phoneNumber')
    .exec();
  res.json(userPhoneNumbers);
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99


  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});

  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};

// addToWishlist wishlist removeFromWishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  // if COD is true, create order with status of Cash On Delivery

  if (!COD) return res.status(400).send("Create cash order failed");

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: "jd",
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderdBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  res.json({ ok: true });
};

