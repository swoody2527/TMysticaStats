import React, { useState } from 'react'
import '../reusable/reusableCSS/FactionsFilter.css'

function FactionsFilter() {
    const [isExpanded, setIsExpanded] = useState(true)

    const handleFilterToggle = () => {
        setIsExpanded(prev => !prev)
    }

    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
        2021, 2022, 2023, 2024, 2025
    ]

    const factions = ['Witches', 'Auren', 'Dwarves', 'Chaos Magicians', 'Nomads']

    const num_players = [2, 3, 4, 5, 6]

    const filters = [
        {
            label: 'Start Year',
            options: years,
            class: 'filter-option'
        },
        {
            label: 'End Year',
            options: years,
            class: 'filter-option'
        },
        {
            label: 'Faction',
            options: factions,
            class: 'filter-option faction-filter'
        },
        {
            label: 'No. Players',
            options: num_players,
            class: 'filter-option'
        }
    ]

    return (
        <div className={`filter-container ${isExpanded ? 'filter-container-expanded' : 'filter-container-banner'}`}>
            {!isExpanded && (
                <button onClick={handleFilterToggle}>Filters</button>
            )}

            {isExpanded && (
                <>
                    <div className='filter-options-container'>
                        {filters.map((filter, index) => (
                            <div className={filter.class} key={index}>
                                <p>{filter.label}</p>
                                <select className="option-select">
                                    {filter.options.map((opt, i) => (
                                        <option key={i}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                    </div>
                    <button className='apply-btn'>Apply</button>
                    <button className='close-search' onClick={handleFilterToggle}><div className='arrow up'></div></button>
                </>
            )}
        </div>
    )
}

export default FactionsFilter
