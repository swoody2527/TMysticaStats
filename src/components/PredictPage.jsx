import React from 'react'
import { Link } from 'react-router-dom'
import BackHeader from './reusable/BackHeader'
import PredictFilter from './reusable/PredictFilter'

function PredictPage() {
  return (
    <div>
        <BackHeader />
        <PredictFilter/>
    </div>
  )
}

export default PredictPage