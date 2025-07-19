import React, { useState } from 'react'
import { useSearchParams } from "react-router";
import BackHeader from '../reusable/BackHeader'
import FactionsFilter from '../reusable/FactionsFilter'
import '../../styles/StatsPages/FactionStats.css'

function FactionStats() {
  const [filterData, setFilterData] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleFilterSubmit = (data) => {
    setSearchParams({
      startYear: data.yearRange[0],
      endYear: data.yearRange[1],
      faction: data.faction,
      numPlayers: data.numPlayers,
    })
  }

  const faction = searchParams.get('faction');
  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');
  const numPlayers = searchParams.get('numPlayers');


  return (
    <div>
      <BackHeader />
      <FactionsFilter onSubmit={handleFilterSubmit} />
      <p>{faction}</p>
      <p>{startYear}</p>
      <p>{endYear}</p>
      <p>{numPlayers}</p>

    </div>

  )
}

export default FactionStats