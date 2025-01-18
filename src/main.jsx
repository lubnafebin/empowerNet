import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AlertContextProvider, AppStateContextProvider } from "./store";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
  // future={{
  //   v7_startTransition: true,
  //   v7_relativeSplatPath: true,
  // }}
  >
    <AppStateContextProvider>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </AppStateContextProvider>
  </BrowserRouter>,
);
