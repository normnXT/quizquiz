import type React from "react";
import { useEffect, useState } from "react";

import type { SelectChangeEvent } from "@mui/material";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";

import { useLazyGetQuizQuestionsQuery, useGetSessionTokenQuery, useResetSessionTokenMutation } from "./newGameAPISlice";
import { useAppDispatch } from "../../app/hooks";
import { setQuestions } from "../quiz/quizSlice";

interface Category {
    id: number;
    name: string;
}

const categories: Category[] = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" }
];

const NewGame: React.FC = () => {
    const dispatch = useAppDispatch();
    const [difficulty, setDifficulty] = useState<string>("any");
    const [category, setCategory] = useState<string>("any");
    const [token, setToken] = useState<string>("");
    const [questionType, setQuestionType] = useState<string>("any");
    const { data: tokenData, isSuccess: isTokenSuccess } = useGetSessionTokenQuery();
    const [getQuizQuestions, { data, isError, isLoading, isSuccess }] = useLazyGetQuizQuestionsQuery();
    const [resetSessionToken] = useResetSessionTokenMutation();

    useEffect(() => {
        if (isTokenSuccess && tokenData) {
            setToken(tokenData.token);
        }
    }, [isTokenSuccess, tokenData]);

    useEffect(() => {
        if (isSuccess && data) {
            if (data.response_code === 4) {
                resetSessionToken(token).then((res: any) => {
                    if (res.data?.token) {
                        setToken(res.data.token);
                        getQuizQuestions({ difficulty, category, token, questionType });
                    }
                });
            } else {
                dispatch(setQuestions(data.results));
            }
        }
    }, [isSuccess, data, token, difficulty, category, dispatch, getQuizQuestions, resetSessionToken]);

    const onDifficultyChange = (event: SelectChangeEvent) => {
        setDifficulty(event.target.value as string);
    };

    const onCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const onQuestionTypeChange = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value as string);
    };

    const onNewGame = () => {
        if (token) {
            getQuizQuestions({ difficulty, category, token, questionType });
        }
    };

    return (
        <Box className="app-container">
            <FormControl className="w-full">
                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                <Select
                    labelId="difficulty-label"
                    value={difficulty}
                    label="Difficulty"
                    onChange={onDifficultyChange}
                    variant="outlined"
                >
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="w-full !mt-3">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={category}
                    label="Category"
                    onChange={onCategoryChange}
                    variant="outlined"
                >
                    <MenuItem value="any">Any</MenuItem>
                    {categories.map((cat: Category) => (
                        <MenuItem key={cat.id} value={cat.id.toString()}>{cat.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="w-full !mt-3">
                <InputLabel id="question-type-label">Question Type</InputLabel>
                <Select
                    labelId="question-type-label"
                    value={questionType}
                    label="Question Type"
                    onChange={onQuestionTypeChange}
                    variant="outlined"
                >
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="multiple">Multiple Choice</MenuItem>
                    <MenuItem value="boolean">True / False</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={onNewGame}
                disabled={isLoading || !token}
                className="w-full !mt-3"
            >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "New Game"}
            </Button>
            {isError && <p className="text-red-500 mt-4">There was an error fetching the quiz questions.</p>}
        </Box>
    );
};

export default NewGame;
