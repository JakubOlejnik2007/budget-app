import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrapper";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    warning: {
      main: "#ffc107",
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <AuthWrapper />
          </ThemeProvider>
        </BrowserRouter>
        <ToastContainer role="alert" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
