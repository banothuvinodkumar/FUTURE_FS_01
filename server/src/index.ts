import app from "./app";
import { logger } from "./lib/logger";
import { seedDatabase } from "./seed";
import mongoose from "mongoose";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Run the database seed, then start the server
(async () => {
  try {
    // Ensure database connection is established before seeding
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set.");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("Connected to MongoDB successfully");

    await seedDatabase();
  } catch (error) {
    logger.error({ err: error }, "Failed to connect to MongoDB or seed database");
    process.exit(1); // Force crash so Render knows it failed and retries!
  }

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
})();
