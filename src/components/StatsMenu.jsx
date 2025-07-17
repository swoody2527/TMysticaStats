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
            <Link to={'/general-stats'}><button className='stats-nav-button'>General Stats</button></Link>
            <Link to={'/faction-stats'}><button className='stats-nav-button'>Faction Stats</button></Link>
            <Link to={'/map-stats'}><button className='stats-nav-button'>Map Stats</button></Link>
            <Link to={'/tile-stats'}><button className='stats-nav-button'>Tile Stats</button></Link>
            <Link to={'/trend-stats'}><button className='stats-nav-button'>Trends</button></Link>
           
        </div>
    </div>
  )
}

export default StatsMenu