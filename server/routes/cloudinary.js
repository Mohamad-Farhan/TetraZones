const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, sallerCheck } = require("../middlewares/auth");

// controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/sallerUploadimages", authCheck, sallerCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
