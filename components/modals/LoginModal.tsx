"use client"

import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeLoginModal, openForgotModal, openLoginModal, openSignUpModal } from '@/redux/slices/modalSlice'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import SignUpModal from './SignUpModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '@/firebase'
import Image from 'next/image'
import { doc, getDoc, setDoc } from 'firebase/firestore'


export default function LoginModal() {

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isOpen = useSelector((state: RootState) => state.modals.loginModalOpen)

    //to use the reducers created in the modalSlice file, we need to use the dispatch hook
    const dispatch: AppDispatch = useDispatch()

    async function handleLogIn() {
      await signInWithEmailAndPassword(auth, email, password)
    }

    async function handleGuestLogin() {
      await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "12345678")
      dispatch(closeLoginModal())
    }

    const provider = new GoogleAuthProvider()
        const loginWithGoogle = async () => {
          try{
            await signInWithPopup(auth, provider)
            const user = auth.currentUser
            if(user) {
              const userDocRef = doc(db, 'users', user.uid)
              const userDocSnapshot = await getDoc(userDocRef)
    
              if(!userDocSnapshot.exists()) {
                await setDoc(userDocRef, {
                  userId: user.uid,
                  email: user.email
                })
              } 
            }
          } catch {
            console.error("Google sign-up error")
          }
        }
    
        async function handleGoogleSignUp() {
          try{
            await signInWithPopup(auth, provider)
            const user = auth.currentUser
            if(user) {
              const userDocRef = doc(db, 'users', user.uid)
              const userDocSnapshot = await getDoc(userDocRef)
    
              if(!userDocSnapshot.exists()) {
                await setDoc(userDocRef, {
                  userId: user.uid,
                  email: user.email
                })
              } 
            }
          } catch {
            console.error("Google sign-up error")
          }
        }

  return (
    <>
      <button 
      onClick={() => dispatch(openLoginModal())}
      className="nav__button">
        Sign In
      </button>

      <Modal
      open={isOpen}
      onClose={() => dispatch(closeLoginModal())}
      className='flex items-center justify-center'
      >
        <div className='w-full h-full sm:w-[400px] sm:h-fit bg-white
        sm: rounded-xl font-inter relative'>

            <XMarkIcon
            onClick={() => dispatch(closeLoginModal())}
            className='w-7 h-7 text-gray-500 hover:text-gray-900 
            absolute top-5 right-5 cursor-pointer'/>
            <div className='pt-20 pb-20 px-4 sm:px-10'>
              <h1 className='text-3xl font-extrabold mb-10 flex justify-center'>Log In</h1>

              <div className='w-full space-y-5 mb-3 text-[15px] text-gray-600'>
                <button className='border-[3px] border-gray-200 rounded-[10px] w-full flex p-2 transition duration-400 hover:-translate-y-0.5'
                onClick={() => handleGoogleSignUp()}>
                <Image className='h-5 solid pr-3 pl-2' src="/hollywood-ai/public/assets/google-logo.png" alt='google-logo'
                width={38}
                height={20}
                /> Login with Google
                </button>
              </div>
              
              <div className='w-full space-y-5 mb-10 text-[15px] text-gray-600'>
                <button className='border-[3px] border-gray-200 rounded-[10px] w-full flex p-2 transition duration-400 hover:-translate-y-0.5'
                onClick={() => handleGuestLogin()}>
                 <UserIcon className='h-5 solid pr-3 pl-2' 
                 />
                  Login as Guest
                </button>
              </div>

              <hr>
              </hr>

              <div className='w-20 text-center flex justify-center mx-auto relative -top-5 text-gray-500' >
                <h4 className='p-2 w-14 text-center bg-white'>
                  or
                </h4>
              </div>

              <div className="w-full space-y-5 mb-10">
                <span className='font-bold text-sm relative top-3 text-gray-500'>Email Address</span>
                <input type="email" 
                className="w-full h-[54px] border border-gray-200 outline-none ps-5 rounded-[10px] transition"
                placeholder='your@email.com'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                />
        
                <span className='font-bold text-sm relative top-3 text-gray-500'>Password</span>
                <input type="password" 
                className="w-full h-[54px] border border-gray-200 outline-none ps-5 rounded-[10px] transition relative"
                placeholder='Your password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                />

                <span className='flex justify-end text-sm text-blue-600 hover:underline cursor-pointer'
                onClick={() => {
                  dispatch(closeLoginModal())
                  dispatch(openForgotModal())
                }}>
                  Forgot Password?
                </span>

                <button className='bg-blue-900 w-full h-[54px] rounded-[40px] text-white font-bold' onClick={() => handleLogIn()}>
                  Log In
                </button>

                <p className='flex justify-center'>
                  Don't have an account yet? 
                  <span className='text-blue-500 underline relative left-1 cursor-pointer'
                  onClick={() => {
                      dispatch(closeLoginModal())
                      dispatch(openSignUpModal())
                    }}
                  >Sign Up</span>
                  
                </p>
              </div>
            </div>
        </div>
      </Modal>
      <SignUpModal />
      <ForgotPasswordModal />
    </>
  )
}
