import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, User, signOut } from "firebase/auth";

interface LoginState {
    isLoggedIn: boolean;
    user: any | null;
    error: string | null;
    loading: boolean;
}

const initialState: LoginState = {
    isLoggedIn: false,
    user: null,
    error: null,
    loading: false
};

const serializeUser = (user: User | null) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return serializeUser(userCredential.user);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkAuthState = createAsyncThunk(
    "login/checkAuthState",
    async (_, { dispatch}) => {
        return new Promise<void>((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch(loginSuccess(serializeUser(user)));
                } else {
                    dispatch(logout());
                }
                resolve();
            });
        });
    }
);

export const loginAPISlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            signOut(auth)
            state.isLoggedIn = false;
            state.user = null;
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(checkAuthState.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthState.fulfilled, (state) => {
                state.loading = false;
            });
    }
});

export const { logout, loginSuccess } = loginAPISlice.actions;

export default loginAPISlice.reducer;