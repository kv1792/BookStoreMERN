const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

//express application. Can be passed as a listener.
const app = express();

//using a parser to parse a request body coming from a FORM. Need to add this middleware at the top of the routes
app.use(bodyParser.urlencoded({ extended: false }));

//applying middleware. Passing a function to use, which basically gets called for every request

/*if there is a need of having one middleware always being used for all the requests regardless of the
 * paths, then put it at the top of the order in the following way
 */

app.use("/", (req, res, next) => {
  console.log("this always runs");
  next();
});

//routes will be received in top to bottom order to match the route paths

app.use("/add-product", (req, res, next) => {
  console.log("inside another middleware");
  res.send(
    "<form action='/product' method = 'POST'><input type='text' name='title'><button type='submit'>Add</button></form>"
  );
});

/**
 * For filtering the middlewares and making them specific to certain type of request i.e. GET or POST,
 * using app.get or app.post instead of app.use
 */

app.post("/product", (req, res, next) => {
  //to parse the request body, we use body-parser package
  console.log(req.body);

  /*
   * Express provides redirect method instead of Node's location header and statusCode task for
   * redirecting to another routes.
   */

  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("inside another middleware");
  res.send("<h1>Hello From Express</h1>");
});

app.listen(3000);
