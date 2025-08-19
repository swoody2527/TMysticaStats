import React from 'react'
import '../styles/StatsMenu.css'
import { Link } from 'react-router-dom'
import BackHeader from './reusable/BackHeader'

function StatsMenu() {

    let navOptions = ['General TM Stats', 'Faction Stats', 'Map Stats', 'Game Tile Stats', 'Trends Over Time']
  
    return (
        
    <div className='stats-page'>
        <BackHeader />
        <div className='stats-nav-options'>
            <Link to={'/general-stats'} className='stats-nav-button'>General Stats</Link>
            <Link to={'/faction-stats'} className='stats-nav-button'>Faction Stats</Link>
            <Link to={'/map-stats'} className='stats-nav-button'>Map Stats</Link>
            <Link to={'/game-tile-stats'} className='stats-nav-button'>Tile Stats</Link>
            <Link to={'/trend-stats'} className='stats-nav-button'>Trends Over Time</Link>
            <Link to={'/legend-page'} className='stats-nav-button'>Legend</Link>
           
        </div>
    </div>
  )
}

export default StatsMenu