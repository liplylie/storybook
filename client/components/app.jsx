import React, { Component } from 'react';
import axios from 'axios';
// const Promise = require('bluebird'); promisify later on...

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlList: ["https://i.imgur.com/hy0rDYi.jpg"]
    }
    this.grabUrl = this.grabUrl.bind(this);
    this.sendUrls = this.sendUrls.bind(this);
  }

  grabUrl(e) {
    let separatedLinks = [];
    separatedLinks = (e.target.value).split(/[,| +]+?|[\n]/g);
    this.setState({urlList: separatedLinks});
    console.log("hello world", this.state.urlList);
  }

  sendUrls() {
    console.log(this.state.urlList);
    this.state.urlList.forEach((link) => {
      console.log('LIJK', link);
      if (link !== "") {
        axios({
          method: 'post',
          url: "/api/addurl",
          data: link,
        }).then(res => {}).catch(err => console.log(err));
      };
    })
  }

  render() {
    return (
      <div className="main">
        <input type="text" placeholder="text" onChange={this.grabUrl}/>
        <button onClick={this.sendUrls}>send urls</button>
      </div>
    )
  }
}

export default App;