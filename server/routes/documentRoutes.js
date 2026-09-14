const express = require("express");

const {
    uploadDocument,
    getDocuments,
    downloadDocument,
    deleteDocument,
} = require("../controllers/documentController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// All vault routes require authentication
router.use(protect);

// Upload
router.post(
    "/upload",
    upload.single("document"),
    uploadDocument
);

// List
router.get("/", getDocuments);

// Download
router.get(
    "/download/:id",
    downloadDocument
);

// Delete
router.delete(
    "/:id",
    deleteDocument
);

module.exports = router;