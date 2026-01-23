'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '@/redux/store'
import { signOutUser } from '@/redux/slices/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

export default function LogoutPage() {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        // Sign out from Firebase
        await signOut(auth)
        
        // Dispatch sign out action to clear Redux state
        dispatch(signOutUser())
        
        // Go back to previous page
        router.back()
      } catch (error) {
        console.error('Error logging out:', error)
        router.back()
      }
    }

    logout()
  }, [dispatch, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Logging out...</p>
    </div>
  )
}
