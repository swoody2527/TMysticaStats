import React from 'react'
import { Link } from 'react-router-dom'

function PredictPage() {
  return (
    <div className='back-header'>
        <p>Hello</p>
        <Link to={'/'}><button>go back</button></Link>
    </div>
  )
}

export default PredictPage