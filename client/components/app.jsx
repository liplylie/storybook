import React, { Component } from 'react';

import Nav from './nav.jsx';
import Home from './home.jsx';
import Footer from './footer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <Nav />
        <Home />
      </div>
    )
  }
}

export default App;