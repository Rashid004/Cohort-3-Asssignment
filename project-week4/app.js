/** @format */

const express = require("express");

const homeRouter = require("./routes/home");
const loginRouter = require("./routes/login");

const app = express();
// const path = require("path");
const port = process.env.PORT || 3000;

// app.use("/static", express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/file", (req, res) => {
//   res.sendFile(path.join(__dirname, "card-5.webp"));
// });

app.use("/", homeRouter);
app.use("/", loginRouter);

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server is running on port ${port}`);
});
