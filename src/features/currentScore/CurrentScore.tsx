import React from "react";
import { Box, Typography, useTheme, Divider, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAppSelector } from "../../app/hooks";
import { selectScore, selectTotalQuestionsAnswered } from "../quiz/quizSlice";
import { renderActiveShape } from "../../utils/renderActiveShape";

const CurrentScore: React.FC = () => {
    const theme = useTheme();
    const score = useAppSelector(selectScore);
    const totalQuestionsAnswered = useAppSelector(selectTotalQuestionsAnswered);
    const isMobile = useMediaQuery("(max-width:640px)");
    const incorrectAnswers = totalQuestionsAnswered - score;

    // Prepares data for the pie chart, handles case when no questions have been answered
    // Value for "No data" is set to 1 so that the pie chart will always be rendered in-place
    const data = totalQuestionsAnswered > 0
        ? [
            { name: "Correct", value: score },
            { name: "Incorrect", value: incorrectAnswers }
        ]
        : [{ name: "No data", value: 1 }];

    return (
        <Box className={`app-container-top ${isMobile ? 'h-96' : 'h-56'}`}>
            <Typography className="h6 absolute px-2 -top-3.5" bgcolor={theme.palette.background.default}>
                Current Score
            </Typography>
            <Box className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-between h-full`}>
                <Box className={isMobile ? "w-full h-1/2" : "w-1/2 h-full"}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={0}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                fill="#8884d8"
                                dataKey="value"
                                innerRadius={isMobile ? 20 : 25}
                                outerRadius={isMobile ? 40 : 45}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`}
                                          fill={index === 0 ? theme.palette.chart.correct : theme.palette.chart.incorrect} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Divider className={isMobile ? "hidden" : "flex"} orientation="vertical" />
                <Box className={`flex flex-col ${isMobile ? "w-full h-1/2" : "w-1/2"} items-center justify-center`}>
                    <Typography variant="h4">
                        {score}/{totalQuestionsAnswered}
                    </Typography>
                    <Typography variant="h4">
                        {totalQuestionsAnswered > 0
                            ? `${((score / totalQuestionsAnswered) * 100).toFixed(1)}%`
                            : "No data"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CurrentScore;