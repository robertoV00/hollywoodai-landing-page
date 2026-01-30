import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { openLoginModal } from '@/redux/slices/modalSlice'
import Image from 'next/image'

export default function Settings() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  // Check if user is signed in
  const isSignedIn = user?.uid

  return (
    <div className='master-container p-8 pl-48 relative top-8'>
      <h1 className='text-4xl font-bold mb-12 border-b pb-8'>Settings</h1>

      {isSignedIn ? (
        <>
          {/* Subscription Plan Section */}
          <div className='subscription-plan-container mb-12'>
            <h2 className='text-2xl font-semibold mb-3'>Your Subscription Plan</h2>
            <p className='text-gray-700 text-lg border-b pb-4'>{user?.isSubscribed ? 'Premium' : 'Free'}</p>
          </div>

          {/* Email Section */}
          <div className='email-info-container mb-12'>
            <h2 className='text-2xl font-semibold mb-3'>Email</h2>
            <p className='text-gray-700 text-lg border-b pb-4'>{user?.email || 'Not logged in'}</p>
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-[500px]'>
          <Image
            src='/assets/sign-in-svg.png'
            alt='Sign in'
            width={600}
            height={500}
            className='mb-8'
          />
          <h2 className='text-[28px] font-bold mb-8'>Sign in to see your account settings</h2>
          <button
            onClick={() => dispatch(openLoginModal())}
            className='settings-login-button px-8 py-3 bg-purple-800 w-[200px] text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors' 
          >
            Login
          </button>
        </div>
      )}
    </div>
  )
}
