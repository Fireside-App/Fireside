import React, { Component, useState } from 'react';
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
// import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import {
//   Container,
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormText,
//   Table
// } from 'reactstrap';
import WeatherModal from './WeatherModal.jsx';

/*
As mentioned in Results.jsx, the major work in Camp.jsx that needs to be done includes creating a function
in App.jsx that can add each of our favorites to an array in state. 
*/

const Camp = props => {
  const { camp } = props;
  const {
    facilityName,
    latitude,
    longitude,
    sitesWithPetsAllowed,
    sitesWithSewerHookup,
    sitesWithWaterHookup,
    sitesWithWaterFront,
    state
  } = camp;

  const [showModal, setShow] = useState(false);

  const addFav = () => {
    const body = {
      name: facilityName,
      pets: sitesWithPetsAllowed,
      sewer: sitesWithSewerHookup,
      water: sitesWithWaterHookup,
      waterfront: sitesWithWaterFront,
      long: longitude,
      lat: latitude,
      user_id: props.userId
    };

    fetch('/user/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => console.log('added fave to DB'))
      .catch(error => console.log(error));
  };

  let fav = (
    <button type='radio' onClick={e => addFav()} name={`fav${facilityName}`}>
      +
    </button>
  );

  function closeModal() {
    setShow(false);
  }

  return (
    <tr className='CampRow'>
      <td>
        <strong>{facilityName}</strong>
      </td>
      <td>
        <strong>{sitesWithPetsAllowed}</strong>
      </td>
      <td>
        <strong>{sitesWithSewerHookup}</strong>
      </td>
      <td>
        <strong>{sitesWithWaterHookup}</strong>
      </td>
      <td>
        <strong>{sitesWithWaterFront}</strong>
      </td>
      <td id='longitude'>
        <strong>{longitude}</strong>
      </td>
      <td id='latitude' value={latitude}>
        <strong>{latitude}</strong>
      </td>
      <td className='fav'>
        <strong>{fav}</strong>
      </td>
      <td>
        <button
          // className='fav'
          onClick={e => {
            setShow(true);
          }}
        >
          Get Weather
        </button>
      </td>
      <div>
        <WeatherModal
          close={closeModal}
          showModal={showModal}
          latitude={latitude}
          longitude={longitude}
          getWeather={props.getWeather}
        />
      </div>
    </tr>
  );
};

export default Camp;

// ()=>props.getWeather(latitude, longitude)
