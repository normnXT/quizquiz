import type React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "./loginAPISlice";
import { toast } from "react-toastify";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector((state) => state.login);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(resultAction)) {
            toast.success("Logged in successfully");
        } else if (loginUser.rejected.match(resultAction)) {
            toast.error(`Login failed: ${resultAction.payload}`);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={onLogin}
            className="app-container"
            noValidate
        >
            <TextField
                required
                id="email-label"
                label="Email"
                value={email}
                className="w-full"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value as string);
                }}
            />
            <TextField
                required
                id="password-label"
                label="Password"
                type="password"
                value={password}
                className="w-full !mt-3"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value as string);
                }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full !mt-3"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                className="w-full !mt-3"
            >
                Back
            </Button>
        </Box>
    );
};

export default Login;