const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: [
                "PAN",
                "AADHAAR",
                "PASSPORT",
                "DRIVING_LICENSE",
                "CERTIFICATE",
                "RESUME",
                "OTHER",
            ],
            default: "OTHER",
        },

        fileName: {
            type: String,
            required: true,
        },

        originalName: {
            type: String,
            required: true,
        },

        filePath: {
            type: String,
            required: true,
        },

        mimeType: {
            type: String,
            required: true,
        },

        size: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Document", documentSchema);