import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL;

if (!MONGO_URL) {
  throw new Error("❌ MONGO_URL not found in env");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URL, {
      dbName: "deepseek"
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}
