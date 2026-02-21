"use client"

import React, { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useDebounce } from 'use-debounce'
import { useRouter } from 'next/navigation'

interface Movie {
  id: string
  title: string
  director: string
  posterUrl: string
}

export default function SearchBox() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 300)
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults([])
      setShowResults(false)
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://advanced-internship-api-production.up.railway.app/movies?search=${encodeURIComponent(debouncedSearch)}`
        )
        const data = await response.json()
        console.log('API Response:', data)
        
        // Handle different possible response structures
        let movies = []
        if (Array.isArray(data)) {
          movies = data
        } else if (data.data && Array.isArray(data.data)) {
          movies = data.data
        } else if (data.movies && Array.isArray(data.movies)) {
          movies = data.movies
        }
        
        setResults(movies)
        setShowResults(true)
      } catch (error) {
        console.error('Error fetching search results:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedSearch])

  const handleResultClick = (movie: Movie) => {
    // Navigate to movie summary page
    router.push(`/summary/${movie.id}`)
    setShowResults(false)
    setSearch('')
  }

  return (
    <div className='h-[80px] search-box-container border-b w-[100%] 2xl:pl-48 2xl:pr-48 md:pl-10 md:pr-10 sm:pl-10 relative '>
      <div className='relative lg:w-[500px] md:w-[400px] w-[350px] top-5 transition-all duration-300'>
        <input
          placeholder='Search for movies...'
          className='bg-gray-200 w-full h-[40px] border-none outline-none rounded-full p-5 pl-12 text-sm'
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => search && setShowResults(true)}
        />
        <MagnifyingGlassIcon height={20} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600' />

        {/* Search Results Dropdown */}
        {showResults && (
          <div className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-[300px] overflow-y-auto shadow-lg z-50'>
            {isLoading ? (
              <div className='p-4 text-center text-gray-500'>Searching...</div>
            ) : results.length > 0 ? (
              results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleResultClick(movie)}
                  className='p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer'
                >
                  <div className='font-semibold text-sm'>{movie.title}</div>
                  <div className='text-xs text-gray-600'>Director: {movie.director}</div>
                </div>
              ))
            ) : (
              <div className='p-4 text-center text-gray-500'>No movies found</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
