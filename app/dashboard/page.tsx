'use client'

export const dynamic = 'force-dynamic'

import React from 'react'
import Dashboard from '@/components/Dashboard'
import SelectedMovies from '@/components/SelectedMovies'
import TopMovies from '@/components/TopMovies'
import Sidebar from '@/components/Sidebar'
import SearchBox from '@/components/SearchBox'
import LoginModal from '@/components/modals/LoginModal'

export default function page() {
  return (
    <>
      
      <div className='flex mx-auto min-h-screen'>
          <Sidebar />
          <Dashboard />
      </div>
    </>
  )
}
