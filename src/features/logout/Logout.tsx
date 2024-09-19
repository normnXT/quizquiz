import type React from "react";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../login/loginAPISlice";
import { toast } from 'react-toastify';

const Logout: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully");
    };

    return (
        <Box className="app-container">
            <Button
                variant="contained"
                color="primary"
                className="w-full"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
    );
};

export default Logout;