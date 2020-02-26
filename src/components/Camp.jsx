import React, { Component } from "react";
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table
} from "reactstrap";

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

  let fav = <button type="radio" name={`fav${facilityName}`} />;
  console.log("camp here::::", camp);
  // if(star.isFav){
  //     star = solidStar
  // } else {
  //     star = regStar
  // }

  // let FavIcon;
  // if (isFav) FavIcon = (<span className="favIcon"><FAIcon onClick={() => favClicked(id)} icon={solidStar} style={{ color: 'steelblue' }} /></span>);
  // else FavIcon = (<span className="favIcon"><FAIcon onClick={() => favClicked(id)} icon={regStar} /></span>);


    // let FavIcon;
    // if (isFav) FavIcon = (<span className="favIcon"><FAIcon onClick={() => favClicked(id)} icon={solidStar} style={{ color: 'steelblue' }} /></span>);
    // else FavIcon = (<span className="favIcon"><FAIcon onClick={() => favClicked(id)} icon={regStar} /></span>);

    return (
        // <ReactFragment className="CampFrag">
            <tr className="CampRow">
                <td><strong>{facilityName}</strong></td>
                <td><strong>{sitesWithPetsAllowed}</strong></td>
                <td><strong>{sitesWithSewerHookup}</strong></td>
                <td><strong>{sitesWithWaterHookup}</strong></td>
                <td><strong>{sitesWithWaterFront}</strong></td>
                <td id="longitude"><strong>{longitude}</strong></td>
                <td id="latitude" value={latitude}><strong>{latitude}</strong></td>
                <td className="fav"><strong>{fav}</strong></td>
                <td><button className="fav" onClick={()=>props.getWeather(latitude, longitude)}
                >Get Weather</button></td>
            </tr>
        // </ReactFragment>
    )

};

export default Camp;
