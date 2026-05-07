import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

// Import your route definitions here (Adjust the filename if yours is different!)
import apiRouter from "./routes";

const app: Express = express();

// This will be your Vercel URL. We'll set it as an environment variable in Render.
const clientUrl = process.env.CLIENT_URL;

const allowedOrigins = [
  "http://localhost:5173", // Vite default dev port
  "http://127.0.0.1:5173",
  "http://localhost:4173", // Vite default preview port
  "https://vinodkumar-eight.vercel.app", // Production Vercel URL
];

// If the CLIENT_URL is set (in production), add it to the allowed origins
if (clientUrl) {
  allowedOrigins.push(clientUrl);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Important for cookies, authorization headers, etc.
  }),
);

app.use(express.json());
app.use(cookieParser());

// Mount the API routes
app.use("/api", apiRouter);

export default app;