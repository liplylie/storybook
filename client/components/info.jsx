import React, { Component } from 'react';

class Info extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{marginTop: 53}}>
        <div className="row" style={{backgroundColor: 'lightpink', height: '100vh', width: '100vw'}}>
          <div className="col align-self-center">
            <div style={{textAlign: 'center', margin: 'auto'}}>
              <h1>Storybook</h1>
              <p>Storybook synopsis goes here</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center" style={{height: '100vh'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <img src="http://via.placeholder.com/300x500" alt=""/>
          </div>
          <div className="col" style={{maxWidth: 200}}></div>
          <div className="col align-self-center" style={{textAlign: 'left'}}>
            <h1>Name 1</h1>
            <p>Description</p>
          </div>
        </div>
        <div className="row justify-content-center" style={{height: '100vh', backgroundColor: 'lightcyan'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <h1>Name 2</h1>
            <p>Description</p>
          </div>
          <div className="col" style={{maxWidth: 200}}></div>
          <div className="col align-self-center" style={{textAlign: 'left'}}>
            <img src="http://via.placeholder.com/300x500" alt=""/>
          </div>
        </div>
        <div className="row justify-content-center" style={{height: '100vh'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <img src="http://via.placeholder.com/300x500" alt=""/>
          </div>
          <div className="col" style={{maxWidth: 200}}></div>
          <div className="col align-self-center" style={{textAlign: 'left'}}>
            <h1>Name 3</h1>
            <p>Description</p>
          </div>
        </div>
        <div className="row" style={{backgroundColor: 'lightgoldenrodyellow', height: 300, width: '100vw'}}>
          <div className="col align-self-center" style={{textAlign: 'center'}}>
            <p>Final description goes here</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Info;