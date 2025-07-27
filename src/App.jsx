import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import LandingPage from './components/LandingPage.jsx'
import PredictPage from './components/PredictPage.jsx'
import StatsMenu from './components/StatsMenu.jsx'
import FactionStats from './components/StatsPages/FactionStats.jsx'
import GameTileStats from './components/StatsPages/GameTileStats.jsx'
import GeneralStats from './components/StatsPages/GeneralStats.jsx'
import MapStats from './components/StatsPages/MapStats.jsx'
import TrendsOT from './components/StatsPages/TrendsOT.jsx'
import LegendPage from './components/LegendPage..jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/menu' element={<StatsMenu/>}></Route>
        <Route path='/faction-predict' element={<PredictPage/>}></Route>
        <Route path='/general-stats' element={<GeneralStats/>}></Route>
        <Route path='/faction-stats' element={<FactionStats/>}></Route>
        <Route path='/map-stats' element={<MapStats/>}></Route>
        <Route path='/game-tile-stats' element={<GameTileStats/>}></Route>
        <Route path='/trend-stats' element={<TrendsOT/>}></Route>
        <Route path='/legend-page' element={<LegendPage/>}></Route>
      </Routes>
      
    </main>
  )
}

export default App
