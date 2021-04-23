const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    firstName: {
      type: String,
      index: true
    },
    lastName: {
      type: String,
      index: true
    },
    city: {
      type: String,
      index: true
    },
    phoneNumber:{
      type: Number,
    },
    region: {
      type: String,
      index: true
    },
    question:{
      type: String,
      index: true,
    },

    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
