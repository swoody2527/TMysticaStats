import React from 'react'
import { Link } from 'react-router-dom'
import './reusableCSS/BackHeader.css'

function BackHeader() {
  return (
    <div className='back-header'>
      <h2>TMysticaStats</h2>
      <Link to={'/game-statistics'}><button>Menu</button></Link>
    </div>
  )
}

export default BackHeader