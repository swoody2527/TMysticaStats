import React, { useState } from 'react'
import '../reusable/reusableCSS/FactionsFilter.css'
import factionImages from '../../assets/faction-images/factionImages'

function FactionsFilter({ onSubmit }) {
    const [isExpanded, setIsExpanded] = useState(true)
    const [startYear, setStartYear] = useState('')
    const [endYear, setEndYear] = useState('')
    const [selectedFaction, setSelectedFaction] = useState('')
    const [numPlayers, setNumPlayers] = useState('')

    const handleFilterToggle = () => {
        setIsExpanded(prev => !prev)
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        let data = {
            faction: selectedFaction,
            yearRange: [startYear, endYear],
            numPlayers: numPlayers
        }
        setIsExpanded(false)
        onSubmit(data)
    }

    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
        2021, 2022, 2023, 2024, 2025
    ]

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

                        <div className='filter-option faction'>
                            <label>Faction</label>
                            <div className='faction-carousel'>
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
                        <div className='filter-option'>
                            <label>No. Players</label>
                            <div className='filter-selections'>
                                <select onChange={(e) => setNumPlayers(e.target.value)} className="option-select">
                                    {num_players.map((num, index) => (
                                        <option key={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </form>
                    <button className='apply-btn' onClick={handleFilterSubmit}>Apply</button>
                    <button className='close-search' onClick={handleFilterToggle}><div className='arrow up'></div></button>
                </>
            )}
        </div>
    )
}

export default FactionsFilter
