"use client"

import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeLoginModal, openLoginModal } from '@/redux/slices/modalSlice'

export default function LoginModal() {

    // const [isOpen, setIsOpen] = useState(true)

    // const handleClose = () => {
    //     setIsOpen(false)
    // }

    // const handleOpen = () => {
    //     setIsOpen(true)
    // }

    const isOpen = useSelector((state: RootState) => state.modals.loginModalOpen)

    //to use the reducers created in the modalSlice file, we need to use the dispatch hook
    const dispatch: AppDispatch = useDispatch()

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
        <div className='w-[200px] h-[400px] bg-white'>
            Modal
        </div>
      </Modal>
    </>
  )
}
