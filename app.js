const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");

//const expressHbs = require("express-handlebars");

const app = express();

/**
 * To use handlebars, uncomment the below code base
 * 
 * app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');
 */

/**
  * Uncomment to work with pug engine
  * //Telling express app that we need to use pug as a templating engine
    app.set("view engine", "pug");
  */

/**
 * Using EJS as the templating engine
 */

app.set("view engine", "ejs");

//Telling express app to find the templates in this directory
app.set("views", "views");

const adminRoutes = require("./routesWithExpress/admin");
const shopRoutes = require("./routesWithExpress/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
