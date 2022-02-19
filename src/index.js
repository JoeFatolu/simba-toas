import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProviders } from "./context";
import { GlobalStyle } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
      <GlobalStyle />
      <ToastContainer />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
