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

  const getSubscriptionDisplay = () => {
    const subscriptionType = user?.subscriptionType || 'basic'
    
    if (subscriptionType === 'premium') {
      return {
        label: 'Premium',
        showUpgradeButton: false
      }
    } else if (subscriptionType === 'vip+') {
      return {
        label: 'VIP+',
        showUpgradeButton: false
      }
    } else {
      return {
        label: 'Basic',
        showUpgradeButton: true
      }
    }
  }

  const subscriptionDisplay = getSubscriptionDisplay()

  return (
    <div className='master-container p-8 pl-48 relative top-8'>
      <h1 className='text-4xl font-bold mb-12 border-b pb-8'>Settings</h1>

      {isSignedIn ? (
        <>
          {/* Subscription Plan Section */}
          <div className='subscription-plan-container mb-12'>
            <h2 className='text-2xl font-semibold mb-3'>Your Subscription Plan</h2>
            <div className='flex flex-col gap-4 border-b pb-4'>
              <p className='text-gray-700 text-lg'>{subscriptionDisplay.label}</p>
              {subscriptionDisplay.showUpgradeButton && (
                <a
                  href='/plans'
                  className='p-3 flex items-center gap-2 justify-center text-[16px] w-[150px] bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors text-sm'
                >
                  Upgrade <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
</svg>

                </a>
              )}
            </div>
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
