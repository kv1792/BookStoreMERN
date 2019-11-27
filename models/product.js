const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = cb => {
  /**
   * Before writing into the file, we are first reading from the products file and parsing it in products array.
   * On successfull read, writing the currently added product i.e. this by pusing it in the product array first
   * and then writing it by parsing it.
   **/

  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), err => {});
    });
  }

  //adding static because there is no need to instantiate product class to fetch all products via constructor.
  /**
   * Since the code flow is asynchronous, the callbacks of readFile takes time and before it calls its own callback of
   * err,fileContent, the fetchAll method completes and it returns nothing. And in views, shop.ejs, prods is undefined
   * giving an error of lengh of undefined.
   * TO SOLVE this,
   * adding a callback function to fetchAll, and calling this wherever we have a conclusion.
   * Returning callback when there is an error. And also returning it once the readFile is finished.
   *
   * Also, from the controller, passing a callback which takes products variable as a parameter. Once all the callbacks
   * are called, the controller receives the products as a parameter and ready to be used.
   **/
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findByID(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
