const Shipping = require("../models/shipping");
const Product = require("../models/product");
const slugify = require("../slugify");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        res.json(await new Shipping({ name, slug: slugify(name) }).save());
    } catch (err) {
        res.status(400).send("Create shipping failed");
    }
};

exports.list = async (req, res) =>
    res.json(await Shipping.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
    let shipping = await Shipping.findOne({ slug: req.params.slug }).exec();
    // res.json(category);
    const products = await Product.find({ category }).populate("shipping").exec();

    res.json({
        shipping,
        products,
    });
};

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Shipping.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Shipping update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Shipping.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Shipping delete failed");
    }
};
