import $ from "jquery";

window.$ = window.jQuery = $;

// ✅ ONLY full build
import "select2/dist/js/select2.full.js";
import "select2/dist/css/select2.min.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
