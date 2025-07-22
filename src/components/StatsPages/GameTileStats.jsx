import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BackHeader from '../reusable/BackHeader';
import FactionsFilter from '../reusable/FactionsFilter';
import '../../styles/StatsPages/FactionStats.css';
import '../../styles/StatsPages/GeneralStats.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  LineElement,
} from 'chart.js';

import { Bar, Doughnut, PolarArea, Line } from 'react-chartjs-2';
import factionColors from '../../assets/factionColours';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

function GameTileStats() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true)



  const faction = searchParams.get('faction');
  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');
  const numPlayers = searchParams.get('numPlayers');
  const mapID = searchParams.get('mapID')
  const handleFilterSubmit = (data) => {
    setSearchParams({
      startYear: data.yearRange[0],
      endYear: data.yearRange[1],
      faction: data.faction,
      numPlayers: data.numPlayers,
      mapID: data.mapID
    });
  };


  return (
    <div>
      <BackHeader/>
      <FactionsFilter
        onSubmit={handleFilterSubmit}
        initialValues={{ faction, startYear, endYear, numPlayers }
        }
        availableFilters={{showFaction: true, showYears: true, showNumPlayers: true, showMaps: true }}
        optionalFilters={{optFaction: true, optMap: true}}
      />
    </div>
  )
}

export default GameTileStats