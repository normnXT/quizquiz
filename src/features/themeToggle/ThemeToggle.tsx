import type React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import sunIcon from '../../assets/sun.svg';
import moonIcon from '../../assets/moon.svg';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url(${moonIcon})`
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be"
            }
        }
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
        width: 32,
        height: 32,
        "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${sunIcon})`
        }
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        borderRadius: 20 / 2
    }
}));

interface ThemeToggleProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onChange }) => {
    const theme = useTheme();
    return (
        <Box className="max-w-md mx-auto flex justify-end">
            <MaterialUISwitch
                sx={{ m: 1 }}
                checked={theme.palette.mode === "dark"}
                onChange={onChange}
            />
        </Box>
    );
};

export default ThemeToggle;