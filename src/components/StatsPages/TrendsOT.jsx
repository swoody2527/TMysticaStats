import React, { useState, useEffect } from 'react';
import { data, useSearchParams } from 'react-router-dom';
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

function TrendsOT() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true)

  const [filterData, setFilterData] = useState({
    winRate: null,
    pickRate: null,
    mapsOT: null,
    playedGames: null,
  });



  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');

  const handleFilterSubmit = (data) => {
    setSearchParams({
      startYear: data.yearRange[0],
      endYear: data.yearRange[1],
    });
  };

  const routes = [
    '/win-rate-ot',
    '/pick-rate-ot',
    '/map-picks-ot',
    '/played-games-ot'
  ]

  const factionsNames = [
    "acolytes",
    "alchemists",
    "auren",
    "chaosmagicians",
    "cultists",
    "darklings",
    "dragonlords",
    "dwarves",
    "engineers",
    "fakirs",
    "giants",
    "halflings",
    "icemaidens",
    "mermaids",
    "nomads",
    "riverwalkers",
    "shapeshifters",
    "swarmlings",
    "witches",
    "yetis",
  ]

  const map_keys = {
    '126fe960806d587c78546b30f1a90853b1ada468': 'Original',
    '91645cdb135773c2a7a50e5ca9cb18af54c664c4': 'Original [2017 vp]',
    '95a66999127893f5925a5f591d54f8bcb9a670e6': 'Fire & Ice v1',
    'be8f6ebf549404d015547152d5f2a1906ae8dd90': 'Fire & Ice v2',
    'fdb13a13cd48b7a3c3525f27e4628ff6905aa5b1': 'Loon Lakes v1.6',
    '2afadc63f4d81e850b7c16fb21a1dcd29658c392': 'Fjords v2.1'
  }


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
    const shouldFetch = startYear && endYear;
    if (!shouldFetch) return;

    const filterParams = {
      s_year: Number(startYear),
      e_year: Number(endYear),
    };

    const fetchData = async () => {
      try {
        const [
          wrOT, prOT, mapsOT, gamesOT
        ] = await Promise.all(routes.map(route =>
          axios.get(`https://tmysticastats-api-production.up.railway.app/api/trends${route}`, {
            params: filterParams
          })
        ));


        setFilterData({
          winRate: wrOT.data,
          pickRate: prOT.data,
          mapsOT: mapsOT.data,
          playedGames: gamesOT.data,

        });
        setIsLoading(false)
      } catch (err) {
        console.error('API fetch error:', err);
        setIsLoading(false)
      }
    };

    fetchData();
  }, [startYear, endYear]);

  return (
    <div>
      <BackHeader />
      <FactionsFilter
        onSubmit={handleFilterSubmit}
        initialValues={{ startYear, endYear }}
        availableFilters={{ showYears: true }}
      />
      {isLoading ? <p>Loading!</p> :
        <div className='general-stats-container'>

          <div className='chart-box chart-1'>
            <Line
              data={{
                labels: Object.keys(filterData.winRate),
                datasets: factionsNames.map((faction, index) => ({
                  label: faction,
                  data: Object.keys(filterData.winRate).map(year => filterData.winRate[year][faction]),
                  backgroundColor: factionColors[faction],
                  borderColor: factionColors[faction]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'x',
                responsive: true,
                scales: {
                  y: {

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
                labels: Object.keys(filterData.pickRate),
                datasets: factionsNames.map((faction, index) => ({
                  label: faction,
                  data: Object.keys(filterData.pickRate).map(year => filterData.pickRate[year][faction]),
                  backgroundColor: factionColors[faction],
                  borderColor: factionColors[faction]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'x',
                responsive: true,
                scales: {
                  y: {

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
                labels: Object.keys(filterData.mapsOT),
                datasets: Object.keys(map_keys).map((map_id, index) => ({
                  label: map_keys[map_id],
                  data: Object.keys(filterData.mapsOT).map(year => filterData.mapsOT[year][map_id]),
                  backgroundColor: roundColors[index],
                  borderColor: roundColors[index]
                }))
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'x',
                responsive: true,
                scales: {
                  y: {

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
                labels: Object.keys(filterData.playedGames),
                datasets: [
                  {
                    label: 'Games Played',
                    data: Object.values(filterData.playedGames),
                    backgroundColor: '#4e79a7',
                    borderColor: '#4e79a7',
                  }
                ]
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'x',
                responsive: true,
                scales: {
                  y: {

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


        </div>
      }
    </div>
  )
}

export default TrendsOT