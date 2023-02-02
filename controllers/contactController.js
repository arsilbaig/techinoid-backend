const db = require("../models");
const joi = require("joi");

const contactUs = db.contactUs

const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    subject: joi.string().required(),
    description: joi.string().required()
  
  })

exports.createContact = async (req, res) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({
        type:'Validation',
        message: 'Validation failed',
        error: validation.error.details
      });
    }
    try {
      const {name, email, subject, description} = req.body;
      const contactUss = await contactUs.create({
          name,
          email,
          subject,
          description
      });
      res.status(201).json({
        message: 'Contact created successfully',
        contactUss
      });
    } catch (error) {
      res.status(500).json({
        type:'Contact',
        message: 'Failed to create Contact',
        error: error.message
      });
    }
};

exports.getContact = async (req, res) => {
  try {
    const contactUss = await contactUs.findAll();

    res.status(200).json({
      message: "contactUS Retrieved Successfully",
      contactUss,
    });
  } catch (error) {
    res.status(500).json({
        type:'contact',
      message: "Failed to retrieve contactUS"
    });
  }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const schema = joi.object({
          id: joi.string().required()
        });
        const { error } = schema.validate({ id });
        if (error) {
          return res.status(400).json({
            type:'validation',
            message:"validation failed"
          });
        }
        const deleted = await contactUs.destroy({
          where: { id },
        });
        if (!deleted) {
          return res.status(404).json({
            type:'Contact',
            message: 'Contact not found',
          });
        }
        res.status(200).json({
          message: 'Contact deleted successfully',
        });
      } catch (error) {
        res.status(500).json({
            type:'Delete',
          message: 'Failed to delete contact',
          error: error.message
        });
      }
};
exports.deleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;
    const schema = joi.array().items(joi.string().required());
    const { error } = schema.validate(ids);
    if (error) {
      return res.status(400).json({
        type:'Validation',
        message: 'Validation failed'  
      });
    }
    const deleted = await contactUs.destroy({
      where: { id: ids },
    });
    if (!deleted) {
      return res.status(404).json({
        type: 'Contact',
        message: 'Contacts not found',
      });
    }
    res.status(200).json({
      message: 'Contacts deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'Contacts',
      message: error.message
    });
  }
};
