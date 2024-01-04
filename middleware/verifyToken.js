const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  console.log("verifyToken middleware called"); // Debugging
  const token = req.header("auth-token");
  console.log("Token received:", token); //Debugging
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = verifyToken;
