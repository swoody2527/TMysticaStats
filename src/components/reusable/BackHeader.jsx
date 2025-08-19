import React from 'react'
import { Link } from 'react-router-dom'
import './reusableCSS/BackHeader.css'

function BackHeader() {
  return (
    <div className='back-header'>
      <h2>TMysticaStats</h2>
      <div className='header-links'>
      <Link className='header-btn' to={'/'}>Home</Link>
      <Link className='header-btn' to={'/menu'}>Menu</Link>
      </div>
    </div>
  )
}

export default BackHeader