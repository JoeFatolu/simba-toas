import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";
import { GlobalStyle } from "../styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppProviders({ children }) {
  return (
    <Router>
      <GlobalStyle />
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer />
    </Router>
  );
}

export { AppProviders };
