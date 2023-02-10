import {useState,useEffect} from 'react'
import axios from 'axios'
//473e4acc1b794bdab1295011231002

const SingleCountry = ({country,weather}) => {
  let name=country[0].name.common
  let capital=country[0].capital[0]
  let area=country[0].area
  let languages=Object.values(country[0].languages)
  let imgsrc=country[0].flags.png
  let imgalt=country[0].flags.alt
  let temp=weather.current.temp_c
  let wind=Math.round(((weather.current.wind_mph)/2.236937)*100)/100
  let weather_icon=weather.current.condition.icon
  return(
    <div>
      <h2>{name}</h2>
      <div>
        <p>capital {capital}</p>
        <p>area {area}</p>
      </div>
      <h4>languages</h4>
      <ul>
        {languages.map(language=><li>{language}</li>)}
      </ul>
      <img src={imgsrc} alt={imgalt}/>
      <h4>Weather in {capital}</h4>
      <p>temperature {temp} celsius</p>
      <img src={weather_icon}/>
      <p>wind {wind} m/s</p>
    </div>
  )
}

const Display = ({countries,check,handler,weather}) => {
  
  if(check==='between'){
    return(
      <div>
        {countries.map(country=>{
        return(
        <div>
          <p key={country.name.common}>{country.name.common}</p>
          <button onClick={handler(country.name.common)}>show</button>
        </div>
        )})
    }
        
      </div>
    )
  }
  else if(check==='more'){
  return(
    <p>too many matches, specify another filter</p>
  )}
  else if(check==='one'){
    
    return(
      <div>
        <SingleCountry country={countries} weather={weather} />
        
      </div>
    )
  }
}

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [country,setNewCountry] = useState('')
  const [countries,setCountries] = useState([])
  const [display,setDisplay] = useState('')
  const [weather,setWeather] = useState([])
  
  useEffect(()=>{
    if(countries.length>10){
      setDisplay('more')
    }
    else if(countries.length>1 && countries.length<=10){
      setDisplay('between')
    }
    else if(countries.length===1){
      
      let capital=countries[0].capital[0]
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`)
      .then(response=>{console.log(response.data);setWeather(response.data);setDisplay('one')})
      
      
    }
  },[countries.length])

  const handleCountry = (event)=>{
    event.preventDefault()
    setNewCountry(event.target.value)
    
  }

  const handleApi = (event) =>{
    event.preventDefault()
    axios.get(`https://restcountries.com/v3.1/name/${country}`)
    .then(response=>{setCountries(countries.concat(response.data))})
    setNewCountry('')
  }

  const handlerShow = (name) => () =>{
    
    
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then(response=>{setCountries(response.data)})
    
  }
  
  return (
    <div className="App">
      <form onSubmit={handleApi}>
        find countries <input value={country} onChange={handleCountry}/>
      </form>
      <Display countries={countries} check={display} handler={handlerShow} weather={weather} />
      
    </div>
  );
}

export default App;
