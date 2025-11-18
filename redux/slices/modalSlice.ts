import { createSlice } from '@reduxjs/toolkit'


//this is for opening and closing modals throughout the app like login and signup
const initialState = {
    signUpmodalOpen: false,
    loginModalOpen: false,
    forgotPasswordModalOpen: false
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
        state.signUpmodalOpen = true
    },
    closeSignUpModal: (state) => {
        state.signUpmodalOpen = false
    },
    openLoginModal: (state) => {
        state.loginModalOpen = true
    },
    closeLoginModal: (state) => {
        state.loginModalOpen = false
    },
    openForgotModal: (state) => {
        state.forgotPasswordModalOpen = true
    },
    closeForgotModal: (state) => {
        state.forgotPasswordModalOpen = false
    }
  }
});

export const { openSignUpModal, closeSignUpModal, openLoginModal, closeLoginModal, openForgotModal, closeForgotModal } = modalSlice.actions

export default modalSlice.reducer