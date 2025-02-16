const jwt = require("jsonwebtoken");
const JWT_SECRET = "rashidlovekiara";

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({ message: "Invalid Credential" });
  }
}

module.exports = { auth, JWT_SECRET, jwt };
