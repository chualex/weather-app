import { useState, useEffect } from 'react'
import Search from './Components/Search'
import Header from './Components/Header'
import Weather from './Components/Weather'
import SavedLocations from './Components/SavedLocations'

const key = "8f8f00bfd7694b9aa32230155210512"
const defaultSearch = "80234"

const App = () => {
  // Load weather 
  useEffect(() => {

      getCurrnetWeather(key, defaultSearch)
  }, [])

    // Get weather from API
    const getCurrnetWeather = async (key, searchInput) => {
      const weather = await fetchWeather(key, searchInput, "no")
      updateCurrentWeather(weather)
    }

  // Update current weather UI
  const updateCurrentWeather = (weather) => {
    try {
      console.log(weather)
      setCurrentWeather(weather.current)
      setCurrentLocation(weather.location)
    }
    catch(e) {
      console.log(e)
    }

  }
  //fetch weather 
  const fetchWeather = async (key, searchParam, aqi) => {
    var url = new URL('http://api.weatherapi.com/v1/current.json')
    var params = {
      key: key,
      q: searchParam,
      aqi: aqi
    }
    url.search = new URLSearchParams(params).toString()
    const data = await fetch(url).then(response => {
      console.log(response)        
      if (response.ok) {
          return response.json();
        } else {
           throw Error('Something went wrong ...');
        }
   })
   .catch(error => {
     console.log("Error")
    console.log(error)})

    //const data = await res.json()

    return data
  }

  // Set current weather
  const [currentLocation, setCurrentLocation] = useState(
    {
        name: "",
        region: ""
    }
  )

  // Set current weather
  const [currentWeather, setCurrentWeather] = useState(
    {
        temp_f: 100,
        temp_c: 0
    }
  )

  // Set saved locations
  const [savedLocations, setSavedLocations] = useState(
    [
      {
        id: 1,
        name: "Denver",
        region: "Colorado"
      },
      {
        id: 2,
        name: "Pasadena",
        region: "California"
      }
    ]
  )

  // Save Location
  const saveLocation = () => {
    var sameLocations = savedLocations.filter(location => location.name.toLocaleLowerCase() === currentLocation.name.toLocaleLowerCase() && location.region.toLocaleLowerCase() === currentLocation.region.toLocaleLowerCase())
    console.log(sameLocations)
    if (sameLocations.length > 0) {
      console.log("already saved")
      return
    }
    const newLocation = {
      id: currentLocation.lat,
      name: currentLocation.name,
      region: currentLocation.region
    }
    console.log("Save pressed")

    console.log(newLocation)
    setSavedLocations([...savedLocations, newLocation])
  }

  const loadCurrentWeather = (location) => {
    console.log(location.name)
    const locationStr = location.name.toString() + ', ' + location.region.toString()
    getCurrnetWeather(key, locationStr)
  }

  const search = (searchInput) => {
    console.log(searchInput)
    getCurrnetWeather(key, searchInput.toString())
  }

  return (
    <div className='row'>
      <div className='saved-locations-container'>
        <SavedLocations locations={savedLocations} onSaveLocationClcked={loadCurrentWeather} />
      </div>
      <div className="container">
        <Search onSearch={search} />
        <Header location={currentLocation}/>  
        <Weather currentWeather={currentWeather} onSaveLocation={saveLocation} />
      </div>
    </div>

  )
}

export default App;
