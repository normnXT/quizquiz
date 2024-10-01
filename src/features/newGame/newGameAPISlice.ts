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
    // Response codes:
    // 0: Success
    // 1: No Results (not enough questions for the query)
    // 2: Invalid Parameter
    // 3: Token Not Found
    // 4: Token Empty (all questions for the query have been returned)
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
        // Session Tokens are unique keys that will help keep track of the questions the API has already retrieved
        // Tokens are valid for 6 hours of inactivity
        getSessionToken: builder.query<TokenResponse, void>({
            query: () => "api_token.php?command=request"
        }),
        // Example of a full url being built by getQuizQuestions:
        // "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
        // Only one category can be requested per API call
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

        // Called when all questions for a query have been exhausted
        resetSessionToken: builder.mutation<TokenResponse, string>({
            query: (token) => `api_token.php?command=reset&token=${token}`
        })
    })
});

export const { useLazyGetQuizQuestionsQuery, useGetSessionTokenQuery, useResetSessionTokenMutation } = newGameAPISlice;
