import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppLayout } from "./app/layouts/AppLayout";
import { Toaster } from "./components/ui/sonner";
import { AvisosDeLaApp } from "./shared/components/AvisosDeLaApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppLayout />
    <AvisosDeLaApp />
    <Toaster position="top-center" richColors duration={3000} />
  </StrictMode>
);
