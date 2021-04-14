const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 50,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shippings: [
      {
        type: ObjectId,
        ref: "Shipping",
      }
    ],
    colors: [
      {
        type: ObjectId,
        ref: "Color",
      }
    ],
    brands: [
      {
        type: ObjectId,
        ref: "Brand",
      }
    ],
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
        comment: { type: String, required: true },
        name: { type: String, require: true }

      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
