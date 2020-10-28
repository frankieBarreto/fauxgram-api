const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");


router.post("/register", ctrl.auth.register);
router.post("/login", ctrl.auth.login);
// router.post("/logout", ctrl.auth.logout); // not needed 

module.exports = router;