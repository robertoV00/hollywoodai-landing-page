import React from 'react'
import Dashboard from '@/components/Dashboard'
import SelectedMovies from '@/components/SelectedMovies'
import TopMovies from '@/components/TopMovies'

export default function page() {
  return (
    <>
        <Dashboard />
        <SelectedMovies />
        <TopMovies />
    </>
  )
}
