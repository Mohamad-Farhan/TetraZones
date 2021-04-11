const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: [1, "Too short"],
            maxlength: [32, "Too long"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shipping", shippingSchema);
