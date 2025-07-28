import React from 'react'
import { Link } from 'react-router-dom'
import './reusableCSS/BackHeader.css'

function BackHeader() {
  return (
    <div className='back-header'>
      <h2>TMysticaStats</h2>
      <div className='header-links'>
      <Link to={'/'}><button>Home</button></Link>
      <Link to={'/menu'}><button>Menu</button></Link>
      </div>
    </div>
  )
}

export default BackHeader