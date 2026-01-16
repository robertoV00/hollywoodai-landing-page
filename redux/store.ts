import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./slices/modalSlice"
import userSlice from './slices/userSlice'
import favoritesSlice from './slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    favorites: favoritesSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch