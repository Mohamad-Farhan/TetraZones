const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create } = require("../controllers/question");

// routes
router.post("/question", authCheck, create);


module.exports = router;
