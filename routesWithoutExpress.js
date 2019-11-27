const fs = require("fs");

//listener function to listen to all the request and serve them with a response
const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.write(
      `<html><head><title>My First Node APplication</title></head><body>
      <form method="POST" action = "/message"><input type="text" name="message"></input><button type="submit">Send Message</button></form></body></html>`
    );

    return response.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    //data event is triggered whenever a new chunk of data is received from the request
    request.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });

    //end event is triggered when the chunks have been completely received
    request.on("end", () => {
      //Buffer is a global object provided by node to work with streams
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];

      /*  writeFileSync is used as it will block the code execution until the file writing is complete. 
Should not be used for huge files. 
Using writeFile for huge files with a callback function taking error as a parameter.

   fs.writeFileSync("message.txt", message);

*/

      fs.writeFile("message.txt", message, err => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }

  response.write(
    "<html><head><title>My First Node Pplication</title></head><body>My first node application</body></html>"
  );

  response.end();
};

module.exports = requestHandler;
