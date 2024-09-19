import type React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useAppSelector } from "../../app/hooks";
import { selectScore, selectTotalQuestionsAnswered } from "../quiz/quizSlice";

const CurrentScore: React.FC = () => {
    const theme = useTheme();
    const score = useAppSelector(selectScore);
    const totalQuestionsAnswered = useAppSelector(selectTotalQuestionsAnswered);
    const incorrectAnswers = totalQuestionsAnswered - score;

    const data = totalQuestionsAnswered > 0
        ? [
            { id: 0, value: score, label: "Correct" },
            { id: 1, value: incorrectAnswers, label: "Incorrect" }
        ]
        : [{ id: 0, value: 1, label: "No data" }];

    return (
        <Box className="app-container-top">
            <Typography className="h6 absolute px-2 -top-3.5" bgcolor={theme.palette.background.default}>
                Current Score
            </Typography>
            <Box className="flex flex-row items-center justify-between h-[11.5rem]">
                <PieChart
                    series={[
                        {
                            data,
                            arcLabel: (params) => params.label ?? "",
                            arcLabelRadius: "165%",
                            innerRadius: 20,
                            outerRadius: 60,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -90,
                            endAngle: 275,
                            cx: 100,
                        }
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fontSize: 11
                        }
                    }}
                    colors={["#80ef80", "#FF746C"]}
                    slotProps={{
                        legend: { hidden: true }
                    }}
                    width={200}
                    height={200}
                    className="!w-full"
                />
                <Box className="flex flex-col w-full items-center">
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