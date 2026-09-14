require("dotenv").config();

const nodemailer = require("nodemailer");

console.log("Email:", process.env.EMAIL_USER);
console.log(
    "Password loaded:",
    Boolean(process.env.EMAIL_PASS)
);

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function testEmail() {
    try {
        console.log("Checking Gmail connection...");

        await transporter.verify();

        console.log("✅ Gmail authentication successful!");

        const info = await transporter.sendMail({
            from: `"Raushan Portfolio" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            subject: "Portfolio Email Test",

            text: `
This is a test email from my MERN portfolio.

If you received this email, Gmail + Nodemailer is working correctly.
            `,
        });

        console.log(
            "✅ Email sent successfully!"
        );

        console.log(
            "Message ID:",
            info.messageId
        );

    } catch (error) {
        console.error(
            "\n❌ EMAIL TEST FAILED\n"
        );

        console.error(
            "Name:",
            error.name
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Code:",
            error.code
        );

        console.error(
            "Command:",
            error.command
        );
    }
}

testEmail();