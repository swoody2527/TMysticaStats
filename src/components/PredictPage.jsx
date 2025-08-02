import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BackHeader from './reusable/BackHeader'
import PredictFilter from './reusable/PredictFilter'
import '../styles/PredictPage.css'
import axios from 'axios'
import { factionInformation } from '../assets/infoDicts'
import factionImages from '../assets/faction-images/factionImages'
import ErrorComponent from './reusable/ErrorComponent'
import NoSearch from './reusable/NoSearch'

function PredictPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)


  const isFactions = searchParams.get('isFactions') === 'true';
  const numPlayers = searchParams.get('numPlayers');
  const mapID = searchParams.get('mapID');
  const scoreTileList = searchParams.getAll('scoreTile');
  const bonusTileList = searchParams.getAll('bonusTile');
  const factionList = searchParams.getAll('faction');

const riskColors = {
  '1': '#4caf4f7f',
  '2': '#ffc1077d',
  '3': '#f4433682'
}


  const [predictionData, setPredictionData] = useState({});

  const handleFilterSubmit = (data) => {
    setHasSearched(true);

    const params = new URLSearchParams();

    if (data.isFactions) params.set('isFactions', String(data.isFactions))

    if (data.numPlayers) params.set('numPlayers', data.numPlayers);
    if (data.mapID) params.set('mapID', data.mapID);

    data.scoreTileList.forEach(tile => params.append('scoreTile', tile));
    data.bonusTileList.forEach(tile => params.append('bonusTile', tile));
    data.factionList.forEach(faction => params.append('faction', faction));

    setSearchParams(params);
  };


  useEffect(() => {
    setError(false)
    const shouldFetch = numPlayers && mapID && bonusTileList && scoreTileList && factionList
    if (!shouldFetch) return;


    setIsLoading(true)
    setHasSearched(true)

    const axiosParams = new URLSearchParams();

    axiosParams.set('num_players', Number(numPlayers));
    axiosParams.set('map_id', mapID.toUpperCase());
    axiosParams.set('factions_included', String(isFactions));

    scoreTileList.forEach(tile => axiosParams.append('score_tiles', tile));
    bonusTileList.forEach(tile => axiosParams.append('bonus_tiles', tile));
    factionList.forEach(faction => axiosParams.append('game_factions', faction));


    const fetchData = async () => {
      setIsLoading(true)
      try {
        const predictionData = await axios.get('https://tmysticastats-api-production.up.railway.app/api/predictions/win_prediction', {
          params: axiosParams
        })

        console.log(predictionData)

        const sortedByWinProb = Object.entries(predictionData.data)
          .sort(([, a], [, b]) => b.win_prob - a.win_prob)
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});




        setPredictionData(sortedByWinProb)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setError(err.response.data.error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [searchParams.toString()])


  return (
    <div className='prediction-page'>
      <BackHeader />
      <PredictFilter onSubmit={handleFilterSubmit} initialValues={{numPlayers: numPlayers, mapID: mapID, scoreTileList: scoreTileList, bonusTileList: bonusTileList }} />
      {error ? <ErrorComponent errorMsg={error} /> : !hasSearched ? <NoSearch /> : isLoading ?
        <div className='loading-component'>
          <span className='loader'></span>
          <p style={{ fontSize: '2em', color: 'white', fontWeight: 'bold', WebkitTextStroke: '1px black' }}>Making predictions...</p>
        </div> :
        <div>
          <div className='prediction-header'>
            <h2>Prediction Results</h2>
          </div>
          <div className='prediction-output-container'>
            <div className='faction-prediction header-row'>
              <p className='header-cell'>Faction</p>
              <p className='header-cell'>Win Chance</p>
              <p className='header-cell'>Risk Level</p>
            </div>
            {Object.keys(predictionData).map(faction => (
              <div className='faction-prediction'>
                <p style={{
                  backgroundImage: `url(${factionImages[factionInformation[faction.toLowerCase()].name.split(' ').join('')]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>{factionInformation[faction.toLowerCase()].name}</p>
                <p>{(predictionData[faction].win_prob * 100).toFixed(2)}%</p>
                <p style={{backgroundColor: riskColors[predictionData[faction].risk_level]}}>{predictionData[faction].risk_level}</p>
              </div>
            ))}

          </div>
        </div>
      }
    </div>
  )
}

export default PredictPage