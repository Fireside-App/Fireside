import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";

import "./day.css";

const Day = props => {
  return (
    <div className="weather">
      <Card
        body
        inverse
        style={{ backgroundColor: "#333", borderColor: "#333" }}
      >
        <CardTitle>Weather for {props.day}</CardTitle>
        <CardText>
          <div>High Of: {props.high} Degrees</div>
          <div>Low of: {props.low} Degrees</div>
          <div>Chance 0f Rain: {props.chance}%</div>
        </CardText>
      </Card>
    </div>
  );
};
export default Day;
