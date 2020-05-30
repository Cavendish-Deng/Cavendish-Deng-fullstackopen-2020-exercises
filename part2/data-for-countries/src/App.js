import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import List from './components/List'

const App = () => {
  const [countries, setContries] = useState([])
  const [countriesShown, setCountriesShown] = useState([])
  const [weather, setWeather] = useState([])
  const accessKey= process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setContries(res.data)
      })
  }, [])


  const getWeather = async (params) =>
    await axios.get('http://api.weatherstack.com/current', { params })

  const showCountryInfo = (id, params) => {
    getWeather(params)
      .then((res) => {
        setWeather([].concat(res.data));
        setCountriesShown([].concat(countriesShown[id]));
      })
  }

  const handleShowChange = async (event) => {
    if (event.target.value) {

      let showCountry = countries.filter(country =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      // if just only one country, then request for it's weather data
      if (showCountry.length === 1) {
        const params = {
          access_key: accessKey,
          query: showCountry[0].capital
        }
        const result = await getWeather(params)
        setWeather([].concat(result.data));
      }
      setCountriesShown(showCountry)
    } else {
      setCountriesShown([])
    }
  }

  return (
    <div>
      <Filter handleShowChange={handleShowChange} />
      {
        countriesShown.length === 0
          ? ''
          : <List countries={countriesShown} 
                  handleShow={showCountryInfo} 
                  weather={weather} 
                  accessKey={accessKey}
            />
      }
    </div>
  )
}

export default App;
