'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { AppDispatch, RootState } from '@/redux/store'
import { signOutUser } from '@/redux/slices/userSlice'
import { openLoginModal } from '@/redux/slices/modalSlice'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

interface LogoutButtonProps {
  text: string
}

export default function LogoutButton({ text }: LogoutButtonProps) {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const isLoggedIn = !!user?.uid

  const handleClick = async () => {
    if (isLoggedIn) {
      // User is logged in - log them out
      try {
        // Sign out from Firebase
        await signOut(auth)
        
        // Dispatch sign out action to clear Redux state
        dispatch(signOutUser())
      } catch (error) {
        console.error('Error logging out:', error)
      }
    } else {
      // User is logged out - open login modal
      dispatch(openLoginModal())
    }
  }

  const buttonText = isLoggedIn ? 'Log Out' : 'Log In'

  return (
    <li>
      <button onClick={handleClick} className="w-full text-left flex items-center space-x-3 p-2.5 rounded-lg transition-colors hover:bg-purple-100 hover:text-purple-800">
        <UserCircleIcon className='h-[20px]' />
        <span className='text-[14px] text-nowrap '>
          {buttonText}
        </span>
      </button>
    </li>
  )
}
