import React, { useState } from 'react'
import '../reusable/reusableCSS/FactionsFilter.css'
import factionImages from '../../assets/faction-images/factionImages'
import factionColors from '../../assets/factionColours';

function FactionsFilter({ onSubmit, initialValues = {}, availableFilters = {}, optionalFilters = {} }) {
    const [isExpanded, setIsExpanded] = useState(() => {
        const hasInitial =
            initialValues?.faction || initialValues?.startYear || initialValues?.endYear || initialValues?.numPlayers || initialValues?.mapID;
        return !hasInitial;
    })

    const {
        showFaction = false,
        showYears = false,
        showNumPlayers = false,
        showMaps = false,
    } = availableFilters

    const {
        optFaction = false,
        optMap = false,
        optNumPlayers = false,
    } = optionalFilters


    const [startYear, setStartYear] = useState(initialValues.startYear || 2013);
    const [endYear, setEndYear] = useState(initialValues.endYear || 2025);
    const [selectedFaction, setSelectedFaction] = useState(initialValues.faction || 'dwarves');
    const [numPlayers, setNumPlayers] = useState(initialValues.numPlayers || 'Any');
    const [mapID, setMapID] = useState(initialValues.mapID || '126fe960806d587c78546b30f1a90853b1ada468')

    const handleFilterToggle = () => {
        setIsExpanded(prev => !prev)
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        let data = {
            faction: selectedFaction,
            yearRange: [startYear, endYear],
            numPlayers: numPlayers,
            mapID: mapID
        }
        setIsExpanded(false)
        onSubmit(data)
    }

    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
        2021, 2022, 2023, 2024, 2025
    ]

    const map_keys = {
        'Original': '126fe960806d587c78546b30f1a90853b1ada468',
        'Original [2017 vp]': '91645cdb135773c2a7a50e5ca9cb18af54c664c4',
        'Fire & Ice v1': '95a66999127893f5925a5f591d54f8bcb9a670e6',
        'Fire & Ice v2': 'be8f6ebf549404d015547152d5f2a1906ae8dd90',
        'Loon Lakes v1.6': 'fdb13a13cd48b7a3c3525f27e4628ff6905aa5b1',
        'Fjords v2.1': '2afadc63f4d81e850b7c16fb21a1dcd29658c392'
    }

    const factions = [
        "Alchemists", "Auren", "Chaos Magicians", "Cultists", "Darklings", "Dwarves",
        "Engineers", "Fakirs", "Giants", "Halflings", "Mermaids", "Nomads",
        "Swarmlings", "Witches", "Yetis", "Ice Maidens", "Acolytes",
        "Dragonlords", "Riverwalkers", "Shapeshifters"
    ]

    const factions_new = [
        { faction: 'Alchemists', color: '#6f00ff' },
        { faction: 'Auren', color: '#007f0e' },
        { faction: 'Chaos Magicians', color: '#b30000' },
        { faction: 'Cultists', color: '#6f00ff' },
        { faction: 'Darklings', color: '#6f00ff' },
        { faction: 'Dwarves', color: '#8c8c8c' },
        { faction: 'Engineers', color: '#8c8c8c' },
        { faction: 'Fakirs', color: '#e6ac00' },
        { faction: 'Giants', color: '#b30000' },
        { faction: 'Halflings', color: '#a87000' },
        { faction: 'Mermaids', color: '#0099ff' },
        { faction: 'Nomads', color: '#e6ac00' },
        { faction: 'Swarmlings', color: '#0099ff' },
        { faction: 'Witches', color: '#007f0e' },
        { faction: 'Yetis', color: '#00ccff' },
        { faction: 'Ice Maidens', color: '#00ccff' },
        { faction: 'Acolytes', color: '#6f00ff' },
        { faction: 'Dragonlords', color: '#b30000' },
        { faction: 'Riverwalkers', color: '#0099ff' },
        { faction: 'Shapeshifters', color: '#a87000' }
    ];



    const num_players = ['Any', 2, 3, 4, 5, 6]


    return (
        <div className={`filter-container ${isExpanded ? 'filter-container-expanded' : 'filter-container-banner'}`}>
            {!isExpanded && (
                <div className='arrow down' onClick={handleFilterToggle}></div>
            )}

            {isExpanded && (
                <>
                    <form onSubmit={handleFilterSubmit} className='filter-options-container'>
                        {showYears ?
                            <div className='filter-option'>
                                <label>Time Range</label>
                                <div className='filter-selections'>
                                    <select
                                        className="option-select"
                                        value={startYear}
                                        onChange={(e) => setStartYear(e.target.value)}
                                    >
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>

                                    <p>to</p>

                                    <select
                                        className="option-select"
                                        value={endYear}
                                        onChange={(e) => setEndYear(e.target.value)}
                                        disabled={!startYear}
                                    >
                                        {years
                                            .filter((year) => !startYear || year >= startYear)
                                            .map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            : null}


                        {showFaction ?
                            <div className='filter-option faction'>
                                <label>Faction</label>
                                <div className='faction-carousel'>
                                    {optFaction ?
                                        <div onClick={() => setSelectedFaction('any')} className={`faction-widget ${selectedFaction == 'any' ? 'selected' : ''}`}>
                                            <p>Any</p>
                                        </div>
                                        : null}
                                    {factions_new.map((faction, index) => {
                                        const isSelected = selectedFaction == faction.faction

                                        return (
                                            <div key={index} className={`faction-widget ${isSelected ? 'selected' : ''}`} style={{ backgroundColor: faction.color }}
                                                onClick={() => setSelectedFaction(faction.faction)}>
                                                <p>{faction.faction}</p>
                                                <img src={factionImages[faction.faction.split(' ').join('')]} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            : null}

                        {showNumPlayers ?
                            <div className='filter-option'>
                                <label>No. Players</label>
                                <div className='filter-selections'>
                                    <select value={numPlayers} onChange={(e) => setNumPlayers(e.target.value)} className="option-select">
                                        {num_players.map((num, index) => (
                                            <option key={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            : null}

                        {showMaps ?
                            <div className='filter-option'>
                                <label>Map</label>
                                <div className='filter-selections'>
                                    <select value={mapID} onChange={(e) => setMapID(e.target.value)} className='option-select map-filter'>
                                        {optMap ? <option>Any</option> : null}
                                        {Object.keys(map_keys).map((map_name, index) => (
                                            <option value={map_keys[map_name]}>{map_name}</option>

                                        ))}

                                    </select>

                                </div>

                            </div>




                            : null}



                        <button className='apply-btn' type='submit'>Apply</button>
                    </form>
                    <button className='close-search' onClick={handleFilterToggle}><div className='arrow up'></div></button>
                </>
            )}
        </div>
    )
}

export default FactionsFilter
