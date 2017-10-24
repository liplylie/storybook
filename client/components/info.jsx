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
            <h1>Your Story Begins Here</h1>
            <p>Share your story with the world.</p>
          </div>
        </div>
        <div className="row justify-content-center" style={{height: '100vh', backgroundColor: 'lightcyan'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <h1>Location Based Chapters</h1>
            <p>Each chapter of your story will be saved to its location.</p>
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
            <h1>Relive your Past Memories</h1>
            <p>Get push notifications when you revisit a past chapter.</p>
          </div>
        </div>
        <div className="row" style={{backgroundColor: 'lightgoldenrodyellow', height: 300, width: '100vw'}}>
          <div className="col align-self-center" style={{textAlign: 'center'}}>
            <h3>What are you waiting for?</h3>
            <p>Download the app and start sharing your story!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Info;