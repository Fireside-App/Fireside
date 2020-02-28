import React, { Component, useState } from 'react';
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table
} from 'reactstrap';
import WeatherModal from './WeatherModal.jsx';
// import MAP modal component
import MapModal from './MapModal.jsx';

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

  const [showMapModal, setShowMapModal] = useState(false);

  let fav = <button type='radio' name={`fav${facilityName}`} />;

  function closeModal() {
    setShow(false);
  }

  function closeMapModal() {
    setShowMapModal(false);
  }
  // create a button component that will display the Map form
  return (
    // <ReactFragment className="CampFrag">
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
      {/* Deleting this from CAMP component; ADDING BTN that appears MODAL with MAP API */}
      {/* <td id="longitude">
        <strong>{longitude}</strong>
      </td>
      <td id="latitude" value={latitude}>
        <strong>{latitude}</strong>
      </td> */}
      <td>
        <button
          className='mapModal'
          onClick={e => {
            setShowMapModal(true);
          }}
        >
          Get Map
        </button>
      </td>
      <div>
        <MapModal
          show={showMapModal}
          close={closeMapModal}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
      {/* <div>
        <MapModal show={showModal} />
      </div> */}
      {/* <div>
        <MapModal />
      </div> */}
      {/* <div>
        <button>Get Map</button>
        <MapModal
          close={closeModal}
          showModal={showModal}
          // latitude={latitude}
          // longitude={longitude}
        />
      </div> */}
      <td className='fav'>
        <strong>{fav}</strong>
      </td>

      <td>
        <button
          className='fav'
          onClick={e => {
            setShow(true);
          }}
        >
          Get Weather
        </button>
      </td>
      <div>
        <WeatherModal
          showModal={showModal}
          close={closeModal}
          latitude={latitude}
          longitude={longitude}
          getWeather={props.getWeather}
        />
      </div>
    </tr>
    // </ReactFragment>
  );
};

export default Camp;

// ()=>props.getWeather(latitude, longitude)
