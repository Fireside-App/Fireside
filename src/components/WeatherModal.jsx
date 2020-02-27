import React, { useState, useEffect } from 'react';
import Day from './Day/Day.jsx';
import { Modal } from 'react-bootstrap';
import moment from 'moment-timezone';

const months_arr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'Jule',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function toTimeZone(time) {
  var date = new Date(time * 1000);
  var year = date.getFullYear();
  var month = months_arr[date.getMonth()];
  var day = date.getDate();
  return `${day} ${month} ${year}`;
}

const WeatherModal = props => {
  if (!props.showModal) {
    return null;
  }
  const [highs, setHighs] = useState([]);
  const [lows, setLows] = useState([]);
  const [rain, setRain] = useState([]);
  const [days, setDays] = useState([]);
  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6de6c91d1869c981b49f8ffa13fcd509/${props.latitude},${props.longitude}?exclude=currently,minutely,hourly,alerts,flags`
    )
      .then(res => res.json())
      .then(data => {
        const days = data.daily.data;
        const highTemp = [];
        const lowTemp = [];
        const chanceOfRain = [];
        const day = [];
        const timeZone = data.timezone;
        days.forEach(function(el) {
          highTemp.push(Math.floor(el.temperatureHigh));
          lowTemp.push(Math.floor(el.temperatureLow));
          chanceOfRain.push(el.precipProbability * 100);
          let date = toTimeZone(el.time, timeZone);
          day.push(date);
        });
        setHighs(highTemp);
        setLows(lowTemp);
        setRain(chanceOfRain);
        setDays(day);
      });
  }, []);
  const weatherDays = [];
  for (let i = 0; i < 7; i++) {
    weatherDays.push(
      <Day day={days[i]} high={highs[i]} low={lows[i]} chance={rain[i]} />
    );
  }
  return (
    <Modal show={props.showModal} onRequestClose={props.close}>
      <button onClick={props.close}>Close</button>
      {weatherDays}
    </Modal>
  );
};

export default WeatherModal;
