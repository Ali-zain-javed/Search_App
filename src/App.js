import React, { Component } from 'react';
import './App.css';
import MainComponent from './Components/MainComponent.js'
function App() {
  /**
 *For starting App is main entry point
 *MainComponent is like container for manage the the search and results component
 */
  return (
    <div className="App">
      <MainComponent />
    </div>
  );
}

export default App;
