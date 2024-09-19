import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginSplash: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box className="app-container">
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/login")}
                className="w-full !mt-3"
            >
                Login
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/register")}
                className="w-full !mt-3"
            >
                Register
            </Button>
        </Box>
    );
};

export default LoginSplash;