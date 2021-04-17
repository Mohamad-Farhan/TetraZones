const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const questionSchema = new mongoose.Schema(
    {
        question: { type: String },
        postedBy: { type: ObjectId, ref: "User" },
        name: { type: String, require: true },
        email: {type: String, require: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);