import React, { useState } from 'react';
import './reusableCSS/FactionsFilter.css'
import { mapInformation, factionInformation } from '../../assets/infoDicts';
import tileInfo from '../../assets/tileInfo';
import factionImages from '../../assets/faction-images/factionImages';

function PredictFilter() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterToggle = () => {
        setIsExpanded(!isExpanded);
    };


    const bonusTiles = Object.keys(tileInfo['bonusTiles'])
    const num_players = [2, 3, 4, 5,]
    const scoreTiles = Object.keys(tileInfo['scoreTiles'])
    const factions = Object.keys(factionInformation)
    const bonusTileAmounts = {
        2: 5,
        3: 6,
        4: 7,
        5: 8,
    }

    return (
        <div className={`filter-container ${isExpanded ? 'filter-container-expanded' : 'filter-container-banner'}`}>
            {!isExpanded && (
                <div className='arrow down' onClick={handleFilterToggle}></div>
            )}

            {isExpanded && (
                <>
                    <form className='filter-options-container'>

                        <div className='filter-option'>
                            <p>No. Players</p>
                            <div className='filter-selections'>
                                <select className='option-select'>
                                    {num_players.map((num, index) => (
                                        <option key={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className='filter-option'>
                            <p>Map</p>
                            <div className='filter-selections'>
                                <select className='option-select map-filter'>
                                    {Object.keys(mapInformation).map((map_id, index) => (
                                        <option value={map_id.toUpperCase()} key={map_id}>{mapInformation[map_id].map_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className='filter-option tile-box'>
                            <p>Score Tiles</p>
                            <div className='score-tile-selections'>
                                {scoreTiles.map((tile) => (
                                    <label key={tile} >
                                        <input
                                        type='checkbox'
                                        value={tile}
                                        
                                           
                                        />
                                        <img className='filter-score-tile-img' src={tileInfo['scoreTiles'][tile].img}></img>
                                    </label>
                                ))}
                            </div>
                        </div>


                        <div className='filter-option bonus-tile-box'>
                            <p>Bonus Tiles</p>
                            <div className='bonus-tile-selections'>
                                {bonusTiles.map((tile) => (
                                    <label key={tile} >
                                        <input
                                        type='checkbox'
                                        value={tile}
                                        
                                           
                                        />
                                        <img className='filter-bonus-tile-img' src={tileInfo['bonusTiles'][tile].img}></img>
                                    </label>
                                ))}
                            </div>
                        </div>


                           <div className='filter-option tile-box'>
                            <p>Factions</p>
                            <div className='score-tile-selections'>
                                {factions.map((f) => (
                                    <label style={{backgroundColor: factionInformation[f].color}} key={f} >
                                        <input
                                        type='checkbox'
                                        value={f}
                                        
                                           
                                        />
                                        <p>{factionInformation[f].name}</p>
                                        <img className='prediction-faction-img' src={factionImages[factionInformation[f].name.split(' ').join('')]}></img>
                                    </label>
                                ))}
                            </div>
                        </div>









                    </form>



                    <button className='close-search' onClick={handleFilterToggle}><div className='arrow up'></div></button>
                </>
            )}
        </div>
    );
}

export default PredictFilter;
