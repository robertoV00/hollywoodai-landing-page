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
      
      <div className='flex min-h-screen'>
    <Sidebar />
    <div className='flex-1 min-w-0'>
        <Dashboard />
    </div>
</div>
    </>
  )
}
