"use client"

import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from './store'
import { restoreUser } from './slices/userSlice'
import { restoreFavorites } from './slices/favoritesSlice'


interface StoreProviderProps {
    children: React.ReactNode
}

function StoreInitializer({ children }: StoreProviderProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    // Restore user from localStorage on app load
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch(restoreUser(user))
      } catch (error) {
        console.error('Error restoring user:', error)
      }
    }

    // Restore favorites from localStorage on app load
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites)
        dispatch(restoreFavorites(favorites))
      } catch (error) {
        console.error('Error restoring favorites:', error)
      }
    }
  }, [dispatch])

  return <>{children}</>
}

//this is how we give the app access to the redux store while keeping
//the layout component server side rendering
export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  )
}
