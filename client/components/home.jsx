import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{marginTop: 40}}>
        <div className="row" style={{paddingTop: 40, height: '100vh', backgroundColor: 'lightpink'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <img src="http://via.placeholder.com/300x500" />
          </div>
          <div className="col align-self-center" style={{textAlign: 'left'}}>
            <h1>Download now</h1>
            <div>
              <button type="button" className="btn btn-outline-dark">
                App Store
              </button>
              <button type="button" className="btn btn-outline-dark" style={{marginLeft: 20}}>
                Play Store
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;