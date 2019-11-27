const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  /**
   * Using sendFile method to serve html page for response
   * res.sendFile(path.join(rootDir, "views", "add-product.html"));
   */
  /**
   * To use templating engine, using render method. To pass in the data to the template,
   * add it in the next parameter in an object form.
   *
   */

  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  //to parse the request body, we use body-parser package
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, imageUrl, description, price);

  product.save();

  /*
   * Express provides redirect method instead of Node's location header and statusCode task for
   * redirecting to another routes.
   */

  res.redirect("/");
};

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
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
