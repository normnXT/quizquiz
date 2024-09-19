import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizApiResponse {
    response_code: number;
    results: Question[];
}

interface QuizQueryParams {
    difficulty: string;
    category: string;
    token: string;
    questionType: string;
}

interface TokenResponse {
    response_code: number;
    token: string;
}

export const newGameAPISlice = createApi({
    reducerPath: "newGameAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/" }),
    tagTypes: ["NewGame"],
    endpoints: (builder) => ({
        // Endpoint to request a session token
        getSessionToken: builder.query<TokenResponse, void>({
            query: () => "api_token.php?command=request"
        }),

        // Endpoint to get quiz questions with the session token
        getQuizQuestions: builder.query<QuizApiResponse, QuizQueryParams>({
            query: ({ difficulty, category, token, questionType }) => {
                let url = `api.php?amount=10&token=${token}`;
                if (difficulty !== "any") url += `&difficulty=${difficulty}`;
                if (category !== "any") url += `&category=${category}`;
                if (questionType !== "any") url += `&type=${questionType}`;
                return url;
            },
            providesTags: (result, error, arg) => [{ type: "NewGame", arg }]
        }),

        // Optional: Endpoint to reset the session token
        resetSessionToken: builder.mutation<TokenResponse, string>({
            query: (token) => `api_token.php?command=reset&token=${token}`
        })
    })
});

export const { useLazyGetQuizQuestionsQuery, useGetSessionTokenQuery, useResetSessionTokenMutation } = newGameAPISlice;
