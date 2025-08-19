import React, { useState, useEffect, use } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BackHeader from '../reusable/BackHeader';
import FactionsFilter from '../reusable/FactionsFilter';
import ErrorComponent from '../reusable/ErrorComponent';
import NoSearch from '../reusable/NoSearch';
import '../../styles/StatsPages/GeneralStats.css';
import factionImages from '../../assets/faction-images/factionImages';

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
import { factionInformation, mapInformation } from '../../assets/infoDicts';

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

function FactionStats() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

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

  const handleFilterSubmit = (data) => {
    setHasSearched(true)
    setSearchParams({
      startYear: data.yearRange[0],
      endYear: data.yearRange[1],
      faction: data.faction,
      numPlayers: data.numPlayers,
      mapID: data.mapID
    });
  };

  const routes = [
    '/faction-wr',
    '/faction-pickrate',
    '/faction-wr-versus',
    '/faction-wr-maps',
    '/faction-avg-vp',
    '/faction-avg-vp-per-round',
    '/faction-games-played',
    '/faction-popularity-ot',
    '/wr-by-playercount'
  ];


  const playerCountColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#1A535C",
    "#FFE66D",
  ];



  useEffect(() => {
    setError(null)
    setIsLoading(true)
    const shouldFetch = faction && startYear && endYear;
    if (!shouldFetch) return;

    const filterParams = {
      s_year: Number(startYear),
      e_year: Number(endYear),
      faction: faction.toLowerCase().replaceAll(' ', ''),
      num_players: numPlayers === 'any' || !numPlayers ? undefined : Number(numPlayers)
    };

    const fetchData = async () => {
      setHasSearched(true)
      try {
        console.log(filterParams)
        const [
          wr, pr, wrVS,
          wrMaps, avgVP, avgVPRound,
          gameCount, popOT, wrPC
        ] = await Promise.all(routes.map(route =>
          axios.get(`https://tmysticastats-api-production.up.railway.app/api/factions${route}`, {
            params: filterParams
          })
        ));

        let wrVSSorted = Object.fromEntries(Object.entries(wrVS.data).sort(
          ([, a], [, b]) => b.win_rate - a.win_rate
        ))

        let wrMapsSorted = Object.fromEntries(Object.entries(wrMaps.data).sort(
          ([, a], [, b]) => b.win_rate - a.win_rate
        ))

        setFilterData({
          winRate: wr.data,
          pickRate: pr.data,
          wrVersus: wrVSSorted,
          wrMaps: wrMapsSorted,
          avgVP: avgVP.data,
          avgVPRound: avgVPRound.data,
          gamesPlayed: gameCount.data,
          popOT: popOT.data,
          wrByPlayercount: wrPC.data
        });
        setError(null)
        setIsLoading(false)
      } catch (err) {
        console.error('API fetch error:', err);
        setError(err.response.data.error)
        setIsLoading(false)
      }
    };

    fetchData();
  }, [faction, startYear, endYear, numPlayers]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <BackHeader />
      <FactionsFilter
        onSubmit={handleFilterSubmit}
        initialValues={{ faction, startYear, endYear, numPlayers }
        }
        availableFilters={{ showFaction: true, showYears: true, showNumPlayers: true }}
      />
      {error ? <ErrorComponent errorMsg={error} /> : !hasSearched ?
        <NoSearch/> : isLoading ?
          <div>
            <span className='loader'></span>
            <p style={{fontSize: '2em', color: 'white', fontWeight: 'bold', WebkitTextStroke: '1px black'}}>Compiling Statistics...</p>
          </div>
          :
          <div className='general-stats-container'>
            <div className='header-container'>
          <h3 className='page-header'>{factionInformation[faction].name} Statistics</h3>
        </div>
            <div className='filter-info'>
              <div className='filter-widget'>
                <p className='filter-info-label'>Faction</p>
                <img src={factionImages[factionInformation[faction].name.split(' ').join('')]} />
              </div>
              <div className='filter-widget'>
                <p className='filter-info-label'>Year Range</p>
                <p className='filter-info-text'>From: {startYear}</p>
                <p className='filter-info-text'>To: {endYear}</p>
              </div>
              <div className='filter-widget'>
                <p className='filter-info-label'>No. Players</p>
                <p className='filter-info-text'>{numPlayers == 'any' ? 'Any' : numPlayers}</p>
              </div>
            </div>
            <div className='static-stats'>
              <div className='chart-box chart-3'>
                <h3>Total Games Played</h3>
                <p className='data-main'>{filterData.gamesPlayed.games_played}</p>


              </div>
              <div className='chart-box chart-2'>
                <h3>Winrate</h3>
                <p className='data-main'>{filterData.winRate.winrate}%</p>
                <p className='data-extra'>Total Games: {filterData.winRate.total_games}</p>
                <p className='data-extra'>Total Wins: {filterData.winRate.total_wins}</p>
              </div>
              <div className='chart-box chart-2'>
                <h3>Pickrate</h3>
                <p className='data-main'>{filterData.pickRate.pickrate}%</p>
                <p className='data-extra'>Total Games: {filterData.pickRate.total_games}</p>
                <p className='data-extra'>Total Picks: {filterData.pickRate.picked_games}</p>

              </div>

            </div>
            <div className='chart-box chart-1'>
              <Bar
                data={{
                  // Keys of the object represent all the labels, map these to faction formatted names.
                  labels: Object.keys(filterData.wrVersus).map(f => factionInformation[f].name),
                  datasets: [
                    {
                      label: 'Win Percentage %',
                      // Map over all values in the data dictionary
                      data: Object.values(filterData.wrVersus).map(f => f.win_rate),
                      // Assign appropriate faction colour to each label bar.
                      backgroundColor: Object.keys(filterData.wrVersus).map(f => factionInformation[f].color)
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  responsive: true,
                  scales: {
                    x: {
                      min: 5,
                      max: Math.round(
                        (Math.max(...Object.values(filterData.wrVersus).map(f => f.win_rate)) + 5) / 5
                      ) * 5,
                      ticks: {
                        stepSize: 5
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                      color: "#000000ff",
                      font: {
                        size: isDesktop ? 20 : 10,
                        weight: 'bold',
                      }
                    }
                    },
                    title: {
                      color: "#000000ff",
                      display: true,
                      text: 'Winrate versus other factions.',
                      font: {
                        size: 20
                      }
                    },
                  },
                }}
              />

            </div>
            <div className='chart-box chart-1'>
              <Bar
                data={{
                  labels: Object.keys(filterData.wrMaps).map(map_id => mapInformation[map_id].map_name),
                  datasets: [
                    {
                      label: 'Win Percentage %',
                      data: Object.values(filterData.wrMaps).map(m => m.win_rate),
                      backgroundColor: Object.keys(filterData.wrMaps).map(map_id => mapInformation[map_id].color)

                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  responsive: true,
                  scales: {
                    x: {
                      min: 5,
                      max: Math.round(
                        (Math.max(...Object.values(filterData.wrMaps).map(m => m.win_rate)) + 5) / 5
                      ) * 5,
                      ticks: {
                        stepSize: 5
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                      color: "#000000ff",
                      font: {
                        size: isDesktop ? 20 : 10,
                        weight: 'bold',
                      }
                    }
                    },
                    title: {
                      color: "#000000ff",
                      display: true,
                      text: 'Winrate By Map.',
                      font: {
                        size: 20
                      }
                    },
                  },
                }}
              />
            </div>
            <div className='static-stats'>
              <div className='chart-box chart-2'>
                <h3>Average Victory Points</h3>
                <p className='data-main'>{Math.round(filterData.avgVP.avg_vp)}</p>
              </div>
              <div className='chart-box chart-2'>
                <h3>Highest VP Acheived</h3>
                <p className='data-main'>{Math.round(filterData.avgVP.max_vp)}</p>
              </div>
              <div className='chart-box chart-2'>
                <h3>Victory Points Lower Quartile</h3>
                <p className='data-main'>{Math.round(filterData.avgVP.vp_25_percentile)}</p>
              </div>
              <div className='chart-box chart-2'>
                <h3>Victory Points Upper Quartile</h3>
                <p className='data-main'>{Math.round(filterData.avgVP.vp_75_percentile)}</p>
              </div>
            </div>
            <div className='chart-box chart-1'>
              <Line
                data={{
                  labels: ['Start', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6'],
                  datasets: [
                    {
                      label: 'Victory Points',
                      data: Object.values(filterData.avgVPRound),
                      backgroundColor: "#0d3b52ff",
                      borderColor: "#66CCFF",

                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  indexAxis: 'x',
                  responsive: true,
                  scales: {
                    y: {
                      min: 0,
                      max: Math.max(...Object.values(filterData.avgVPRound)),
                      ticks: {
                        stepSize: 1
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                      color: "#000000ff",
                      font: {
                        size: isDesktop ? 20 : 10,
                        weight: 'bold',
                      }
                    }
                    },
                    title: {
                      color: "#000000ff",
                      display: true,
                      text: 'VP By Round.',
                      font: {
                        size: 20
                      }
                    },
                  },
                }}
              />
            </div>
            <div className='chart-box chart-1'>
              <Line
                data={{
                  labels: Object.keys(filterData.popOT),
                  datasets: [
                    {
                      label: 'Pickrate %',
                      data: Object.values(filterData.popOT).map(y => y.pick_rate),
                      backgroundColor: "#650f0fff",
                      borderColor: "#e75766ff",

                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  indexAxis: 'x',
                  responsive: true,
                  scales: {
                    y: {
                      min: Math.floor(Math.min(...Object.values(filterData.popOT).map(y => y.pick_rate))),
                      max: Math.ceil(Math.max(...Object.values(filterData.popOT).map(y => y.pick_rate))),
                      ticks: {
                        stepSize: 0.5
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                      color: "#000000ff",
                      font: {
                        size: isDesktop ? 20 : 10,
                        weight: 'bold',
                      }
                    }
                    },
                    title: {
                      color: "#000000ff",
                      display: true,
                      text: 'Pickrate over time.',
                      font: {
                        size: 20
                      }
                    },
                  },
                }}
              />
            </div>
            <div className='chart-box chart-4'>
              <Doughnut
                data={{
                  labels: Object.keys(filterData.wrByPlayercount),
                  datasets: [
                    {
                      label: 'Winrate %',
                      data: Object.values(filterData.wrByPlayercount).map(c => c.win_rate),
                      backgroundColor: Object.values(filterData.wrByPlayercount).map((count, index) => playerCountColors[index])
                    }
                  ]
                }}
                options={{
                  plugins: {
                    title: {
                      color: "#000000ff",
                      display: true,
                      text: 'Winrate by player count.',
                      font: {
                        size: 20
                      }
                    },
                    legend: {
                      labels: {
                      color: "#000000ff",
                      font: {
                        size: isDesktop ? 20 : 10,
                        weight: 'bold',
                      }
                    }
                    }
                  }
                }}
              >

              </Doughnut>

            </div>

          </div>
      }
    </div>
  );
}

export default FactionStats;
