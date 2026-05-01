import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI = process.env["MONGODB_URI"];

if (!MONGODB_URI) {
  logger.warn("MONGODB_URI is not set — database features will be unavailable");
}

let connected = false;

export async function connectDB(): Promise<void> {
  if (connected || !MONGODB_URI) return;

  try {
    await mongoose.connect(MONGODB_URI);
    connected = true;
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error({ err }, "Failed to connect to MongoDB");
    throw err;
  }
}

export { mongoose };
