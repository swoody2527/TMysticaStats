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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

function GeneralStats() {

  return (
    <main>
      <BackHeader />
      <div className='general-stats-container'>
        <h3>General Game Statistics</h3>
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
                  display: true,
                  text: 'Faction Win Rates',
                },
              },
            }}
          />

        </div>
        <div className='static-stats'>
          <div className='chart-box chart-3'>
            <h3>Total Games</h3>
            <p>{generalStats.total_games.toLocaleString()}</p>
          </div>
          <div className='chart-box chart-2'>
            <h3>Avg Winning VP</h3>
            <p>{generalStats.vp_scores.win_avg}</p>
          </div>
          <div className='chart-box chart-2'>
            <h3>Avg VP Per Player</h3>
            <p>{generalStats.vp_scores.per_player_avg}</p>
          </div>
        </div>
        <div className='chart-box chart-1'>
          <Bar
            data={{
              labels: Object.keys(generalStats['faction_pick%']),
              datasets: [
                {
                  label: 'Win Percentage %',
                  data: Object.values(generalStats['faction_pick%']),
                  backgroundColor: [
                    "#4B4B4B",
                    "#F1C40F",
                    "#C0392B",
                    "#2980B9",
                    "#229954",
                    "#D35400",
                    "#2980B9",
                    "#F1C40F",
                    "#4B4B4B",
                    "#4B4B4B",
                    "#D35400",
                    "#D35400",
                    "#229954",
                    "#85C1E9",
                    "#F1C40F",
                    "#85C1E9",
                    "#C0392B",
                    "#5DADE2",
                    "#4B4B4B",
                    "#C0392B"
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
                  display: true,
                  text: 'Faction Win Rates',
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
                title: {
                  display: true,
                  text: 'Player Counts'
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
                  display: true,
                  text: 'Player Counts'
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
