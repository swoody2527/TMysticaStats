import React from 'react'
import './reusableCSS/ErrorComponent.css'
import ErrorEngineer from '../../assets/faction-images/ErrorEngineer.png'

function ErrorComponent({errorMsg}) {
  return (
    <div>
        <img className='error-img' src={ErrorEngineer}></img>
        <h1 className='error-header'>Oh no! Something went wrong...</h1>
        <p className='error-text'>{errorMsg}</p>
    </div>
  )
}

export default ErrorComponent