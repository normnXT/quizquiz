import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

interface RegisterState {
  error: string | null;
  loading: boolean;
}

const initialState: RegisterState = {
  error: null,
  loading: false,
};

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Initializes user document in Firestore with default quiz stats
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        score: 0,
        totalQuestionsAnswered: 0,
      });
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAPISlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerAPISlice.reducer;
