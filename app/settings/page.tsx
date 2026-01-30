'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar'
import Settings from '@/components/Settings'
import SearchBox from '@/components/SearchBox'

export default function SettingsPage() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        <SearchBox />
        <Settings />
      </div>
    </div>
  )
}
