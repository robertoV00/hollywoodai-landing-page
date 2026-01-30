"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { signInUser } from '@/redux/slices/userSlice'


export default function LoginModal() {
    const router = useRouter()
    
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const isOpen = useSelector((state: RootState) => state.modals.loginModalOpen)
    const user = useSelector((state: RootState) => state.user)

    const dispatch: AppDispatch = useDispatch()

    async function handleLogIn() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        // Dispatch sign in action with user data
        dispatch(signInUser({
          name: user.displayName || email.split('@')[0],
          username: user.displayName || email.split('@')[0],
          email: user.email,
          uid: user.uid,
          isSubscribed: true
        }))
        
        setErrorMsg('')
        setEmail('')
        setPassword('')
        dispatch(closeLoginModal())
        router.push('/dashboard')
      } catch (err: any) {
        const code = err?.code || 'auth/unknown'
        setErrorMsg(`Firebase: Error (${code})`)
      }
    }

    async function handleGuestLogin() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "12345678")
        const user = userCredential.user
        
        // Dispatch sign in action with user data
        dispatch(signInUser({
          name: user.displayName || 'Guest',
          username: user.displayName || 'Guest',
          email: user.email,
          uid: user.uid,
          isSubscribed: true
        }))
        
        dispatch(closeLoginModal())
        router.push('/dashboard')
      } catch (err: any) {
        const code = err?.code || 'auth/unknown'
        setErrorMsg(`Firebase: Error (${code})`)
      }
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
          
          // Dispatch sign in action with user data
          dispatch(signInUser({
            name: user.displayName || user.email?.split('@')[0] || 'User',
            username: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            uid: user.uid,
            isSubscribed: true
          }))
        }
        setErrorMsg('')
        dispatch(closeLoginModal())
        router.push('/dashboard')
      } catch (err: any) {
        console.error("Google sign-up error")
        const code = err?.code || 'auth/unknown'
        setErrorMsg(`Firebase: Error (${code})`)
      }
    }

    async function handleGoogleSignUp() {
      try{
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        
        if(user) {
          const userDocRef = doc(db, 'users', user.uid)
          const userDocSnapshot = await getDoc(userDocRef)

          if(!userDocSnapshot.exists()) {
            await setDoc(userDocRef, {
              userId: user.uid,
              email: user.email
            })
          }
          
          // Dispatch sign in action with user data
          dispatch(signInUser({
            name: user.displayName || user.email?.split('@')[0] || 'User',
            username: user.displayName || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            uid: user.uid,
            isSubscribed: true
          }))

          // Clear form
          setErrorMsg('')
          setEmail('')
          setPassword('')
          // The useEffect will handle closing the modal and navigating
        }
      } catch (err: any) {
        console.error('Google sign-up error:', err)
        const code = err?.code || 'auth/unknown'
        setErrorMsg(`Firebase: Error (${code})`)
      }
    }

    useEffect(() => {
      if (!isOpen) {
        setErrorMsg('')
        setEmail('')
        setPassword('')
      }
    }, [isOpen])

    // Close modal and navigate when user is authenticated
    useEffect(() => {
      if (user?.uid && isOpen) {
        dispatch(closeLoginModal())
        router.push('/dashboard')
      }
    }, [user?.uid, isOpen, dispatch, router])
    
    useEffect(() => {
      if (errorMsg) return
    }, [email, password])

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
        <div className='w-full h-full sm:w-[500px] sm:h-[750px] bg-white
        sm: rounded-xl font-inter relative'>
            {errorMsg && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-md text-sm z-50">
              {errorMsg}
            </div>
            )}

            <XMarkIcon
            onClick={() => dispatch(closeLoginModal())}
            className='w-7 h-7 text-gray-500 hover:text-gray-900 
            absolute top-5 right-5 cursor-pointer'/>
            <div className='pt-20 pb-20 px-4 sm:px-10'>
              <h1 className='text-3xl font-extrabold mb-10 flex justify-center'>Log In</h1>

              <div className='w-full space-y-5 mb-3 text-[15px] text-gray-600'>
                <button className='border-[3px] border-gray-200 rounded-[10px] w-full flex p-2 transition duration-400 hover:-translate-y-0.5'
                onClick={() => handleGoogleSignUp()}>
                <Image className='h-4 solid pr-3 pl-2 top-1 relative' src="/assets/google-icon.png" alt='google-logo'
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

              <hr></hr>

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

                <button className='bg-purple-800 w-full h-[54px] rounded-[40px] text-white font-bold' onClick={() => handleLogIn()}>
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