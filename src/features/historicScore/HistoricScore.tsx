import React, { useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme, Divider } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchHistoricScore } from "./historicScoreAPISlice";
import { renderActiveShape } from "../../utils/renderActiveShape";

const HistoricScore: React.FC = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const user = useAppSelector((state) => state.login.user);
    const { score, totalQuestionsAnswered, loading, error } = useAppSelector((state) => state.historicScore);

    useEffect(() => {
        if (isLoggedIn && user && user.uid) {
            dispatch(fetchHistoricScore(user.uid));
        }
    }, [isLoggedIn, user, dispatch]);

    if (!isLoggedIn || !user) return null;

    const pieData = [
        { name: "Correct", value: score },
        { name: "Incorrect", value: totalQuestionsAnswered - score }
    ];

    const barData = [
        { name: "Correct", value: score },
        { name: "Total", value: totalQuestionsAnswered }
    ];

    return (
        <Box className="app-container-bottom h-56">
            <Typography className="h6 absolute px-2 -top-3.5" bgcolor={theme.palette.background.default}>
                Historic Score
            </Typography>
            {loading ? (
                <Box className="flex justify-center items-center h-full">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography className="text-red-500">Error: {error}</Typography>
            ) : (
                <Box className="flex flex-row items-center justify-between h-full">
                    <Box className="w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={0}
                                    activeShape={renderActiveShape}
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={45}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? theme.palette.chart.correct : theme.palette.chart.incorrect} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                    <Divider className="hidden sm:flex" orientation="vertical" flexItem />
                    <Box className="w-1/2 h-full flex items-center justify-center">
                        <ResponsiveContainer width={175} height="80%">
                            <BarChart data={barData}>
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: theme.palette.text.primary }} />
                                <YAxis tick={{ fontSize: 10, fill: theme.palette.text.primary }} />
                                <Tooltip contentStyle={{
                                    backgroundColor: theme.palette.background.paper,
                                    color: theme.palette.text.primary
                                }} />
                                <Bar dataKey="value" fill="#8884d8">
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? theme.palette.chart.correct : theme.palette.chart.total} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default HistoricScore;