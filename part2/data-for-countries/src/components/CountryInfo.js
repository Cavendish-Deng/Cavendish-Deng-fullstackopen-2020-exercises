import React from 'react'

const CountryInfo = ({ country, weather }) => {
    console.log('weather',weather)
    return (
        <div>
            <h1>{ country.name }</h1>
            <p>capital: { country.capital }</p>
            <p>population: { country.population }</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((lang, index) => <li key={index} >{ lang.name }</li>)}
            </ul>
            <img 
                src = {country.flag} alt=""
                style = {{width: "300px", height: "200px"}} 
            />
            <h2>Weather in {weather[0].location.name}</h2>
            <div>
                <span style={{fontWeight: "bold"}}>temperature: </span>
                <span>{ weather[0].current.temperature }</span>
            </div>
            <img src={weather[0].current.weather_icons[0]} alt=""></img>
            <div>
                <span style={{fontWeight: "bold"}}>wind: </span>
                <span>{ weather[0].current.wind } { weather[0].current.wind_speed } direction { weather[0].current.wind_dir } </span>
            </div>
        </div>
    )
}

export default CountryInfo