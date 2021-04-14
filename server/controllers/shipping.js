const Shipping = require("../models/shipping");
const Product = require("../models/product");
const slugify = require("../slugify");

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        res.json(await new Shipping({ name, parent, slug: slugify(name) }).save());
    } catch (err) {
        res.status(400).send("Create Shipping failed");
    }
};

exports.list = async (req, res) =>
    res.json(await Shipping.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
    let shipping = await Shipping.findOne({ slug: req.params.slug }).exec();
    const products = await Product.find({ shippings: shipping }).populate("shipping").exec();

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
