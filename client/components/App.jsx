import React from 'react';

let opts = {
  "method": "POST",
  "url": "/login",
  "data": null
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.opts = opts;
    this.httpRequest = this.httpRequest.bind(this);
  }
  
  httpRequest (options = Object.assign({}, opts)) {
    let xhr = new XMLHttpRequest()
    xhr.open(options.method, options.url, true)
    xhr.send(null)
    xhr.onreadystatechange = () => {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (xhr.readyState === DONE) {
        if (xhr.status === OK)
          console.log(xhr.responseText); // 'This is the returned text.'
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 onClick={()=>this.httpRequest()}>Hello world</h1>
      </div>);
  }
}