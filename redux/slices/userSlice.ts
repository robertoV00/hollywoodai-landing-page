import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    username: "",
    email: "",
    uid: "",
    isSubscribed: false,
    subscriptionType: "basic" // "basic", "premium", "vip+"
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
        state.name = action.payload.name
        state.username = action.payload.username
        state.email = action.payload.email
        state.uid = action.payload.uid
        state.isSubscribed = action.payload.isSubscribed !== undefined ? action.payload.isSubscribed : true
        state.subscriptionType = action.payload.subscriptionType || "basic"
        
        // Persist to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state))
        }
    },
    signOutUser: (state) => {
        state.name = ""
        state.username = ""
        state.email = ""
        state.uid = ""
        state.isSubscribed = false
        state.subscriptionType = "basic"
        
        // Clear from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user')
        }
    },
    restoreUser: (state, action) => {
        state.name = action.payload.name
        state.username = action.payload.username
        state.email = action.payload.email
        state.uid = action.payload.uid
        state.subscriptionType = action.payload.subscriptionType || "basic"
        state.isSubscribed = action.payload.isSubscribed
    }
  }
});

export const { signInUser, signOutUser, restoreUser } = userSlice.actions

export default userSlice.reducer