import React from 'react'
import BackHeader from '../reusable/BackHeader'
import FactionsFilter from '../reusable/FactionsFilter'
import { data, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/StatsPages/GeneralStats.css'


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
function MapStats() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true)

  const [filterData, setFilterData] = useState({
    gamesPerMap: null,
    avgPlayersPerMap: null,
    prPerMap: null,
    winratePerMap: null,
    avgVPPerMap: null,
    performanceVar: null,
  });

  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');
  const mapID = searchParams.get('mapID')

  const handleFilterSubmit = (data) => {
    setSearchParams({
      startYear: data.yearRange[0],
      endYear: data.yearRange[1],
      mapID: data.mapID
    });
  };

  const routes = [
    '/games-per-map',
    '/avg-players-per-map',
    '/faction-pickrate',
    '/faction-winrate',
    '/avg-vp-per-map',
    '/performance-variation'
  ]

  const map_keys = {
        '126fe960806d587c78546b30f1a90853b1ada468': 'Original',
        '91645cdb135773c2a7a50e5ca9cb18af54c664c4': 'Original [2017 vp]',
        '95a66999127893f5925a5f591d54f8bcb9a670e6': 'Fire & Ice v1',
        'be8f6ebf549404d015547152d5f2a1906ae8dd90': 'Fire & Ice v2',
        'fdb13a13cd48b7a3c3525f27e4628ff6905aa5b1': 'Loon Lakes v1.6',
        '2afadc63f4d81e850b7c16fb21a1dcd29658c392': 'Fjords v2.1'
    }

  const playerCounts = ['2p', '3p', '4p', '5p', '6p']
  const mapPlayerCountColors = [
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477'
  ];


  useEffect(() => {
    setIsLoading(true)
    const shouldFetch = mapID && startYear && endYear;
    if (!shouldFetch) return;

    const filterParams = {
      s_year: Number(startYear),
      e_year: Number(endYear),
      map_id: mapID
    };

    const fetchData = async () => {
      try {
        const [
          gamesPerMap, playerPerMap, prMap,
          wrMap, avgVPMap, perfVar
        ] = await Promise.all(routes.map(route =>
          axios.get(`https://tmysticastats-api-production.up.railway.app/api/maps${route}`, {
            params: filterParams
          })
        ));

        let pickratesSorted = Object.fromEntries(Object.entries(prMap.data).sort(
          ([, a], [, b]) => b - a
        ))

        let winratesSorted = Object.fromEntries(Object.entries(wrMap.data).sort(
          ([, a], [, b]) => b - a
        ))

        let vpMapSorted = Object.fromEntries(Object.entries(avgVPMap.data).sort(
          ([, a], [, b]) => b - a
        ))

        let performanceSorted = Object.fromEntries(Object.entries(perfVar.data).sort(
          ([, a], [, b]) => b - a
        ))


        setFilterData({
          gamesPerMap: gamesPerMap.data,
          avgPlayersPerMap: playerPerMap.data,
          prPerMap: pickratesSorted,
          winratePerMap: winratesSorted,
          avgVPPerMap: vpMapSorted,
          performanceVar: performanceSorted,
        });
        setIsLoading(false)
      } catch (err) {
        console.error('API fetch error:', err);
        setIsLoading(false)
      }
    };

    fetchData();
  }, [startYear, endYear, mapID]);

  return (
    <div>
      <BackHeader />
      <FactionsFilter
        onSubmit={handleFilterSubmit}
        initialValues={{ startYear, endYear, mapID }}
        availableFilters={{ showMaps: true, showYears: true }} />

      {isLoading ? <h3>Loading!</h3> :
        <div className='general-stats-container'>
          <div className='static-stats'>
            <div className='chart-box chart-3'>
              <h3>Games Played</h3>
              <p className='data-main'>{filterData.gamesPerMap.games_played}</p>
            </div>
          </div>

          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: [...Object.keys(filterData.avgPlayersPerMap).map(
                  key => map_keys[key]
                )],
                datasets: playerCounts.map((count, index) => ({
                  label: count,
                  data: Object.keys(filterData.avgPlayersPerMap).map(map_id => filterData.avgPlayersPerMap[map_id][count]),
                  backgroundColor: mapPlayerCountColors[index]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    stacked: true
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
                labels: Object.keys(filterData.prPerMap),
                datasets: [
                  {
                    label: 'Pick Percentage %',
                    data: Object.values(filterData.prPerMap),
                    backgroundColor: Object.keys(filterData.prPerMap).map(f => factionColors[f])

                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    min: 0,
                    max: Math.round(
                      (Math.max(...Object.values(filterData.prPerMap)))),
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
                    text: 'Pickrate on map.',
                  },
                },
              }}
            />
          </div>





          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.winratePerMap),
                datasets: [
                  {
                    label: 'Winrate %',
                    data: Object.values(filterData.winratePerMap),
                    backgroundColor: Object.keys(filterData.winratePerMap).map(f => factionColors[f])

                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    min: 0,
                    max: Math.round(
                      (Math.max(...Object.values(filterData.winratePerMap)))),
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
                    text: 'Winrates on map',
                  },
                },
              }}
            />
          </div>



          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.avgVPPerMap),
                datasets: [
                  {
                    label: 'Victory Points',
                    data: Object.values(filterData.avgVPPerMap),
                    backgroundColor: Object.keys(filterData.avgVPPerMap).map(f => factionColors[f])

                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    min: 100,
                    max: Math.round(
                      (Math.max(...Object.values(filterData.avgVPPerMap)))),
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
                    text: 'Avg VP scored on map.',
                  },
                },
              }}
            />
          </div>


          <div className='chart-box chart-1'>
            <Bar
              data={{
                labels: Object.keys(filterData.performanceVar),
                datasets: [
                  {
                    label: 'Performance Difference',
                    data: Object.values(filterData.performanceVar),
                    backgroundColor: Object.keys(filterData.performanceVar).map(f => factionColors[f])

                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    min: Math.round(
                      (Math.min(...Object.values(filterData.performanceVar)))),
                    max: Math.round(
                      (Math.max(...Object.values(filterData.performanceVar)))),
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
                    text: 'Winrate difference on map (compared to global)',
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

export default MapStats