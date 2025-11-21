import React from 'react'
import Dashboard from '@/components/Dashboard'
import SelectedMovies from '@/components/SelectedMovies'
import TopMovies from '@/components/TopMovies'
import Sidebar from '@/components/Sidebar'

export default function page() {
  return (
    <>
        <Sidebar />
        <Dashboard />
        <SelectedMovies />
        <TopMovies />
    </>
  )
}
