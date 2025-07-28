
import BackHeader from '../reusable/BackHeader'
import '../../styles/StatsPages/GeneralStats.css'
import generalStats from '../../../general_stats.json'
import { mapInformation, factionInformation, mapInformationByName } from '../../assets/infoDicts'
import React, { useEffect, useState } from 'react';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';

import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

ChartJS.defaults.plugins.datalabels.display = false;


function GeneralStats() {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const staticStats = (
  <div className='static-stats'>
    <div className='chart-box chart-3'>
      <h3>Total Games</h3>
      <p className='data-main'>{generalStats.total_games.toLocaleString()}</p>
    </div>
    <div className='chart-box chart-2'>
      <h3>Avg Winning VP</h3>
      <p className='data-main'>{generalStats.vp_scores.win_avg}</p>
    </div>
    <div className='chart-box chart-2'>
      <h3>Avg VP Per Player</h3>
      <p className='data-main'>{generalStats.vp_scores.per_player_avg}</p>
    </div>
  </div>
);



  return (
    <main>
      <BackHeader />
      <div className='general-stats-container no-filter'>
        <div className='header-container'>
          <h3 className='page-header'>General Game Statistics</h3>
        </div>
        {isDesktop ? staticStats: null}
        <div className='chart-box chart-1'>
          <Bar
            data={{
              labels: Object.keys(generalStats['win_rate%']).map(faction => factionInformation[faction].name),
              datasets: [
                {
                  label: 'Win Percentage %',
                  data: Object.values(generalStats['win_rate%']),
                  backgroundColor: Object.keys(generalStats['win_rate%']).map(faction => factionInformation[faction].color)
                  ,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              indexAxis: 'y',
              responsive: true,
              scales: {
                x: {
                  min: 15,
                  max: 35,
                  ticks: {
                    stepSize: 2
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
                  text: 'Faction Win Rates',
                  font: {
                    size: 20
                  }
                },
              },
            }}
          />

        </div>
       {!isDesktop ? staticStats : null}
        <div className='chart-box chart-1'>
          <Bar
            data={{
              labels: Object.keys(generalStats['faction_pick%']).map(faction => factionInformation[faction].name),
              datasets: [
                {
                  label: 'Pickrate %',
                  data: Object.values(generalStats['faction_pick%']),
                  backgroundColor: Object.keys(generalStats['faction_pick%']).map(faction => factionInformation[faction].color)


                  ,
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
                  max: 50,
                  ticks: {
                    stepSize: 2
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
                  text: 'Faction Pickrate %',
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
              labels: Object.keys(generalStats.avg_players),
              datasets: [
                {
                  label: 'Player Counts',
                  data: Object.values(generalStats.avg_players),
                  backgroundColor: [
                    '#4B4B4B',
                    '#D35400',
                    '#F1C40F',
                    '#2980B9',
                    '#C0392B',
                    '#229954',
                    '#85C1E9',
                  ]
                }
              ]
            }}
            options={{
              plugins: {
                datalabels: {
                  display: true,
                  color: 'black',        // text color
                  font: {
                    weight: 'bold',
                    size: 30
                  },
                  borderWidth: 0,        // no box border
                  textStrokeColor: 'white',
                  textStrokeWidth: 2,    // white border around the text
                  formatter: (value, context) => context.chart.data.labels[context.dataIndex]
                },

                title: {
                  color: "#000000ff",
                  display: true,
                  text: 'Overall Games By Player Count',
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

        <div className='chart-box chart-4'>
          <Doughnut
            data={{
              labels: Object.keys(generalStats.common_map),
              datasets: [
                {
                  label: 'Player Counts',
                  data: Object.values(generalStats.common_map),
                  backgroundColor: Object.keys(generalStats.common_map).map(mapName => mapInformationByName[mapName].color)
                }
              ]
            }}
            options={{
              plugins: {
                title: {
                  color: "#000000ff",
                  display: true,
                  text: 'Overall Games By Map',
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

    </main>
  );
}

export default GeneralStats;
