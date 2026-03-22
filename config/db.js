const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://promodpradhan369_db_user:iBbShegjrReFnIS0@cluster0.ijwxkl1.mongodb.net/note");
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ DB Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;