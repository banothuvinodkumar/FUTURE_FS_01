import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// In production (Vercel), VITE_API_BASE_URL is set to the Render backend URL
// so all API hooks call https://portfolio-website-o7lp.onrender.com/api/*.
// In local development, this is empty so relative /api/* paths are used,
// which Vite's dev server proxy forwards to localhost:8080.
const apiBase = import.meta.env.VITE_API_BASE_URL;
if (apiBase) {
  setBaseUrl(apiBase);
}

createRoot(document.getElementById("root")!).render(<App />);
