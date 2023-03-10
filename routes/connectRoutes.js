const express = require("express");
const router = express.Router();

const connectController = require("../controllers/connectController");


router.get("/Connect", connectController.getConnect);


router.post("/connect/create", connectController.createConnect); 

router.delete("/connect/delete", connectController.deleteConnects); 

module.exports = router;