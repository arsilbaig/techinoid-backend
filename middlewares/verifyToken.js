const jwt = require("jsonwebtoken");
var JWT_SECRET= "secretkey"

module.exports = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) return res.status(403).json({ msg: "No token, authorization denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.adminid = verified;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};