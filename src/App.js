import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  const click = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  };

  var dia = new Date();
  
  var dias = new Array(
    ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado' ]
  );

  var meses = new Array (
    ['Janeiro', 'Fevereiro', 'Março' , 'Abril', 'Maio', 'Junho', 'Julho' , 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  );

  const hday  = dia.getDate();
  const day   = dias[0][dia.getDay()];
  const mes   = meses[0][dia.getMonth()];
  const year  = dia.getFullYear();

  const nublado = 'url(https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)';

  return (
    <>  
    <div className="container">
      
      <div className="weather-side" style={{backgroundImage: nublado }}>
        <div className="weather-gradient"></div>
        <div className="date-container">
          <h2 className="date-dayname">{day}</h2>
          <span className="date-day"> { hday} {mes} {year} </span>
          { weather && 
            <>
              <i className="location-icon" data-feather="map-pin"></i><span className="location">{weather.name}, {weather.sys.country}</span>
            </>
          }
        </div>
        <div className="weather-container">
          <i className="weather-icon" data-feather="sun"></i>
          { weather && 
            <>
              <h1 className="weather-temp">{parseInt(weather.main.temp)}°C</h1>
              <h3 className="weather-desc">{weather.weather[0].description}</h3>

              </>
            }
        </div>
      </div>
      <div className="info-side">
        <div className="today-info-container">
          <div className="today-info">
            <div className="precipitation">
              <span className="title">CHANCE DE CHUVA</span><span className="value">
                 0 %
              </span>
              <div className="clear"></div>
            </div>
            <div className="humidity">

                <span className="title"> UMIDADE</span><span className="value">{ weather && <>{weather.main.humidity} </>} % </span> 

              <div className="clear"></div>
            </div>
            <div className="wind">
              <span className="title">VENTO</span><span className="value"> {weather && <>{weather.wind.speed} </>} km/h</span>
              <div className="clear"></div>
            </div>
          </div>
        </div>
        <div className="week-container">
          <ul className="week-list">
            <li className="active"><i className="day-icon" data-feather="sun"></i><span className="day-name">Dom</span><span className="day-temp">29°C</span></li>
            <li><i className="day-icon" data-feather="cloud"></i><span className="day-name">Seg</span><span className="day-temp">21°C</span></li>
            <li><i className="day-icon" data-feather="cloud-snow"></i><span className="day-name">Ter</span><span className="day-temp">08°C</span></li>
            <li><i className="day-icon" data-feather="cloud-rain"></i><span className="day-name">Qua</span><span className="day-temp">19°C</span></li>
            <div className="clear"></div>
          </ul>
        </div>
        <div className="location-container">
          <button onClick={click} className="location-button"> <i data-feather="map-pin"></i><span>Trocar Localização </span></button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
