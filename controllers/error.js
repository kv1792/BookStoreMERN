exports.get404 = (req, res, next) => {
  //For serving html, uncomment below line and comment the .render method line
  //res.status(404).sendFile(path.join(__dirname, "views", "pageNotFound.html"));

  //For serving template engine, use below line
  res
    .status(404)
    .render("pageNotFound", { pageTitle: "Error Page", path: "/error" });
};
