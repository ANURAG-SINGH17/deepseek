const { default: connectDB } = require("@/config/db");

connectDB()
  .then(() => console.log("🌍 MongoDB connected (global init)"))
  .catch((err) => console.error("❌ MongoDB init error:", err));