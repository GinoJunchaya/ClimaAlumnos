import React, { Component } from 'react';
import Clima from './components/Clima';

class App extends Component {
  render() {
    return (
      <div style={{height: "100%", display: "flex"}}>
        <Clima/>        
      </div>
    );
  }
}

export default App;
