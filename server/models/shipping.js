const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is required",
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shipping", shippingSchema);
