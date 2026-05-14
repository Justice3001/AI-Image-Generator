import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ImageGenerator from './pages/ImageGenerator'
import History from './pages/History'
import About from './pages/About'

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} />
      <Routes>
        <Route path="/" element={<ImageGenerator />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1 className="text-center mt-5">Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
