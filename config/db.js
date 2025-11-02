import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) throw new Error("⚠️ MONGO_URL is missing");

let globalConn = global._mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (globalConn.conn) return globalConn.conn;

  if (!globalConn.promise) {
    globalConn.promise = mongoose
      .connect(MONGODB_URL, { dbName: "deepseek" })
      .then(mongoose => mongoose);
  }

  globalConn.conn = await globalConn.promise;
  return globalConn.conn;
}

global._mongoose = globalConn;
