import { connectDB } from "@/config/db";

connectDB()
  .then(() => console.log("✅ Global MongoDB connected"))
  .catch((err) => console.log("❌ DB global init error →", err));
