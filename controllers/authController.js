const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const env = require('dotenv');
const Admin = db.auth
var JWT_SECRET= "secretkey"


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Incorrect email' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const displayName = admin.firstName + " " + admin.lastName;
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, {
      expiresIn: 86400
    });
    res.status(200).json({
      token: token,
      role: "admin",
      user: {
        displayName: displayName,
        email: email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' + error });
  }
};
exports.refreshToken = async (req, res) => {
  try {
    var token = false;
    if(req.headers.authorization){
      const headerToken = req.headers.authorization;
      token = headerToken.split(" ")[1]
      console.log(token);
    }
 
    if (!token) {
      return res.status(401).json({ message: 'No refresh token, authorization denied' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const displayName = admin.firstName + " " + admin.lastName;
    const newToken = jwt.sign({ id: admin.id }, JWT_SECRET, {
      expiresIn: 43200
    });
    res.status(200).json({
      token: newToken,
      role: "admin",
      data: {
        displayName: displayName,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Error refreshing token: ' + error.message });
  }
};

const authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = await Admin.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};