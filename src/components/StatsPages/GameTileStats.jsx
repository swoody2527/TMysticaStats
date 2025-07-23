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

  const [filterData, setFilterData] = useState({
    scoreTileFreq: null,
    bonusTilePop: null,
    favorTilesFaction: null,
    townTilesFaction: null,
    vpGainedByScoreTile: null,
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
      faction: data.faction,
      numPlayers: data.numPlayers,
      mapID: data.mapID
    });
  };

  const routes = [
    '/score-tile-freq',
    '/bonus-tile-pop',
    '/favor-tiles-by-faction',
    '/town-tiles-by-faction',
    '/vp-gained-by-score-tile',
  ]

  const scoreTiles = [
    'SCORE1',
    'SCORE2',
    'SCORE3',
    'SCORE4',
    'SCORE5',
    'SCORE6',
    'SCORE7',
    'SCORE8',
    'SCORE9'
  ]

  const bonusTiles = [
    'BON1',
    'BON2',
    'BON3',
    'BON4',
    'BON5',
    'BON6',
    'BON7',
    'BON8',
    'BON9',
    'BON10'

  ]

  const favTiles = [
    'FAV1',
    'FAV2',
    'FAV3',
    'FAV4',
    'FAV5',
    'FAV6',
    'FAV7',
    'FAV8',
    'FAV9',
    'FAV10',
    'FAV11',
    'FAV12'
  ]

  const townTiles = [
    'TW1',
    'TW2',
    'TW3',
    'TW4',
    'TW5',
    'TW6',
    'TW7',
    'TW8'
  ]

  const roundColors = [
    '#4e79a7',
    '#f28e2b',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#af7aa1',
    '#ff9da7',
    '#834b2bff',
    '#0c3b1bff',
    '#d37295',
    '#fabfd2'
  ];




  useEffect(() => {
    setIsLoading(true)
    const shouldFetch = faction && startYear && endYear;
    if (!shouldFetch) return;

    const filterParams = {
      s_year: Number(startYear),
      e_year: Number(endYear),
    };

    if (faction != 'any') {
      filterParams.faction = faction.toLowerCase().replaceAll(' ', '')
    }

    if (numPlayers != 'any') {
      filterParams.num_players = Number(numPlayers)
    }

    if (mapID != 'any') {
      filterParams.map_id = mapID
    }

    const fetchData = async () => {
      try {
        const [
          scoreFreq, bonusPop, favorTiles,
          townTiles, vpGainScoreTile,
        ] = await Promise.all(routes.map(route =>
          axios.get(`https://tmysticastats-api-production.up.railway.app/api/tiles${route}`, {
            params: filterParams
          })
        ));

        const vpGainSorted =  Object.fromEntries(Object.entries(vpGainScoreTile.data).sort(
          ([, a], [, b]) => b - a
        ))

        setFilterData({
          scoreTileFreq: scoreFreq.data,
          bonusTilePop: bonusPop.data,
          favorTilesFaction: favorTiles.data,
          townTilesFaction: townTiles.data,
          vpGainedByScoreTile: vpGainSorted,
        });
        setIsLoading(false)
      } catch (err) {
        console.error('API fetch error:', err);
        setIsLoading(false)
      }
    };

    fetchData();
  }, [faction, startYear, endYear, numPlayers, mapID]);

  return (
    <div>
      <BackHeader />
      <FactionsFilter
        onSubmit={handleFilterSubmit}
        initialValues={{ faction, startYear, endYear, numPlayers, mapID }
        }
        availableFilters={{ showFaction: true, showYears: true, showNumPlayers: true, showMaps: true }}
        optionalFilters={{ optFaction: true, optMap: true }}
      />
      {isLoading ? <p>Loading!</p> :
        <div className='general-stats-container'>


          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.scoreTileFreq),
                datasets: scoreTiles.map((tile, index) => ({
                  label: tile,
                  data: Object.keys(filterData.scoreTileFreq).map(round => filterData.scoreTileFreq[round][tile]),
                  backgroundColor: roundColors[index]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                    min: 0,
                    max: 100,
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Percentage of games by player count.',
                  },
                },
              }}
            />
          </div>

          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.bonusTilePop),
                datasets: bonusTiles.map((tile, index) => ({
                  label: tile,
                  data: Object.keys(filterData.bonusTilePop).map(round => filterData.bonusTilePop[round][tile]),
                  backgroundColor: roundColors[index]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                    min: 0,
                    max: 100,
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Percentage of games by player count.',
                  },
                },
              }}
            />
          </div>




          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.favorTilesFaction),
                datasets: favTiles.map((tile, index) => ({
                  label: tile,
                  data: Object.keys(filterData.favorTilesFaction).map(round =>
                    filterData.favorTilesFaction[round] && filterData.favorTilesFaction[round][tile] != null
                      ? filterData.favorTilesFaction[round][tile]
                      : 0
                  ),
                  backgroundColor: roundColors[index]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                    min: 0,
                    max: 100
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Percentage of favor tiles taken by faction.',
                  },
                },
              }}
            />
          </div>

          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.townTilesFaction),
                datasets: townTiles.map((tile, index) => ({
                  label: tile,
                  data: Object.keys(filterData.townTilesFaction).map(round =>
                    filterData.townTilesFaction[round] && filterData.townTilesFaction[round][tile] != null
                      ? filterData.townTilesFaction[round][tile]
                      : 0
                  ),
                  backgroundColor: roundColors[index]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    ticks: {
                      stepSize: 10
                    }
        
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Percentage of town tiles taken by faction.',
                  },
                },
              }}
            />
          </div>


          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.vpGainedByScoreTile),
                datasets: [
                  {
                    label: 'Vp Change',
                    data: Object.values(filterData.vpGainedByScoreTile),
                    backgroundColor: roundColors
                  }
                ]
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                    min: Math.round(Math.min(...Object.values(filterData.vpGainedByScoreTile))),
                    max: Math.round(Math.max(...Object.values(filterData.vpGainedByScoreTile))),
                    ticks: {
                      stepSize: 2
                    }
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'VP Gain/Loss on specific scoring tile.',
                  },
                },
              }}
            />
          </div>



        </div>




      }
    </div>
  )
}

export default GameTileStats