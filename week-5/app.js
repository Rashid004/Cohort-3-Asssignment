/** @format */

// /** @format */

// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// app.use(bodyParser.json());
// // let requestCount = 0;

// // Create First Middleware Function to Log Requests &  Incoming HTTP Request
// app.use(function (req, res, next) {
//   // *** Each Incoming HTTP Request ***
//   const method = req.method;
//   const url = req.url;
//   const hostname = req.hostname;
//   const timeStamp = new Date().toISOString();

//   console.log(
//     ` The ${method} request to ${url} has been received at ${timeStamp} from ${hostname}`
//   );
//   // *** Request Count ***
//   // requestCount++;
//   // console.log(`Request Count: ${requestCount}`);
//   next();
// });

// app.get("/", (req, res) => {
//   res.json({ msg: "Hello World" });
// });

// app.get("/user", (req, res) => {
//   res.json({ name: "John Week" });
// });

// app.post("/user", (req, res) => {
//   const { name, email, phone } = req.body;
//   res.json({ name, email, phone });
// });

// app.get("/requestCount", (req, res) => {
//   res.json({ requestCount: 0 });
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
