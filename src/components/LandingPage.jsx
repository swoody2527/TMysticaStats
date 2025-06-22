import React from 'react'
import '../styles/LandingPage.css'

function LandingPage() {
  return (

    <div className='landing-page'>
        <h1 className='landing-title'>TMysticaStats</h1>
        <div className='page-choices'>
            <button>Faction Choice Helper</button>
            <button>Game Statistics</button>
        </div>
    </div>
  )
}

export default LandingPage