import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav.jsx';
import Home from './home.jsx';
import Footer from './footer.jsx';
import Info from './info.jsx';
import Team from './team.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="main">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route exact path="/info" component={Info} />
          <Route exact path="/team" component={Team} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;