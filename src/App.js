import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import CurrencyRate from './CurrencyRate';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          exact
          component={Login}
          // render={props => { return localStorage.getItem("users") ? <Login {...props} /> : <Redirect to="/signup" /> }}
        />
        <Route path="/signup" exact component={SignUp} />
        <Route
          path="/dashboard"
          exact
          render={props => { return localStorage.getItem("users") ? <Dashboard {...props} /> : <Redirect to="/" /> }}
        />
        <Route
          path="/rate"
          exact
          render={props => { return localStorage.getItem("users") ? <CurrencyRate {...props} /> : <Redirect to="/" /> }}
        />
      </BrowserRouter>
    );
  }
}

export default App;
