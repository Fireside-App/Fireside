import React, { Component } from 'react';
import axios from 'axios';
import Query from './components/Query.jsx';
import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import Results from './components/Results.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import { Button } from 'reactstrap';

import './components/stylesheet.css';

const parseString = require('xml2js').parseString;

class App extends Component {
  constructor(props) {
    super(props);

    /* The first 5 keys within state here handle our dynamic API query on our Query page
    These get flipped on calling onChange methods on the radio buttons that get rendered in Query.
    
    queriedGrounds holds the result of submitting a fetch request to the active API
    
    queried, hasFavs, loggedIn, and signedUp all handle logic to dynamically render our website from 
    action. For example, when a user logs in, loggedIn gets set to true via setState. This triggers a re-render
    of our page and a re-evaluation of the logic in our render(). Please reference the render() to view how
    we are handlimng dynamic rendering.

    hasFavs is used to dynamically render favorites in Landing.jsx. when hasFavs is truthy, favsHeader and favs will render. 
    The logic to give favs cards that represent our favorites still needs to be fleshed out.
    
    userId is meant to hold our userId in order to submit a POST request on adding favorites. We wanted to get
    userId back from the back-end upon signing up or logging and subsequently prop drill userId down to Results.jsx
    in order to submit a POST request from there to our backend that triggered an addition of favs to the server. userID 
    should be able to be passed back from the backend via res.send(res.locals).
    */

    this.state = {
      pet: false,
      state: '',
      sewerHook: false,
      waterHook: false,
      waterFront: false,

      queriedGrounds: [],
      queried: false,
      hasFavs: true, // default value should be false
      loggedIn: false,
      signedUp: false,
      userId: -1
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.petOnChange = this.petOnChange.bind(this);
    this.waterHookOnChange = this.waterHookOnChange.bind(this);
    this.sewerHookOnChange = this.sewerHookOnChange.bind(this);
    this.waterFrontOnChange = this.waterFrontOnChange.bind(this);
    this.stateOnChange = this.stateOnChange.bind(this);
    this.query = this.query.bind(this);
  }

  componentDidMount() {
    console.log('mounted');
  }

  // setShowModal(e) {
  //   this.setState({showModal: true})
  // }

  signup(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const user = e.target.username.value;
    const pass = e.target.password.value;
    console.log('entered signup');
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        username: user,
        password: pass
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          const newState = Object.assign({}, this.state);
          newState.signedUp = true;
          this.setState(newState);
          console.log(this.state.signedUp);
          console.log('signup complete');
        }
      });
  }

  login(e) {
    e.preventDefault();
    const user = e.target.email.value;
    const pass = e.target.password.value;

    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    })
      .then(res => res.json())
      .then(data => {
        // if password doesnt match db, reload login (root '/') directory
        if (data.badPassword) {
          window.location.reload();
          return;
        }

        if (data) {
          const newState = Object.assign({}, this.state);
          newState.loggedIn = true;
          this.setState(newState);
        }
      })
      .catch(error => console.log(error));
  }

  query(e) {
    e.preventDefault();
    fetch('/camp/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        state: this.state.state,
        pet: this.state.pet,
        waterFront: this.state.waterFront,
        waterHook: this.state.waterHook,
        sewerHook: this.state.sewerHook
      })
    })
      .then(res => res.json())
      .then(data => {
        const newState = Object.assign({}, this.state);
        newState.queriedGrounds = data;
        newState.queried = true;
        // console.log(newState);
        this.setState(newState);
      });
  }

  //the following functions could probably be combined somehow to make DRYer code.
  stateOnChange(e) {
    console.log('stateOnChange called');
    const newState = Object.assign({}, this.state);
    newState.state = e.target.value;
    this.setState(newState);
  }

  petOnChange() {
    console.log('petOnChange called');
    if (this.state.pet === false) {
      const newState = Object.assign({}, this.state);
      newState.pet = true;
      this.setState(newState);
    } else {
      const newState = Object.assign({}, this.state);
      newState.pet = false;
      this.setState(newState);
    }
  }

  sewerHookOnChange() {
    console.log('sewerHookOnChange called');
    if (this.state.sewerHook === false) {
      const newState = Object.assign({}, this.state);
      newState.sewerHook = true;
      this.setState(newState);
    } else {
      const newState = Object.assign({}, this.state);
      newState.sewerHook = false;
      this.setState(newState);
    }
  }

  waterHookOnChange() {
    console.log('waterHookOnChange called');
    if (this.state.waterHook === false) {
      const newState = Object.assign({}, this.state);
      newState.waterHook = true;
      this.setState(newState);
    } else {
      const newState = Object.assign({}, this.state);
      newState.waterHook = false;
      this.setState(newState);
    }
  }

  waterFrontOnChange() {
    console.log('waterFrontOnChange called');
    if (this.state.waterFront === false) {
      const newState = Object.assign({}, this.state);
      newState.waterFront = true;
      this.setState(newState);
    } else {
      const newState = Object.assign({}, this.state);
      newState.waterFront = false;
      this.setState(newState);
    }
  }

  render() {
    //variable declared for dynamic rendering of our pages based upon the results of async fetch requests
    let loggedin = this.state.loggedIn;
    let queryResponse = this.state.queried;
    let signedUp = this.state.signedUp;

    /*to explain the first route, if we are at '/' and loggedin === true, we will render our landing page. 
    However, if we are at '/' and loggedin === false. we will render our Login page. */

    return (
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            {loggedin ? (
              <Landing hasFavs={this.state.hasFavs} />
            ) : (
              <Login login={this.login} />
            )}
          </Route>
          <Route exact path='/camp'>
            {queryResponse ? (
              <Redirect to='/results' />
            ) : (
              <Query
                stateOnChange={this.stateOnChange}
                petOnChange={this.petOnChange}
                waterHookOnChange={this.waterHookOnChange}
                sewerHookOnChange={this.sewerHookOnChange}
                waterFrontOnChange={this.waterFrontOnChange}
                query={this.query}
              />
            )}
          </Route>
          <Route
            exact
            path='/results'
            render={() => (
              <Results
                queriedGrounds={this.state.queriedGrounds}
                getWeather={this.getWeather}
              />
            )}
          />
          <Route exact path='/signup'>
            {signedUp ? (
              <Landing hasFavs={this.state.hasFavs} />
            ) : (
              <Signup signup={this.signup} />
            )}
          </Route>
          <Route exact path='/landing'>
            {queryResponse ? (
              <Redirect to='/results' />
            ) : (
              <Login login={this.login} />
            )}
            render = {() => <Landing hasFavs={this.state.hasFavs} />}
          </Route>
          <Route exact path='/landing/ayypresent'>
            <Landing hasFavs={this.state.hasFavs} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
