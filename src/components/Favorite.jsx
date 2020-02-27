import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export const Favorite = props => {
  return (
    <>
      <Card
        body
        inverse
        style={{
          display: 'inline-block',
          backgroundColor: '#333',
          borderColor: '#333',
          textAlign: 'center',
          margin: '10px',
          boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)'
        }}
      >
        <CardTitle>{props.data.name}</CardTitle>
        <CardText>Pets Allowed? {props.data.pets}</CardText>
        <CardText>Sewer Hookup? {props.data.sewer}</CardText>
        <CardText>Water Hookup? {props.data.water}</CardText>
        <CardText>Waterfront? {props.data.waterfront}</CardText>
        <div className='removeFavBtn'>Remove</div>
      </Card>
    </>
  );
};
