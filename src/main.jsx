import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.jsx";
import ErrorFallBack from "../src/ui/ErrorFallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => window.location.replace("/")}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
