/** @format */
const express = require("express");
const app = express();

function sum(n) {
  let ans = 0;
  for (i = 1; i <= n; i++) {
    ans = ans + i;
  }
  return ans;
}

app.get("/", (req, res) => {
  const n = req.query.n;
  const ans = sum(n);
  res.send("Hello You have entered " + n + " and the sum is " + ans);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
