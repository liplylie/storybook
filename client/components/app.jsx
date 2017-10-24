import React, { Component } from 'react';

import Nav from './nav.jsx';
import Home from './home.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <Nav />
      </div>
    )
  }
}

export default App;