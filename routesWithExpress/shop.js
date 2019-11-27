const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const adminData = require("./admin");

const shopController = require("../controllers/shop");
/**
 * to serve an html page in return Eg. shop.html, absolute path needs to be provided. And normal relative
 * path or absolute path don't work here in node. For that, using path core module and utilizing its
 * features of join and __dirname and __filename to provide correct path to the html files.
 */

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productID", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);

module.exports = router;
