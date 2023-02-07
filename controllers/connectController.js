const db = require("../models");
const joi = require("joi");

const connect = db.connect

const schema = joi.object({
    email: joi.string().required()
  
  })

exports.createConnect = async (req, res) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({
        type:'Validation',
        message: 'Validation failed',
        error: validation.error.details
      });
    }
    try {
      const {email} = req.body;
      const connects = await connect.create({
          email
      });
      res.status(201).json({
        message: 'Connection created successfully',
        connects
      });
    } catch (error) {
      res.status(500).json({
        type:'Connection',
        message: 'Failed to create Contaction',
        error: error.message
      });
    }
};

exports.getConnect = async (req, res) => {
  try {
    const connects = await connect.findAll();

    res.status(200).json({
      message: "connections Retrieved Successfully",
      connects,
    });
  } catch (error) {
    res.status(500).json({
        type:'connection',
      message: "Failed to retrieve connections"
    });
  }
};

