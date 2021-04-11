const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    read,
    update,
    remove,
    list,
} = require("../controllers/shipping");

// routes
router.post("/shipping", authCheck, adminCheck, create);
router.get("/shippings", list);
router.get("/shipping/:slug", read);
router.put("/shipping/:slug", authCheck, adminCheck, update);
router.delete("/shipping/:slug", authCheck, adminCheck, remove);

module.exports = router;
