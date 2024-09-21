import type React from "react";
import { Routes, Route } from "react-router-dom";
import NewGame from "./features/newGame/NewGame";
import Quiz from "./features/quiz/Quiz";
import LoginSplash from "./features/loginSplash/LoginSplash";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import { useAppSelector } from "./app/hooks";
import Logout from "./features/logout/Logout";
import CurrentScore from "./features/currentScore/CurrentScore";
import HistoricScore from "./features/historicScore/HistoricScore";
import ThemeToggle from "./features/themeToggle/ThemeToggle";
import { Box, Container } from "@mui/material";

interface AppProps {
    toggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ toggleTheme }) => {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

    return (
        <Container className="font-mono !max-w-md !min-w-xs">
            <ThemeToggle onChange={toggleTheme} />
            <CurrentScore />
            <Quiz />
            <NewGame />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Logout /> : <LoginSplash />} />
                <Route path="/login" element={isLoggedIn ? <Logout /> : <Login />} />
                <Route path="/register" element={isLoggedIn ? <Logout /> : <Register />} />
            </Routes>
            <HistoricScore />
        </Container>
    );
};

export default App;