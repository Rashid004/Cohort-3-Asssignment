/** @format */

const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";

function auth(req, res, next) {
  const token = req.headers.authorization;

  const response = jwt.verify(token, JWT_SECRET);

  if (response) {
    req.userId = token.userId;
    next();
  } else {
    res.status(403).json({
      message: "Invalid Creds",
    });
  }
}

module.exports = {
  auth,
  JWT_SECRET,
};
