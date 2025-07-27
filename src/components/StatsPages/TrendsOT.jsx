import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BackHeader from '../reusable/BackHeader';
import FactionsFilter from '../reusable/FactionsFilter';
import ErrorComponent from '../reusable/ErrorComponent';
import NoSearch from '../reusable/NoSearch';
import '../../styles/StatsPages/GeneralStats.css';
import { factionInformation, mapInformation } from '../../assets/infoDicts';

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

import { Line } from 'react-chartjs-2';
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
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState(false)

  const [filterData, setFilterData] = useState({
    winRate: null,
    pickRate: null,
    mapsOT: null,
    playedGames: null,
  });



  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');

  const handleFilterSubmit = (data) => {
    setHasSearched(true)
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

  useEffect(() => {
    setError(false)
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
        setError(false)
        setIsLoading(false)
      } catch (err) {
        console.error('API fetch error:', err);
        setError(err.response.data.error)
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
      {error? <ErrorComponent errorMsg={error} />:!hasSearched ? <NoSearch /> : isLoading ?
        <div>
          <span className='loader'></span>
           <p style={{fontSize: '2em', color: 'white', fontWeight: 'bold', WebkitTextStroke: '1px black'}}>Compiling Statistics...</p>
        </div> :
        <div className='general-stats-container'>
          <h3 className='page-header'>Trend Statistics</h3>
          <div className='filter-info'>
            <div className='filter-widget'>
              <p className='filter-info-label'>Year Range</p>
              <p className='filter-info-text'>From: {startYear}</p>
              <p className='filter-info-text'>To: {endYear}</p>
            </div>


          </div>

          <div className='chart-box chart-1'>
            <Line
              data={{
                labels: Object.keys(filterData.winRate),
                datasets: Object.keys(factionInformation).map((faction, index) => ({
                  label: factionInformation[faction].name,
                  data: Object.keys(filterData.winRate).map(year => filterData.winRate[year][faction]),
                  backgroundColor: factionColors[faction],
                  borderColor: factionColors[faction],
                  hidden: true,
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
                    color: "#000000ff",
                    display: true,
                    text: 'Winrate over time.',
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
                labels: Object.keys(filterData.pickRate),
                datasets: Object.keys(factionInformation).map((faction, index) => ({
                  label: factionInformation[faction].name,
                  data: Object.keys(filterData.pickRate).map(year => filterData.pickRate[year][faction]),
                  backgroundColor: factionColors[faction],
                  borderColor: factionColors[faction],
                  hidden: true
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


          <div className='chart-box chart-1'>
            <Line
              data={{
                labels: Object.keys(filterData.mapsOT),
                datasets: Object.keys(mapInformation).map((map_id, index) => ({
                  label: mapInformation[map_id].map_name,
                  data: Object.keys(filterData.mapsOT).map(year => filterData.mapsOT[year][map_id]),
                  backgroundColor: mapInformation[map_id].color,
                  borderColor: mapInformation[map_id].color
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
                    color: "#000000ff",
                    display: true,
                    text: 'Games on specifc map over time.',
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


        </div>
      }
    </div>
  )
}

export default TrendsOT