const Color = require("../models/color");
const Product = require("../models/product");
const slugify = require("../slugify");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        res.json(await new Color({ name, slug: slugify(name) }).save());
    } catch (err) {
        res.status(400).send("Create color failed");
    }
};

exports.list = async (req, res) =>
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
    let color = await Color.findOne({ slug: req.params.slug }).exec();
    const products = await Product.find({ color }).populate("color").exec();

    res.json({
        color,
        products,
    });
};

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Color.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Color update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Color.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Color delete failed");
    }
};
