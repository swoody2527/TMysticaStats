import React from 'react'
import '../styles/LandingPage.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (

    <div className='landing-page'>
        <h1 className='landing-title'>TMysticaStats</h1>
        <div className='page-choices'>
            <Link to={'/faction-predict'}><button>Faction Choice Helper</button></Link>
            <Link to={'/game-statistics'}><button>Game Statistics</button></Link>
        </div>
    </div>
  )
}

export default LandingPage