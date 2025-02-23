const jwt = require("jsonwebtoken");
const JWT_SECRET = "rashidlovekiara";

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Credential" });
  }
}

module.exports = { auth, JWT_SECRET, jwt };
