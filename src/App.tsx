import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HikingGalleryPage from './pages/HikingGalleryPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hiking" element={<HikingGalleryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
