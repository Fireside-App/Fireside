import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

import './day.css';

const Day = props => {
  return (
    <div className='weather'>
      <Card
        body
        inverse
        style={{ backgroundColor: '#333', borderColor: '#333' }}
      >
        <CardTitle>{props.day}</CardTitle>
        <CardText>
          <div>High: {props.high} Degrees</div>
          <div>Low: {props.low} Degrees</div>
          <div>Chance of Rain: {props.chance}%</div>
        </CardText>
      </Card>
    </div>
  );
};
export default Day;
