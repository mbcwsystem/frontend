import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./providers/App";
import "@/app/global/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
