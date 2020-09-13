import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MainScreen from './components/mainScreen';
import AllChart from './components/allchart'
import TitleBar from './components/appBar'

function App() {
  return (
    <Router>
    <div className="App">
    <TitleBar />
      <Switch>
      <Route exact path='/' component={MainScreen} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
