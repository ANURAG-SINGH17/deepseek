import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("❌ MongoDB URL is missing in environment variables!");
}

export const connectDB = async () => {
  // If already connected → return
  if (mongoose.connection.readyState === 1) {
    // 1 = connected
    return console.log("✅ MongoDB already connected");
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: "test", // Optional but recommended to avoid automatic naming
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.log("❌ MongoDB connection failed:", err.message);
  }
};
