const express = require("express");

const productController = require("../controllers/product.controller");
const verifyToken = require("../middleware/verifyToken");

const route = express.Router();

route.get("/", productController.index);
route.get("/combine-products", productController.getCombineProducts);
route.get("/:id", productController.show);
route.post("/:id/like", verifyToken, productController.like);
route.post("/:id/unlike", verifyToken, productController.unlike);

module.exports = route;
