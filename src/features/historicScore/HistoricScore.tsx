import type React from "react";
import { useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchHistoricScore } from "./historicScoreAPISlice";

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

    const incorrectAnswers = totalQuestionsAnswered - score;

    const pieData = [
        { id: 0, value: score, label: "Correct" },
        { id: 1, value: incorrectAnswers, label: "Incorrect" }
    ];

    const barData = [
        { category: "Correct", value: score },
        { category: "Total", value: totalQuestionsAnswered }
    ];


    return (
        <Box className="app-container-bottom">
            <Typography className="h6 absolute px-2 -top-3.5" bgcolor={theme.palette.background.default}>
                Historic Score
            </Typography>
            {loading ? (
                <Box className="flex justify-center items-center h-52">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography className="text-red-500">Error: {error}</Typography>
            ) : (
                <Box className="flex flex-row items-center justify-between">
                    <PieChart
                        series={[
                            {
                                data: pieData,
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
                        width={200}
                        height={200}
                        slotProps={{
                            legend: { hidden: true }
                        }}
                        className="!w-full"
                    />
                    <BarChart
                        dataset={barData}
                        xAxis={[{
                            scaleType: "band",
                            dataKey: "category",
                            tickLabelStyle: {
                                angle: 45,
                                textAnchor: "start",
                                fontSize: 11
                            },
                            colorMap: {
                                type: "ordinal",
                                values: ["Correct", "Total"],
                                colors: ["#80ef80", "#b3ebf2"]
                            }
                        }]}
                        yAxis={[{
                            tickLabelStyle: {
                                fontSize: 11
                            }
                        }]}
                        series={[{ dataKey: "value", label: "Score" }]}
                        width={200}
                        height={200}
                        slotProps={{
                            legend: { hidden: true }
                        }}
                        className="!w-full"
                    />
                </Box>
            )}
        </Box>
    );
};

export default HistoricScore;