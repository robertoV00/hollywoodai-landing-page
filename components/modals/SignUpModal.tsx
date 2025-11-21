"use client"

import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeLoginModal, closeSignUpModal, openForgotModal, openLoginModal, openSignUpModal } from '@/redux/slices/modalSlice'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { signInUser } from '@/redux/slices/userSlice'
import Image from 'next/image'
import { UserIcon } from '@heroicons/react/24/solid'
import {GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import LoginModal from './LoginModal'
import ForgotPasswordModal from './ForgotPasswordModal'

export default function SignUpModal() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('') // <-- new
    const isOpen = useSelector((state: RootState) => state.modals.signUpmodalOpen)

    //to use the reducers created in the modalSlice file, we need to use the dispatch hook
    const dispatch: AppDispatch = useDispatch()

    async function handleSignUp() {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        setEmail('')
        setPassword('')
        setErrorMsg('')
        dispatch(closeSignUpModal())
      } catch (err: any) {
        const code = err?.code || 'auth/unknown'
        // show Firebase style message as requested
        setErrorMsg(`Firebase: Error (${code})`)
      }
    }

    async function handleGuestLogin() {
          await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "12345678")
          dispatch(closeLoginModal())
    }

    useEffect(() => {
      //this is a listener that fires everytime the auth state changes
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) return
        
        //Handle Redux Action
        dispatch(signInUser({
          name: "",
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid
        }))
      })

      return unsubscribe
    }, [])

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


    // clear error and inputs whenever modal closes/opens
    useEffect(() => {
      if (!isOpen) {
        setErrorMsg('')
        setEmail('')
        setPassword('')
      }
    }, [isOpen])

  return (
    <>
      {/* <button 
      onClick={() => dispatch(openSignUpModal())}
      className="nav__button">
        Sign In
      </button> */}

      <Modal
      open={isOpen}
      onClose={() => dispatch(closeSignUpModal())}
      className='flex items-center justify-center'
      >
        <div className='w-full h-full sm:w-[400px] sm:h-fit bg-white
        sm: rounded-xl font-inter relative'>

            {/* error bar */}
            {errorMsg && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-md text-sm z-50">
                {errorMsg}
              </div>
            )}

            <XMarkIcon
            onClick={() => dispatch(closeSignUpModal())}
            className='w-7 h-7 text-gray-500 hover:text-gray-900 
            absolute top-5 right-5 cursor-pointer'/>
            <div className='pt-20 pb-20 px-4 sm:px-10'>
              <h1 className='text-3xl font-bold mb-10 flex justify-center'>Sign Up</h1>

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
                 <UserIcon className='h-5 solid pr-3 pl-2'/>
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
                <input type="email" 
                className="w-full h-[54px] border border-gray-200 outline-none ps-5 rounded-[10px] transition"
                placeholder='your@email.com'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                />

                <input type="password" 
                className="w-full h-[54px] border border-gray-200 outline-none ps-5 rounded-[10px] transition"
                placeholder='Your password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                />

                <span className='flex justify-end text-sm text-blue-600 hover:underline cursor-pointer'
                  onClick={() => {
                    dispatch(closeSignUpModal())
                    dispatch(openForgotModal())
                  }}>
                  Forgot Password?
                </span>

                <button className='bg-blue-900 w-full h-[54px] rounded-[40px] text-white font-semibold' onClick={() => handleSignUp()}>
                  Sign Up
                </button>

                <p className='flex justify-center'>
                  Already have an account?
                  <span className='text-[16px] text-blue-600 underline cursor-pointer'
                  onClick={() => {
                    dispatch(closeSignUpModal())
                    dispatch(openLoginModal())
                    }
                  }
                  >Log in</span>
                </p>
              </div>
            </div>
        </div>
      </Modal>
      <ForgotPasswordModal />
    </>
  )
}
