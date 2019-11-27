const express = require("express");
const path = require("path");
//const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

/**
 * creating a products dummy array to store temporary values untill DB is used.
 */

/**
 * Plugs in this router with other express app. Eg for this case is 'app' in app.js
 */
const router = express.Router();

/**
 * For filtering the middlewares and making them specific to certain type of request i.e. GET or POST,
 * using app.get or app.post instead of app.use
 */

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

exports.routes = router;
