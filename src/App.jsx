import { useState } from 'react'
import Header from './components/Header'
import Hero from './pages/home/container/Hero'
import HomePage from './pages/home/HomePage'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop'
function App() {

  return (
    <>
      <Outlet />
      <Toaster />
      <ScrollToTop />
    </>
  )
}

export default App
