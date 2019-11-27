const http = require("http");
const fs = require("fs");
const routes = require("./routesWithoutExpress");

//server that accomodates a listener method
const server = http.createServer(routes);

//specifying a port to listen to
server.listen(3000);
