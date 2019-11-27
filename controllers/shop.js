const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  /**
   * Using sendFile method to serve html page for response
   * res.sendFile(path.join(rootDir, "views", "shop.html"));
   */

  /**
   * To use templating engine, using render method. To pass in the data to the template,
   * add it in the next parameter in an object form.
   */

  //fetchAll method was declared as static hence no instantiation of the Product class with new keyword needed.

  /**
   * adding a callback method to fetchAll which recevies products as parameter once the callback is finished in the
   * model and called.
   **/

  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    activeShop: true,
    productCSS: true
  });
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productID;
  Product.findByID(prodID, product => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "product.title",
      path: "/products"
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
    activeShop: true,
    productCSS: true
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    activeShop: true,
    productCSS: true
  });
};
