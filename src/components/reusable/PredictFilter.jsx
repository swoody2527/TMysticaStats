import React, { useState } from 'react';
import './reusableCSS/FactionsFilter.css'
import { mapInformation, factionInformation } from '../../assets/infoDicts';
import tileInfo from '../../assets/tileInfo';
import factionImages from '../../assets/faction-images/factionImages';

function PredictFilter({ onSubmit, initialValues = {} }) {
    const [isExpanded, setIsExpanded] = useState(() => {
        const hasInitial =
            initialValues?.numPlayers &&
            initialValues?.mapID &&
            Array.isArray(initialValues?.scoreTileList) &&
            Array.isArray(initialValues?.bonusTileList) &&
            initialValues?.scoreTileList.length > 0 &&
            initialValues?.bonusTileList.length > 0;

        return !hasInitial;
    });

    const [numPlayers, setNumPlayers] = useState(null)
    const [map, setMap] = useState(null)
    const [scoreTileList, setScoreTileList] = useState([])
    const [bonusTileList, setBonusTileList] = useState([])
    const [factionList, setFactionList] = useState([])
    const [factionsIncluded, setFactionsIncluded] = useState(true)


    const handleFilterToggle = () => {
        setIsExpanded(!isExpanded);
    };


    const handleScoreTileChange = (e) => {
        const { value, checked } = e.target

        setScoreTileList(prev => {
            if (checked) {
                if (prev.length == 6) {
                    return prev
                } else {
                    return [...prev, value]
                }
            } else {
                return prev.filter(tile => tile !== value)
            }
        })

    }

    const bonusTileAmounts = {
        2: 5,
        3: 6,
        4: 7,
        5: 8,
    }
    const handleBonusTileChange = (e) => {
        const { value, checked } = e.target

        setBonusTileList(prev => {
            if (checked) {
                if (prev.length == bonusTileAmounts[numPlayers]) {
                    return prev
                } else {
                    return [...prev, value]
                }
            } else {
                return prev.filter(tile => tile !== value)
            }
        })

    }

    {/*
    const handleFactionListChange = (e) => {
        const { value, checked } = e.target

        setFactionList(prev => {
            if (checked) {
                if (prev.length == numPlayers - 1) {
                    return prev
                } else {
                    return [...prev, value]
                }
            } else {
                return prev.filter(fact => fact !== value)
            }
        })

    }
        */}


    const handleFilterSubmit = (e) => {
        e.preventDefault()

        let data = {
            isFactions: false,
            numPlayers: numPlayers,
            mapID: map,
            scoreTileList: scoreTileList,
            bonusTileList: bonusTileList,
            factionList: factionList
        }
        setIsExpanded(false)
        onSubmit(data)
    }


    const bonusTiles = Object.keys(tileInfo['bonusTiles'])
    const num_players = [2, 3, 4, 5,]
    const scoreTiles = Object.keys(tileInfo['scoreTiles'])
    const factions = Object.keys(factionInformation)


    return (
        <div className={`filter-container ${isExpanded ? 'filter-container-expanded' : 'filter-container-banner'}`}>
            {!isExpanded && (
                <div className='arrow down' onClick={handleFilterToggle}></div>
            )}

            {isExpanded && (
                <>
                    <form className='filter-options-container' onSubmit={handleFilterSubmit}>

                        <div className='filter-option input-info'>
                            <h2>Faction Suggestions</h2>
                            <p style={{ padding: 20 }}>
                                The faction suggestion tool can give rough guidance
                                on how factions will perform given the amount of players,
                                the map, the scoring tiles, and the bonus tiles. Some combinations
                                of these variables are extremely rare and it is possible for some
                                predictions to be off to large degree.
                            </p>
                            <p>Scoring tiles should be entered in order of their round occurance.</p>

                            <p>Start by selecting No. Players to enable tile selection.</p>

                        </div>


                        <div className='filter-option input-info'>
                            <h2>Current Inputs</h2>
                            <div className='info-holder'>
                                <p className='info-holder-title'>No. Players</p>
                                <p className='info-holder-data'>{numPlayers || 'Not Selected'}</p>
                            </div>
                            <div className='info-holder'>
                                <p className='info-holder-title'>Map</p>
                                {map ? <p className='info-holder-data'>{mapInformation[map].map_name}</p > : <p className='info-holder-data'>Not Selected</p>}
                            </div>

                            <div className='info-holder'>
                                <p className='info-holder-title'>Score Tiles: {scoreTileList.length}/6</p>
                                <p className='info-holder-data'>{scoreTileList.join(', ') || 'None Selected'}</p>
                            </div>

                            <div className='info-holder'>
                                <p className='info-holder-title'>Bonus Tiles: {bonusTileList.length}/{bonusTileAmounts[numPlayers] || '?'}</p>
                                <p className='info-holder-data'>{bonusTileList.join(', ') || 'None Selected'}</p>
                            </div>

                            {/*
                            {numPlayers ? <p>Factions: {factionList.length}/{numPlayers-1}</p> : <p>Factions</p>}
                            <p>Factions Unknown?</p>
                            <input type='checkbox' checked={!factionsIncluded} onChange={() => {setFactionsIncluded(!factionsIncluded)}}></input>                     
                            <p>{factionList}</p>
                            */}
                            <button className='apply-btn' type='submit'>Predict</button>
                        </div>




                        <div className='filter-option'>
                            <p>No. Players</p>
                            <div className='filter-selections'>
                                <select onChange={(e) => {
                                    setNumPlayers(e.target.value)
                                    setBonusTileList([])
                                }} className='option-select map-filter'>
                                    <option selected value="" disabled>Select Players</option>
                                    {num_players.map((num, index) => (
                                        <option key={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className='filter-option'>
                            <p>Map</p>
                            <div className='filter-selections'>
                                <select onChange={(e) => setMap(e.target.value)} className='option-select map-filter'>
                                    <option selected value="" disabled>Select Map</option>
                                    {Object.keys(mapInformation).map((map_id, index) => (
                                        <option value={map_id} key={map_id}>{mapInformation[map_id].map_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className='filter-option tile-box'>
                            <p>Score Tiles: {scoreTileList.length}/6</p>
                            <div className='score-tile-selections'>
                                {scoreTiles.map((tile) => (
                                    <label key={tile} >
                                        <input
                                            type='checkbox'
                                            value={tile}
                                            onChange={handleScoreTileChange}
                                            checked={scoreTileList.includes(tile)}
                                            disabled={!numPlayers}


                                        />
                                        <img className='filter-score-tile-img' src={tileInfo['scoreTiles'][tile].img}></img>
                                    </label>
                                ))}
                            </div>
                        </div>


                        <div className='filter-option bonus-tile-box'>
                            <p>Bonus Tiles: {bonusTileList.length}/{bonusTileAmounts[numPlayers] || '?'}</p>
                            <div className='bonus-tile-selections'>
                                {bonusTiles.map((tile) => (
                                    <label key={tile} >
                                        <input
                                            type='checkbox'
                                            value={tile}
                                            onChange={handleBonusTileChange}
                                            checked={bonusTileList.includes(tile)}
                                            disabled={!numPlayers}


                                        />
                                        <img className='filter-bonus-tile-img' src={tileInfo['bonusTiles'][tile].img}></img>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/*
                        {factionsIncluded ?
                        <div className='filter-option tile-box'>
                            <p>Factions</p>
                            <div className='score-tile-selections'>
                                {factions.map((f) => (
                                    <label className='faction-label' style={{ backgroundColor: factionInformation[f].color }} key={f} >
                                        <input
                                            type='checkbox'
                                            value={f}
                                            onChange={handleFactionListChange}
                                            checked={factionList.includes(f)}


                                        />
                                        <p>{factionInformation[f].name}</p>
                                        <img className='prediction-faction-img' src={factionImages[factionInformation[f].name.split(' ').join('')]}></img>
                                    </label>
                                ))}
                            </div>
                        </div>
                        : null}

                        */}








                    </form>



                    <button className='close-search' onClick={handleFilterToggle}><div className='arrow up'></div></button>
                </>
            )}
        </div>
    );
}

export default PredictFilter;
