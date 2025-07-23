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

function FactionStats() {
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


  const map_keys = {
  '126fe960806d587c78546b30f1a90853b1ada468': { map_name: 'Original', color: '#4A4A4A' },
  '91645cdb135773c2a7a50e5ca9cb18af54c664c4': { map_name: 'Original [2017 vp]', color: '#5C5C5C' },
  '95a66999127893f5925a5f591d54f8bcb9a670e6': { map_name: 'Fire & Ice v1', color: '#FF5733' },
  'be8f6ebf549404d015547152d5f2a1906ae8dd90': { map_name: 'Fire & Ice v2', color: '#66CCFF' },
  'fdb13a13cd48b7a3c3525f27e4628ff6905aa5b1': { map_name: 'Loon Lakes v1.6', color: '#88C999' },
  '2afadc63f4d81e850b7c16fb21a1dcd29658c392': { map_name: 'Fjords v2.1', color: '#A9CDEB' }
};


  const mapColors = [
  "#4A4A4A",
  "#5C5C5C",
  "#FF5733",
  "#66CCFF",
  "#88C999",
  "#A9CDEB"
];


  useEffect(() => {
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
      try {
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
        setIsLoading(false)
      } catch (err) {
        console.error('API fetch error:', err);
        setIsLoading(false)
      }
    };

    fetchData();
  }, [faction, startYear, endYear, numPlayers]);

  return (
    <div>
      <BackHeader />
      <FactionsFilter
        onSubmit={handleFilterSubmit}
        initialValues={{ faction, startYear, endYear, numPlayers }
        }
        availableFilters={{showFaction: true, showYears: true, showNumPlayers: true }}
      />
      {isLoading ? <p>Loading Stats!</p> :
        <div className='general-stats-container'>
          <h3>Faction Statistics!</h3>
          <p>Faction: {faction}</p>
          <p>Year Range: {startYear} to {endYear}</p>
          <p>No. Players: {numPlayers}</p>
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
                labels: Object.keys(filterData.wrVersus),
                datasets: [
                  {
                    label: 'Win Percentage %',
                    data: Object.values(filterData.wrVersus).map(f => f.win_rate),
                    backgroundColor: Object.keys(filterData.wrVersus).map(f => factionColors[f])

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
                  },
                  title: {
                    display: true,
                    text: 'Winrate versus other factions.',
                  },
                },
              }}
            />

          </div>
          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.wrMaps).map(map_id => map_keys[map_id].map_name),
                datasets: [
                  {
                    label: 'Win Percentage %',
                    data: Object.values(filterData.wrMaps).map(m => m.win_rate),
                    backgroundColor: Object.keys(filterData.wrMaps).map(map_id => map_keys[map_id].color)

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
                  },
                  title: {
                    display: true,
                    text: 'Winrate By Map.',
                  },
                },
              }}
            />
          </div>
          <h3>Victory Point Stats</h3>
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
                  },
                  title: {
                    display: true,
                    text: 'VP By Round.',
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
                  },
                  title: {
                    display: true,
                    text: 'Pickrate over time.',
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
                }
              ]
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Winrate by player count.'
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
