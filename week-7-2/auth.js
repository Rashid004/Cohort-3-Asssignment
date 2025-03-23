const jwt = require("jsonwebtoken");
const JWT_SECRET = "rashidlovekiara";

function auth(req, res, next) {
  console.log("Headers Received:", req.headers);

  const token = req.headers.authorization;
  console.log("Extracted Token:", token); // Debugging token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token Data:", decodedData); // Debugging decoded token

    req.userId = decodedData.id;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(403).json({ message: "Invalid Credential" });
  }
}

module.exports = { auth, JWT_SECRET, jwt };
