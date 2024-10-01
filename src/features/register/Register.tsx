import type React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "./registerAPISlice";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector((state) => state.register);

    const onRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        const resultAction = await dispatch(registerUser({ email, password }));
        if (registerUser.fulfilled.match(resultAction)) {
            toast.success("Registration successful! Please log in.");
            navigate("/login");
        } else if (registerUser.rejected.match(resultAction)) {
            toast.error(`Registration failed: ${resultAction.payload}`);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={onRegister}
            className="app-container"
            noValidate
        >
            <TextField
                required
                id="email-label"
                label="Email"
                className="w-full"
                value={email}
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
            <TextField
                required
                id="confirm-password-label"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                className="w-full !mt-3"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(event.target.value as string);
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
                {loading ? "Registering..." : "Register"}
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

export default Register;