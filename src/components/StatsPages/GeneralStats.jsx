import React from 'react'
import BackHeader from '../reusable/BackHeader'
import '../../styles/StatsPages/GeneralStats.css'
import generalStats from '../../../general_stats.json'

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

  return (
    <main>
      <BackHeader />
      <div className='general-stats-container no-filter'>
        <h3 className='page-header'>General Game Statistics</h3>
        <div className='chart-box chart-1'>
          <Bar
            data={{
              labels: Object.keys(generalStats['win_rate%']),
              datasets: [
                {
                  label: 'Win Percentage %',
                  data: Object.values(generalStats['win_rate%']),
                  backgroundColor: [
                    "#4B4B4B",
                    "#C0392B",
                    "#4B4B4B",
                    "#D35400",
                    "#5DADE2",
                    "#2980B9",
                    "#C0392B",
                    "#2980B9",
                    "#229954",
                    "#85C1E9",
                    "#4B4B4B",
                    "#F1C40F",
                    "#F1C40F",
                    "#4B4B4B",
                    "#85C1E9",
                    "#229954",
                    "#C0392B",
                    "#D35400",
                    "#D35400",
                    "#F1C40F"
                  ]
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
        <div className='chart-box chart-1'>
          <Bar
            data={{
              labels: Object.keys(generalStats['faction_pick%']),
              datasets: [
                {
                  label: 'Pickrate %',
                  data: Object.values(generalStats['faction_pick%']),
                  backgroundColor: [
                    "#A9A9A9",
                    "#F7DC6F",
                    "#E57373",
                    "#85C1E9",
                    "#7DCEA0",
                    "#F5B041",
                    "#85C1E9",
                    "#F7DC6F",
                    "#A9A9A9",
                    "#A9A9A9",
                    "#F5B041",
                    "#F5B041",
                    "#7DCEA0",
                    "#AED6F1",
                    "#F7DC6F",
                    "#AED6F1",
                    "#E57373",
                    "#A9CCE3",
                    "#A9A9A9",
                    "#E57373"
                  ]


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
                  backgroundColor: [
                    '#4B4B4B',
                    '#D35400',
                    '#F1C40F',
                    '#2980B9',
                    '#C0392B',
                    '#229954',
                  ]
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
