import React from 'react'
import { Link } from 'react-router-dom'
import './reusableCSS/BackHeader.css'

function BackHeader() {
  return (
    <div className='back-header'>
            <Link to={'/'}><button>go back</button></Link>
    </div>
  )
}

export default BackHeader