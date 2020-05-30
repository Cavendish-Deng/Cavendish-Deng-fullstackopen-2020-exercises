import React from 'react'
import Prompt from './Prompt'
import CountryInfo from './CountryInfo'

const List = ({ countries, handleShow, weather, accessKey }) => {
    if (countries.length > 10) {
        return (
            <div>
                <Prompt />
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <CountryInfo country={countries[0]} weather={weather} />
        )
    } else if (countries.length > 0 && countries.length <= 10) {
        return (
            <div>
                {countries.map( (country, index) => 
                    <div key={ country.numericCode }>
                        <span> { country.name } </span>
                        <button onClick={() => handleShow(index, {access_key: accessKey, query: country.capital})}>
                            show
                        </button>
                    </div>
                )}
            </div>
        )
    }

}

export default List