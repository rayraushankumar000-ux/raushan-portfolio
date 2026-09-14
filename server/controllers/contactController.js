const nodemailer = require("nodemailer");
const Message = require("../models/Message");

// ========================================
// GMAIL TRANSPORTER
// ========================================

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ========================================
// SEND CONTACT MESSAGE
// ========================================

const sendMessage = async (req, res) => {
    try {
        const {
            name,
            email,
            message,
        } = req.body;

        // --------------------------------
        // VALIDATION
        // --------------------------------

        if (
            !name ||
            !email ||
            !message
        ) {
            return res.status(400).json({
                message:
                    "Name, email and message are required.",
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email
            .trim()
            .toLowerCase();
        const cleanMessage = message.trim();

        if (
            !cleanName ||
            !cleanEmail ||
            !cleanMessage
        ) {
            return res.status(400).json({
                message:
                    "Please fill in all fields.",
            });
        }

        // --------------------------------
        // EMAIL VALIDATION
        // --------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                message:
                    "Please enter a valid email address.",
            });
        }

        // --------------------------------
        // LENGTH VALIDATION
        // --------------------------------

        if (cleanName.length > 100) {
            return res.status(400).json({
                message:
                    "Name is too long.",
            });
        }

        if (cleanMessage.length > 5000) {
            return res.status(400).json({
                message:
                    "Message is too long.",
            });
        }

        // --------------------------------
        // SAVE TO MONGODB
        // --------------------------------

        const savedMessage =
            await Message.create({
                name: cleanName,
                email: cleanEmail,
                message: cleanMessage,
            });

        // --------------------------------
        // SEND EMAIL TO YOUR GMAIL
        // --------------------------------

        await transporter.sendMail({
            from: `"Raushan Portfolio" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            replyTo: cleanEmail,

            subject:
                `Portfolio Contact: ${cleanName}`,

            text: `
New message from your portfolio

========================================

Name:
${cleanName}

Email:
${cleanEmail}

Message:
${cleanMessage}

========================================

Sent from Raushan Kumar Ray's portfolio.
            `,
        });

        // --------------------------------
        // SUCCESS RESPONSE
        // --------------------------------

        return res.status(201).json({
            success: true,

            message:
                "Message sent successfully!",

            data: {
                id: savedMessage._id,
            },
        });

    } catch (error) {

        console.error(
            "CONTACT FORM ERROR:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                "Could not send message. Please try again later.",
        });
    }
};

// ========================================
// EXPORT
// ========================================

module.exports = {
    sendMessage,
};