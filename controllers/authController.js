const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const env = require('dotenv');
const Admin = db.auth
var JWT_SECRET= "secretkey"


exports.login = async (req, res) => {
  try {
    const {email, password } = req. body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const displayName =admin.firstName + " " + admin.lastName;
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, {
      expiresIn: 86400
    });
    res.status(200).json( {
      token: token,
      role: "Admin",
      data: {
             displayName: displayName,
              email:email
    }}
    );
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' + error });
  }
};
exports.refreshToken = async (req, res) => {
  try {
    const {email} = req. body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Incorrect email' });
    }
    const displayName =admin.firstName + " " + admin.lastName;
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, {
      expiresIn: 43200
    });
    res.status(200).json( {
      token: token,
      refToken:token,
      role: "Admin",
      data: {
             displayName: displayName,
              email:email
    }}
    );
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in' + error });
  }
};

const authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};