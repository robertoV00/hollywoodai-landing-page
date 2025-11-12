"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'


interface StoreProviderProps {
    children: React.ReactNode
}

//this is how we give the app access to the redux store while keeping
//the layout component server side rendering
export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
}
