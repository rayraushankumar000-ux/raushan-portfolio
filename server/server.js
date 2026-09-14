const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// ========================================
// LOAD ENVIRONMENT VARIABLES FIRST
// ========================================

dotenv.config();

// ========================================
// IMPORT DATABASE
// ========================================

const connectDB = require("./config/db");

// ========================================
// IMPORT ROUTES
// ========================================

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const documentRoutes = require("./routes/documentRoutes");

// ========================================
// CREATE APP
// ========================================

const app = express();

// ========================================
// DATABASE
// ========================================

connectDB();

// ========================================
// SECURITY
// ========================================

app.use(helmet());

// ========================================
// CORS
// ========================================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://raushan-portfolio-mu.vercel.app",
        ],
        methods: [
            "GET",
            "POST",
            "DELETE",
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);

// ========================================
// BODY PARSER
// ========================================

app.use(
    express.json({
        limit: "1mb",
    })
);

// ========================================
// GENERAL RATE LIMIT
// ========================================

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(generalLimiter);

// ========================================
// LOGIN RATE LIMIT
// ========================================

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {
    res.json({
        message:
            "Raushan Portfolio Backend is running 🚀",
    });
});

// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is healthy",
    });
});

// ========================================
// AUTH ROUTES
// ========================================

app.use(
    "/api/auth",
    loginLimiter,
    authRoutes
);

// ========================================
// CONTACT ROUTES
// ========================================

app.use(
    "/api/contact",
    contactRoutes
);

// ========================================
// DOCUMENT VAULT
// ========================================

app.use(
    "/api/documents",
    documentRoutes
);

// ========================================
// 404
// ========================================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

// ========================================
// ERROR HANDLER
// ========================================

app.use(
    (error, req, res, next) => {
        console.error(error);

        res.status(500).json({
            message:
                error.message ||
                "Internal server error",
        });
    }
);

// ========================================
// START SERVER
// ========================================

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {
        console.log(
            `Server running on http://localhost:${PORT}`
        );
    }
);