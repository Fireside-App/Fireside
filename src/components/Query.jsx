import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

/*
Our query page submits queries to the activeAPI via the route defined in server/routes/camp.js and 
the middleware defined in server/controllers/campController.js. 

Currently our api call is broken. We think it has an issue with how the API is responding since we seem 
to be building our API call correctly. We think we might have to separately query for each amenity instead of 
querying for all amenities at the same time in the way we build our apistring. 
*/

const Query = props => {
  const {
    stateOnChange,
    query,
    petOnChange,
    waterHookOnChange,
    sewerHookOnChange,
    waterFrontOnChange
  } = props;
  return (
    <div className="Query">
      <Form className="Form" onSubmit={query}>
        <FormGroup className="states">
          <Label className="header" for="stateSelect">
            <strong>Where are you headed?</strong>
          </Label>
          <Input
            type="select"
            name="select"
            id="stateSelect"
            size="1"
            className="statesDrop"
            onChange={stateOnChange}
          >
            <option>AL</option>
            <option>AK</option>
            <option>AZ</option>
            <option>AR</option>
            <option>CA</option>
            <option>CO</option>
            <option>CT</option>
            <option>DE</option>
            <option>FL</option>
            <option>GA</option>
            <option>HI</option>
            <option>ID</option>
            <option>IL</option>
            <option>IN</option>
            <option>IA</option>
            <option>KS</option>
            <option>KY</option>
            <option>LA</option>
            <option>ME</option>
            <option>MD</option>
            <option>MA</option>
            <option>MI</option>
            <option>MN</option>
            <option>MS</option>
            <option>MO</option>
            <option>MT</option>
            <option>NE</option>
            <option>NV</option>
            <option>NH</option>
            <option>NJ</option>
            <option>NM</option>
            <option>NY</option>
            <option>NC</option>
            <option>ND</option>
            <option>OH</option>
            <option>OK</option>
            <option>OR</option>
            <option>PA</option>
            <option>RI</option>
            <option>SC</option>
            <option>SD</option>
            <option>TN</option>
            <option>TX</option>
            <option>UT</option>
            <option>VT</option>
            <option>VA</option>
            <option>WA</option>
            <option>WV</option>
            <option>WI</option>
            <option>WY</option>
          </Input>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend className="header">
            <strong>What do you need?</strong>
          </legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio1"
                id="pet"
                onChange={petOnChange}
              />{" "}
              Pet friendly?
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio2"
                id="sewerHook"
                onChange={sewerHookOnChange}
              />{" "}
              Need a sewer hook-up?
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio3"
                id="waterHook"
                onChange={waterHookOnChange}
              />{" "}
              Need a water hook-up?
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="radio4"
                id="waterFront"
                onChange={waterFrontOnChange}
              />{" "}
              Waterfront?
            </Label>
          </FormGroup>
        </FormGroup>
        <Button className="QueryButton">Let's Go!</Button>
        {/* <Link to="/results"> */}
        {/* </Link> */}
      </Form>
    </div>
  );
};

export default Query;
