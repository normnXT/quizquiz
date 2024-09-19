import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { checkAuthState } from "./features/login/loginAPISlice";

const Root: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    useEffect(() => {
        store.dispatch(checkAuthState());
    }, []);

    return (
        <React.StrictMode>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                <Provider store={store}>
                    <Router>
                        <App toggleTheme={toggleTheme} />
                        <ToastContainer theme={isDarkMode ? "dark" : "light"} position="top-center" />
                    </Router>
                </Provider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);
    root.render(<Root />);
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
    );
}