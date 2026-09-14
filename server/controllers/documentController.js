const fs = require("fs");
const path = require("path");
const Document = require("../models/Document");

const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please select a file",
            });
        }

        const { name, category } = req.body;

        if (!name || !category) {
            fs.unlinkSync(req.file.path);

            return res.status(400).json({
                message:
                    "Document name and category are required",
            });
        }

        const document = await Document.create({
            name,
            category,
            fileName: req.file.filename,
            originalName: req.file.originalname,
            filePath: req.file.path,
            mimeType: req.file.mimetype,
            size: req.file.size,
        });

        res.status(201).json({
            message: "Document uploaded successfully",
            document: {
                id: document._id,
                name: document.name,
                category: document.category,
                originalName: document.originalName,
                size: document.size,
                createdAt: document.createdAt,
            },
        });
    } catch (error) {
        console.error(error);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            message: "Could not upload document",
        });
    }
};

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find()
            .select(
                "-filePath -fileName"
            )
            .sort({ createdAt: -1 })
            .lean();

        res.json(documents);
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch documents",
        });
    }
};

const downloadDocument = async (req, res) => {
    try {
        const document = await Document.findById(
            req.params.id
        );

        if (!document) {
            return res.status(404).json({
                message: "Document not found",
            });
        }

        if (!fs.existsSync(document.filePath)) {
            return res.status(404).json({
                message: "File no longer exists",
            });
        }

        res.download(
            document.filePath,
            document.originalName
        );
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Could not download document",
        });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findById(
            req.params.id
        );

        if (!document) {
            return res.status(404).json({
                message: "Document not found",
            });
        }

        if (fs.existsSync(document.filePath)) {
            fs.unlinkSync(document.filePath);
        }

        await Document.findByIdAndDelete(req.params.id);

        res.json({
            message: "Document deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Could not delete document",
        });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    downloadDocument,
    deleteDocument,
};