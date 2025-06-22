import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import LandingPage from './components/LandingPage.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
      </Routes>
      
    </main>
  )
}

export default App
