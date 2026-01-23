import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Movie {
  id: string
  title: string
  director: string
  imageLink: string
  rating: string
  subscriptionRequired: boolean
  [key: string]: any
}

interface FavoritesState {
  movies: Movie[]
}

const initialState: FavoritesState = {
  movies: []
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.movies.some(movie => movie.id === action.payload.id)
      if (!exists) {
        state.movies.push(action.payload)
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state.movies))
        }
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload)
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.movies))
      }
    },
    setFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.movies))
      }
    }
  }
})

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
