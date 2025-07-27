import React, { useState } from 'react';
import BackHeader from './reusable/BackHeader';
import tileInfo from '../assets/tileInfo';
import '../styles/LegendPage.css';

function LegendPage() {
    const [scoringHide, setScoringHide] = useState(true);
    const [bonusHide, setBonusHide] = useState(true)
    const [favorHide, setFavorHide] = useState(true)
    const [townHide, setTownHide] = useState(true)

    return (
        <div>
            <BackHeader />


            <div className='tile-container'>
                <div className='tile-container-header'>
                    <h2>Scoring Tile Information</h2>
                    <button onClick={() => setScoringHide(!scoringHide)}>
                        {scoringHide ? 'Show' : 'Hide'}
                    </button>
                </div>

                {!scoringHide &&
                    Object.keys(tileInfo.scoreTiles).map((key) => (
                        <div className='tile-widget' key={key}>
                            <div className='tile-widget-main'>
                                <h3>{key}</h3>
                                <img className='tile-widget-img-normal' src={tileInfo.scoreTiles[key].img} alt={key} />
                            </div>
                            <p>{tileInfo.scoreTiles[key].info}</p>
                        </div>
                    ))}
            </div>


            <div className='tile-container'>
                <div className='tile-container-header'>
                    <h2>Bonus Tile Information</h2>
                    <button onClick={() => setBonusHide(!bonusHide)}>
                        {bonusHide ? 'Show' : 'Hide'}
                    </button>
                </div>

                {!bonusHide &&
                    Object.keys(tileInfo.bonusTiles).map((key) => (
                        <div className='tile-widget' key={key}>
                            <div className='tile-widget-main'>
                                <h3>{key}</h3>
                                <img className='bonus-tile-img' src={tileInfo.bonusTiles[key].img} alt={key} />
                            </div>
                            <p>{tileInfo.bonusTiles[key].info}</p>
                        </div>
                    ))}
            </div>


            <div className='tile-container'>
                <div className='tile-container-header'>
                    <h2>Favor Tile Information</h2>
                    <button onClick={() => setFavorHide(!favorHide)}>
                        {favorHide ? 'Show' : 'Hide'}
                    </button>
                </div>

                {!favorHide &&
                    Object.keys(tileInfo.favorTiles).map((key) => (
                        <div className='tile-widget' key={key}>
                            <div className='tile-widget-main'>
                                <h3>{key}</h3>
                                <img className='tile-widget-img-normal' src={tileInfo.favorTiles[key].img} alt={key} />
                            </div>
                            <p>{tileInfo.favorTiles[key].info}</p>
                        </div>
                    ))}
            </div>


            <div className='tile-container'>
                <div className='tile-container-header'>
                    <h2>Town Tile Information</h2>
                    <button onClick={() => setTownHide(!townHide)}>
                        {townHide ? 'Show' : 'Hide'}
                    </button>
                </div>

                {!townHide &&
                    Object.keys(tileInfo.townTiles).map((key) => (
                        <div className='tile-widget' key={key}>
                            <div className='tile-widget-main'>
                                <h3>{key}</h3>
                                <img className='tile-widget-img-normal' src={tileInfo.townTiles[key].img} alt={key} />
                            </div>
                            <p>{tileInfo.townTiles[key].info}</p>
                        </div>
                    ))}
            </div>



        </div >
    );
}

export default LegendPage;
