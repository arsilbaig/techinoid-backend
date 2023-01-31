const jwt = require("jsonwebtoken");
const env = require("../env");

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'].split(' ')[1];
  req.headers['authorization'] = token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, env.secretkey, (err, decoded) => {
    if (err) {
      return res.status(401)
    }
})
}