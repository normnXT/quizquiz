import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { newGameAPISlice } from "../features/newGame/newGameAPISlice"
import { quizSlice } from "../features/quiz/quizSlice"
import { loginAPISlice } from "../features/login/loginAPISlice"
import { registerAPISlice } from "../features/register/registerAPISlice"
import { historicScoreAPISlice } from '../features/historicScore/historicScoreAPISlice';

const rootReducer = combineSlices(newGameAPISlice, quizSlice, loginAPISlice, registerAPISlice, historicScoreAPISlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(newGameAPISlice.middleware)
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>