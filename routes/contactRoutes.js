const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");


router.get("/Contact", contactController.getContact);


router.post("/contact/create", contactController.createContact); 


router.delete("/Contact/delete/:id", contactController.deleteContact);

router.delete("/Contact/delete", contactController.deleteContacts);

module.exports = router;