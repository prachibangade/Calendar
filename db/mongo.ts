import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("Missing MONGO_URI in .env.local");

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000, // 15 seconds for server selection
      connectTimeoutMS: 15000, // 15 seconds to establish connection
      socketTimeoutMS: 45000, // 45 seconds for socket operations
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      w: "majority",
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // Re-throw to propagate error to caller
  }
}
