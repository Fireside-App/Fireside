import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Login = props => {
  const { login } = props;
  return (
    <div className='Login'>
      <Form className='Form' onSubmit={login}>
        <FormGroup>
          <Label for='text' hidden>
            username
          </Label>
          <Input
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            bsSize='large'
          />
        </FormGroup>
        <FormGroup>
          <Label for='password' hidden>
            Password
          </Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            bsSize='large'
          />
        </FormGroup>
        <div className='login-btns'>
          <Button bssize='lg' outline color='primary'>
            Explore
          </Button>
          <Button bssize='lg' outline color='primary'>
            <Link to='/signup'>Sign Up</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
