import type React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import DOMPurify from "dompurify";
import {
    selectQuestions,
    answerQuestion,
    selectTotalQuestionsAnswered,
    selectIsActive,
    selectLastAnswerCorrect,
    updateUserScore,
    selectScore
} from "./quizSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Quiz: React.FC = () => {
    const dispatch = useAppDispatch();
    const score = useAppSelector(selectScore);
    const questions = useAppSelector(selectQuestions);
    const isActive = useAppSelector(selectIsActive);
    const totalQuestionsAnswered = useAppSelector(selectTotalQuestionsAnswered);
    const lastAnswerCorrect = useAppSelector(selectLastAnswerCorrect);
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const user = useAppSelector((state) => state.login.user);
    const [answers, setAnswers] = useState<string[]>([]);
    const currentQuestion = questions[totalQuestionsAnswered];

    useEffect(() => {
        if (isActive) {
            if (currentQuestion.type === "multiple") {
                setAnswers([...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5));
            } else {
                setAnswers(["True", "False"]);
            }
        }
        if (!isActive && totalQuestionsAnswered === questions.length && isLoggedIn) {
            dispatch(updateUserScore({
                userId: user.uid,
                score: score,
                totalQuestionsAnswered: totalQuestionsAnswered
            }));
        }
    }, [isActive, totalQuestionsAnswered]);

    const onAnswer = (answer: string) => {
        dispatch(answerQuestion(answer));
    };

    if (!isActive) {
        return (
            <Box className="app-container">
                <Typography variant="h6">Welcome to QuizQuizz!</Typography>
                <Typography variant="body1" className="mt-2">
                    This app is a mobile friendly user interface for the Open Trivia Database API. To start playing,
                    select your preferred options and click the "New Game" button below. Login to keep track of your
                    score!
                </Typography>
            </Box>
        );
    }

    if (isActive) {
        return (
            <Box className="app-container">
                <div>
                    {lastAnswerCorrect !== null && (
                        <Alert severity={lastAnswerCorrect ? "success" : "error"} className="mb-4">
                            {lastAnswerCorrect ? "Correct!" : "Incorrect!"}
                        </Alert>
                    )}
                    <Typography variant="h6"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentQuestion.question) }} />
                    <Box className="mt-4">
                        {answers.map((answer, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                className="w-full !mt-2"
                                onClick={() => onAnswer(answer)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }} />
                            </Button>
                        ))}
                    </Box>
                    <Typography className="!mt-2 !text-sm">
                        Question {totalQuestionsAnswered + 1} of {questions.length}
                    </Typography>
                </div>
            </Box>
        );
    }
};

export default Quiz;