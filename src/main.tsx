import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@/lib/api-client";
import App from "./App";
import "./index.css";

// When the frontend (Vercel) and backend (Railway) are deployed to different
// origins, VITE_API_URL points requests at the backend. If unset, API calls
// remain relative ("/api/..."), preserving the original same-origin behavior.
const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
if (apiUrl) {
  setBaseUrl(apiUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
