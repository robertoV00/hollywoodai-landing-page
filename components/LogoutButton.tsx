'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { AppDispatch } from '@/redux/store'
import { signOutUser } from '@/redux/slices/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

interface LogoutButtonProps {
  text: string
}

export default function LogoutButton({ text }: LogoutButtonProps) {
  const dispatch: AppDispatch = useDispatch()

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth)
      
      // Dispatch sign out action to clear Redux state
      dispatch(signOutUser())
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <button onClick={handleLogout} className="w-full text-left">
      <li className='flex items-center space-x-3 p-2.5'>
        <UserCircleIcon className='h-[20px]' />
        <span className='text-[14px] text-nowrap'>
          {text}
        </span>
      </li>
    </button>
  )
}
