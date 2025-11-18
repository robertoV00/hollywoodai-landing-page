import { auth } from '@/firebase'
import { closeForgotModal, closeLoginModal } from '@/redux/slices/modalSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import { Modal } from '@mui/material'
import { sendPasswordResetEmail } from 'firebase/auth'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ForgotPassword() {

    const dispatch: AppDispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.modals.forgotPasswordModalOpen)

    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    async function handleSendInstructions() {
        if (!email) {
            setErrorMsg('Please enter your email.')
            setStatus('error')
            return
        }

        try {
            setStatus('loading')
            setErrorMsg('')
            await sendPasswordResetEmail(auth, email)
            setStatus('success')
            // auto-close after a short delay so user can see success message
            setTimeout(() => {
                dispatch(closeForgotModal())
                setStatus('idle')
                setEmail('')
            }, 1400)
        } catch (err) {
            setStatus('error')
            setErrorMsg((err as Error).message || 'Failed to send reset email.')
        }
    }

  return (
    <>
        <Modal
      open={isOpen}
      onClose={() => dispatch(closeForgotModal())}
      className='flex items-center justify-center'
      >
        <div className='w-full h-full sm:w-[400px] sm:h-fit bg-white
        sm: rounded-xl font-inter relative'>

            <XMarkIcon
            onClick={() => dispatch(closeForgotModal())}
            className='w-7 h-7 text-gray-500 hover:text-gray-900 
            absolute top-5 right-5 cursor-pointer'/>

            <div className='pt-20 pb-20 px-4 sm:px-10'>
                <h1 className='text-3xl font-extrabold mb-10 flex justify-center'>Forgot Password</h1>
                <div className='w-full space-y-5 mb-2 text-[15px] text-gray-600'>

                    <span className='font-bold text-sm relative top-3 text-gray-500'>Email Address</span>
                    <input
                        type="email"
                        className="w-full h-[54px] border border-gray-200 outline-none px-5 rounded-[10px] transition"
                        placeholder='your@email.com'
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                      />

                      {status === 'success' && (
                        <p className='text-green-600 text-sm'>Reset instructions sent. Check your email.</p>
                      )}
                      {status === 'error' && errorMsg && (
                        <p className='text-red-600 text-sm'>{errorMsg}</p>
                      )}

                      <button
                        type="button"
                        onClick={handleSendInstructions}
                        disabled={status === 'loading'}
                        className={`w-full h-[54px] rounded-[40px] text-white font-bold ${status === 'loading' ? 'bg-gray-400' : 'bg-blue-900 hover:bg-blue-800'}`}
                      >
                        {status === 'loading' ? 'Sending...' : 'Send Instructions'}
                      </button>
                </div>
            </div>


        </div>
      </Modal>
    </>
  )
}
