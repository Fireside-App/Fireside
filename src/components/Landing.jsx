
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Favorite } from './Favorite';


/* The Landing page is the page our users are presented with on login or signup. Here, we 
meant to render our current favorites in cards that might provide additional details for the campsites 
our users have favorited as well as a button that takes them to our Query page in Query.jsx in order to find 
potential campgrounds via the Active API. */

const landing = props => {
  const { hasFavs } = props;
  const [favs, setFavs] = useState([]);
  const [gotData, setGotData] = useState(false); // prevent re-running of useEffect
  let userId; //capture userId here from state for fetch below

  useEffect(() => {
    // upon load, the landing page will query back end for a specific users fav camps
    // if hasFavs was not defined during login from the App component, nothing will be queried
    if (hasFavs) {
      if (gotData === false) {
        // this boolean prevents the query from running more than once
        fetch('/user/favorites/1') //update 1 to userId dynamically later
          .then(res => res.json())
          .then(data => {
            setGotData(true);
            setFavs(data.user);
          })
          .catch(error => console.log('useEffect error:', error));
      }
    }
  }, []); // empty array keeps useEffect from running indefinitely, useEffect runs whenever favs is updated


  // create array of Favorite components for every favorite returned from query into favs state
  const favoriteComponents = favs.map((favorite, idx) => {
    return <Favorite data={favorite} key={idx} />;
  });

  return (
    <div className='Landing' style={{ textAlign: 'center' }}>
      <h1>fireside</h1>
      <Link to='/camp'>
        <Button color='primary'>Find Camps</Button>
      </Link>
      {gotData ? <h3 className='favsHeader'>Your Favorites</h3> : ''}
      <div>{favoriteComponents}</div>
    </div>
  );
};

export default landing;
