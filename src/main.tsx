import { createRoot } from "react-dom/client";
import React from "react";
import "./styles/index.css";
import App from "app/App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {React.createElement(App)}
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Ensure there is a div with id 'root' in your HTML.");
}
