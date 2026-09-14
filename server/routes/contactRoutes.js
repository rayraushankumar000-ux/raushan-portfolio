const express = require("express");

const {
    sendMessage,
} = require("../controllers/contactController");

const router = express.Router();

// ========================================
// POST CONTACT MESSAGE
// ========================================

router.post(
    "/",
    sendMessage
);

module.exports = router;