import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';
import Login from './components/Login.js'
import RForm from './components/RForm';
import Users from './components/Users';
import './App.scss';

function App() {

  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route path="/register" component={RForm} />
      <PrivateRoute path="/restricted/users" component={Users} />
      {/* <Route path="/restricted/users" component={Users} /> */}
    </div>
  );
}

export default App;
