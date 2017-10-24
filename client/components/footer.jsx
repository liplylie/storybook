import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container" style={{marginTop: 50}}>
        <div className="row">
          <div className="col align-self-center">
            <a href="#">Privacy Policy</a>
            <a href="#" style={{paddingLeft: 20}}>Terms of Service</a>
          </div>
          <div className="col" style={{textAlign: 'right'}}>
            <h2>STORYBOOK</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;