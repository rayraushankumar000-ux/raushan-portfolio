require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");

const newPassword = "Raushan@77";

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const hashedPassword = await bcrypt.hash(
            newPassword,
            12
        );

        const user = await User.findOneAndUpdate(
            {
                email: process.env.ADMIN_EMAIL,
            },
            {
                password: hashedPassword,
            },
            {
                new: true,
            }
        );

        if (!user) {
            console.log("❌ Admin user not found.");
            process.exit(1);
        }

        console.log("✅ Vault password changed successfully.");
        console.log("Admin:", user.email);

        await mongoose.disconnect();
    } catch (error) {
        console.error("❌ Password reset failed:", error.message);
        process.exit(1);
    }
}

resetPassword();