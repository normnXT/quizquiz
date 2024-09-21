import React from "react";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAppSelector } from "../../app/hooks";
import { selectScore, selectTotalQuestionsAnswered } from "../quiz/quizSlice";
import { renderActiveShape } from "../../utils/renderActiveShape";

const CurrentScore: React.FC = () => {
  const theme = useTheme();
  const score = useAppSelector(selectScore);
  const totalQuestionsAnswered = useAppSelector(selectTotalQuestionsAnswered);
  const incorrectAnswers = totalQuestionsAnswered - score;

  const data = totalQuestionsAnswered > 0
    ? [
      { name: "Correct", value: score },
      { name: "Incorrect", value: incorrectAnswers }
    ]
    : [{ name: "No data", value: 1 }];

  return (
    <Box className="app-container-top h-56">
      <Typography className="h6 absolute px-2 -top-3.5" bgcolor={theme.palette.background.default}>
        Current Score
      </Typography>
      <Box className="flex flex-row items-center justify-between h-full">
        <Box className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={0}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={45}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? theme.palette.chart.correct : theme.palette.chart.incorrect} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Divider className="hidden sm:flex" orientation="vertical" flexItem />
        <Box className="flex flex-col w-1/2 items-center">
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