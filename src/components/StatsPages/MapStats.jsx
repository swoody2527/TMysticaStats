import React from 'react'
import BackHeader from '../reusable/BackHeader'
import FactionsFilter from '../reusable/FactionsFilter'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MapStats() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true)

  const [filterData, setFilterData] = useState({
    winRate: null,
    pickRate: null,
    wrVersus: null,
    wrMaps: null,
    avgVP: null,
    avgVPRound: null,
    gamesPlayed: null,
    popOT: null,
    wrByPlayercount: null
  });

  const faction = searchParams.get('faction');
  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');
  const numPlayers = searchParams.get('numPlayers');
  const mapID = searchParams.get('mapID')

  const handleFilterSubmit = (data) => {
    setSearchParams({
      startYear: data.yearRange[0],
      endYear: data.yearRange[1],
      mapID: data.mapID
    });
  };
  
  return (
    <div>
      <BackHeader />
      <FactionsFilter
        onSubmit={handleFilterSubmit}
        initialValues={{ faction, startYear, endYear, numPlayers, mapID }} 
        availableFilters={{ showMaps: true, showYears: true }} />

    </div>
  )
}

export default MapStats