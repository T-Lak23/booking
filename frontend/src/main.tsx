import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { ExperienceProvider } from "./store/useExperienceStore.tsx";
import { BookingProvider } from "./store/useBookingStore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ExperienceProvider>
        <BookingProvider>
          <App />
          <Toaster position="top-right" />
        </BookingProvider>
      </ExperienceProvider>
    </BrowserRouter>
  </StrictMode>
);
