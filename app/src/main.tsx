import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import { router } from "@/routes/router";
import "./index.css";

// oxlint-disable-next-line typescript/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TranslationsProvider>
      <RouterProvider router={router} />
    </TranslationsProvider>
  </StrictMode>,
);
