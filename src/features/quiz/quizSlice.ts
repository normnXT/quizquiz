import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Question } from "../newGame/newGameAPISlice";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface QuizState {
    questions: Question[];
    score: number;
    totalQuestionsAnswered: number;
    lastAnswerCorrect: boolean | null;
    isActive: boolean;
}

const initialState: QuizState = {
    questions: [],
    score: 0,
    totalQuestionsAnswered: 0,
    lastAnswerCorrect: null,
    isActive: false
};

export const updateUserScore = createAsyncThunk(
  "quiz/updateUserScore",
  async ({ userId, score, totalQuestionsAnswered }: { userId: string, score: number, totalQuestionsAnswered: number }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        score: increment(score),
        totalQuestionsAnswered: increment(totalQuestionsAnswered),
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
            state.score = 0;
            state.totalQuestionsAnswered = 0;
            state.lastAnswerCorrect = null;
            state.isActive = true;
        },
        answerQuestion: (state, action: PayloadAction<string>) => {
            if (action.payload === state.questions[state.totalQuestionsAnswered].correct_answer) {
                state.lastAnswerCorrect = true;
                state.score += 1;
            } else {
                state.lastAnswerCorrect = false;
            }

            state.totalQuestionsAnswered += 1;

            if (state.totalQuestionsAnswered >= state.questions.length) {
                state.isActive = false;
            }
        }
    },
    selectors: {
        selectScore: (QuizState) => QuizState.score,
        selectQuestions: (QuizState) => QuizState.questions,
        selectTotalQuestionsAnswered: (QuizState) => QuizState.totalQuestionsAnswered,
        selectLastAnswerCorrect: (QuizState) => QuizState.lastAnswerCorrect,
        selectIsActive: (QuizState) => QuizState.isActive
    },
    extraReducers: (builder) => {
    builder
      .addCase(updateUserScore.rejected, (state, action) => {
        console.error("Failed to update user score:", action.payload);
      });
  },
});

// Exporting actions
export const { setQuestions, answerQuestion } = quizSlice.actions;

// Exporting selectors
export const {
    selectScore,
    selectQuestions,
    selectTotalQuestionsAnswered,
    selectLastAnswerCorrect,
    selectIsActive
} = quizSlice.selectors;

export default quizSlice.reducer;