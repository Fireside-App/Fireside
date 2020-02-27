import React, { useState, useEffect } from "react";
import Day from "./Day.jsx"
import {Modal} from 'react-bootstrap';

const WeatherModal = (props)  =>  {
    if(!props.showModal)    {
        return null;
    }
    const [highs, setHighs] = useState([])
    const [lows, setLows] = useState([])
    const [rain, setRain] = useState([])
      useEffect(()=>{
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6de6c91d1869c981b49f8ffa13fcd509/${props.latitude},${props.longitude}?exclude=currently,minutely,hourly,alerts,flags`)
        .then(res => res.json())
        .then(data => {
          const days = data.daily.data;
          const highTemp = [];
          const lowTemp = [];
          const chanceOfRain = [];
          days.forEach(function(el) {
            highTemp.push(el.temperatureHigh);
            lowTemp.push(el.temperatureLow);
            chanceOfRain.push(el.precipProbability)
          })
          setHighs(highTemp)
          setLows(lowTemp) 
          setRain(chanceOfRain)
          console.log(">>>>>>>>", highs, lows, rain)
        }, []);
      })
      const weatherDays =[]
      for(let i = 0; i<7; i++){
        weatherDays.push(<Day high={highs[i]} low={lows[i]} chance={rain[i]}/>)
      }
    return (<Modal show={props.showModal} onRequestClose={props.close}><button onClick={props.close}>Close</button>
        {weatherDays}</Modal>)
}

export default WeatherModal;