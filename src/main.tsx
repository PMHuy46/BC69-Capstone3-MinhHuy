import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastifyProvider } from "./contexts/ToastifyProvider.tsx";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastifyProvider>
          <App />
        </ToastifyProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
