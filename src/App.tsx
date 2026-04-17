import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HikingGalleryPage from './pages/HikingGalleryPage'

function ScrollToTopOnRouteChange() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hiking" element={<HikingGalleryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
