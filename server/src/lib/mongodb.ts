import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI = process.env["MONGODB_URI"];

let connected = false;
let dbAvailable = false;

export function isDbAvailable(): boolean {
  return dbAvailable;
}

export async function connectDB(): Promise<void> {
  if (connected) return;
  if (!MONGODB_URI) {
    logger.warn("MONGODB_URI is not set — using in-memory fallback data");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    connected = true;
    dbAvailable = true;
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error({ err }, "Failed to connect to MongoDB — using in-memory fallback data");
  }
}

export { mongoose };
