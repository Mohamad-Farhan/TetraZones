const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, sallerCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
  productComment,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.post("/sallerProduct", authCheck, sallerCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
// rating
router.put("/product/star/:productId", authCheck, productStar);
// Comment
router.put("/product/comment/:productId", authCheck, productComment);
// related
router.get("/product/related/:productId", listRelated);
// search
router.post("/search/filters", searchFilters);

module.exports = router;
