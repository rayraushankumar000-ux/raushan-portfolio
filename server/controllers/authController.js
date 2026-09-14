const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user);

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Login failed",
        });
    }
};

const createAdmin = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: process.env.ADMIN_EMAIL,
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Admin already exists",
            });
        }

        const { password } = req.body;

        if (!password || password.length < 12) {
            return res.status(400).json({
                message:
                    "Admin password must contain at least 12 characters",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        const user = await User.create({
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        });

        res.status(201).json({
            message: "Admin created successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Could not create admin",
        });
    }
};

module.exports = {
    login,
    createAdmin,
};