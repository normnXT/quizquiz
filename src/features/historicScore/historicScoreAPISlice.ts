import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface HistoricScoreState {
  score: number;
  totalQuestionsAnswered: number;
  loading: boolean;
  error: string | null;
}

const initialState: HistoricScoreState = {
  score: 0,
  totalQuestionsAnswered: 0,
  loading: false,
  error: null,
};


export const fetchHistoricScore = createAsyncThunk(
  'historicScore/fetchHistoricScore',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data() as { score: number; totalQuestionsAnswered: number };
        return data;
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const historicScoreAPISlice = createSlice({
  name: 'historicScore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoricScore.fulfilled, (state, action) => {
        state.loading = false;
        state.score = action.payload.score;
        state.totalQuestionsAnswered = action.payload.totalQuestionsAnswered;
      })
      .addCase(fetchHistoricScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default historicScoreAPISlice.reducer;
