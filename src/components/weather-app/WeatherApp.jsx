import './weatherApp.css'
import rainy_icon from '../assets/rain.png'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import { useEffect, useState } from 'react'
import { Loader } from './Loader'

export function WeatherApp(){
    const [searchItem, setSearchItem]=useState("Kaduna")
    const [sky, setSky]=useState("")
    const [humidity, setHumidity]=useState("")
    const [wind, setWind] = useState("")
    const [temperature, setTemperature] = useState("")
    const [city, setCity] = useState("")
    const [pressure, setPresure] = useState("")
    const [wicon, setWicon] = useState("cloud")
    const [searchInput, setSearchInput] = useState("")
    const now = new Date()
    const date = now.toLocaleString()
    const time = now.toTimeString()
    
    useEffect(() => {
        search(searchItem)
    }, [searchItem])


    let api_key = "db8ce51ef2b294fb644e7e702e3ef042"

    function setVar(stateFunction, stateValue){
        stateFunction(() => {
            return stateValue
        })
    }

    function asignSearchItem(){
        setVar(setSearchItem, searchInput)
        // setSearchInput("")
    }

    async function search (city){
        
        if(city === ""){
            console.log("search item is empty")
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`

        if(searchItem === ""){
            return 0
        }

        let response = await fetch(url);
        let data = await response.json();

        setVar(setCity, data.name)
        setVar(setHumidity, data.main.humidity)
        setVar(setSky, data.weather[0].description)
        setVar(setTemperature, Math.floor(data.main.temp))
        setVar(setWind, Math.floor(data.wind.speed))
        setVar(setPresure, data.main.pressure)

        if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
            setVar(setWicon, clear_icon)
        }
        else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
            setVar(setWicon, cloud_icon)
        }
        else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
            setVar(setWicon, drizzle_icon)
        }
        else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
            setVar(setWicon, drizzle_icon)
        }
        else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
            setVar(setWicon, rainy_icon)
        }
        else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
            setVar(setWicon, rainy_icon)
        }
        else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
            setVar(setWicon, cloud_icon)
        }
        else {
            setVar(setWicon, clear_icon)
        }

        console.log(data)

        setSearchItem("")
        setSearchInput("")
        
    }



    return <>

        <div className="main-app">
            <div className="weather-section">
                <div className="weather">
                    <div className="company">the.weather</div>
                    { 
                        searchItem !=="" ? 
                        <div className="city-temperature"><Loader /></div> :
                        <div className="city-temperature">
                            <div className="temperature">{temperature}°C</div>
                            <div className="city-icon">
                                <div>
                                    
                                    <div className="city">{city}</div>
                                    <div className="datetime">{date}</div>
                                </div>
                                <div className="icon">
                                    <div className="image">
                                        <img src={wicon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
            <div className="weather-details-section">
                <div className="search-section">
                    <div className="search-form">
                        <input type="text" value={searchInput} onChange={e => {setSearchInput(e.target.value)}} name="" placeholder='Enter City' id="" />
                    </div>
                    <div className="button" onClick={() => asignSearchItem()}>
                        <span><img src={search_icon} alt="" /></span>
                    </div>
                </div>

                <div className='weather-det'>
                    

                    <div className="default-cities">
                        <div className="def-city" onClick={() => setVar(setSearchItem("Kaduna"))} >Kaduna</div>
                        <div className="def-city" onClick={() => setVar(setSearchItem("Abuja"))}>Abuja</div>
                        <div className="def-city" onClick={() => setVar(setSearchItem("Lagos"))}>Lagos</div>
                        <div className="def-city" onClick={() => setVar(setSearchItem("Kano"))}>Kano</div>
                    </div>

                    <div className="divider"></div>

                    { 
                        searchItem ?
                        <div className="weather-details"><Loader /></div> :
                        
                        <div className="weather-details">
                        <div className="detail-title">Weather Details</div>
                        <div className="detail">
                            <div className="detail-name">Cloud</div>
                            <div className="detail-value">{sky}</div>
                        </div>
                        <div className="detail">
                            <div className="detail-name">Humidity</div>
                            <div className="detail-value">{humidity}%</div>
                        </div>
                        <div className="detail">
                            <div className="detail-name">Wind</div>
                            <div className="detail-value">{wind} Km/h</div>
                        </div>
                        <div className="detail">
                            <div className="detail-name">pressure</div>
                            <div className="detail-value">{pressure} N/m2</div>
                        </div>
                    </div>
                    }

                    

                    <div className="divider"></div>
                </div>
            </div>
        </div>
    
    </>
}