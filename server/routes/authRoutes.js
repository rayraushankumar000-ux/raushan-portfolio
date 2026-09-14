const express = require("express");

const {
    login,
    createAdmin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);

router.post("/create-admin", createAdmin);

module.exports = router;