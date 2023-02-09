import {useState,useEffect} from 'react'
import axios from 'axios'


const SingleCountry = ({country}) => {
  let name=country[0].name.common
  let capital=country[0].capital[0]
  let area=country[0].area
  let languages=Object.values(country[0].languages)
  let imgsrc=country[0].flags.png
  let imgalt=country[0].flags.alt

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
    </div>
  )
}

const Display = ({countries,check,handler}) => {
  console.log(check)
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
    console.log(countries)
    return(
      <div>
        <SingleCountry country={countries}/>
        
      </div>
    )
  }
}

const App = () => {
  
  const [country,setNewCountry] = useState('')
  const [countries,setCountries] = useState([])
  const [display,setDisplay] = useState('')
  
  useEffect(()=>{
    if(countries.length>10){
      setDisplay('more')
    }
    else if(countries.length>1 && countries.length<=10){
      setDisplay('between')
    }
    else if(countries.length===1){
      setDisplay('one')
    }
  },[countries.length])

  const handleCountry = (event)=>{
    event.preventDefault()
    setNewCountry(event.target.value)
    console.log(country)
  }

  const handleApi = (event) =>{
    event.preventDefault()
    axios.get(`https://restcountries.com/v3.1/name/${country}`)
    .then(response=>{console.log(response.data);setCountries(response.data)})
    setNewCountry('')
  }

  const handlerShow = (name) => () =>{
    
    console.log('ppp')
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then(response=>{console.log(response.data);setCountries(response.data)})
  }
  
  return (
    <div className="App">
      <form onSubmit={handleApi}>
        find countries <input value={country} onChange={handleCountry}/>
      </form>
      <Display countries={countries} check={display} handler={handlerShow}/>
      
    </div>
  );
}

export default App;
