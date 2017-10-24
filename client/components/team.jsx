import React, { Component } from 'react';

class Team extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{marginTop: 53}}>
        <div className="row" style={{backgroundColor: 'lightcoral', height: '100vh', width: '100vw'}}>
          <div className="col align-self-center">
            <div style={{textAlign: 'center', margin: 'auto'}}>
              <h1>MEET THE TEAM</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center" style={{height: '100vh'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <img src="http://via.placeholder.com/300x500" alt=""/>
          </div>
          <div className="col" style={{maxWidth: 200}}></div>
          <div className="col align-self-center" style={{textAlign: 'left'}}>
            <p>Project Owner</p>
            <h1>Daniel Chong</h1>
            <p>Description</p>
            <a href="http://github.com/dzefa" target="blank">GitHub</a>
          </div>
        </div>
        <div className="row justify-content-center" style={{height: '100vh', backgroundColor: 'lightcyan'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <p>Scrum Master</p>
            <h1>Angie Tang</h1>
            <p>Description</p>
            <a href="http://github.com/atang167" target="blank">GitHub</a>
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
            <p>Developer</p>
            <h1>Jaafar Skafi</h1>
            <p>Description</p>
            <a href="http://github.com/jaafarskafi1" target="blank">GitHub</a>
          </div>
        </div>
        <div className="row justify-content-center" style={{height: '100vh', backgroundColor: 'lightcyan'}}>
          <div className="col align-self-center" style={{textAlign: 'right'}}>
            <p>Developer</p>
            <h1>Jordan Daniels</h1>
            <p>Description</p>
            <a href="http://github.com/liplylie" target="blank">GitHub</a>
          </div>
          <div className="col" style={{maxWidth: 200}}></div>
          <div className="col align-self-center" style={{textAlign: 'left'}}>
            <img src="http://via.placeholder.com/300x500" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default Team;