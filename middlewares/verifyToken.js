const jwt = require("jsonwebtoken");
var JWT_SECRET= "secretkey"

module.exports = (req, res, next) => {
  var token = false;
    if(req.headers.authorization){
      const headerToken = req.headers.authorization;
      token = headerToken.split(" ")[1]
      console.log(token);
    }
  if (!token) return res.status(403).json({ msg: "No token, authorization denied" });
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.adminid = verified;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};