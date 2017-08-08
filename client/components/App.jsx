import React from 'react'
import Rx from 'rxjs/Rx'

let defaultOpts = {
  "method": "POST",
  "url": "/login",
  "data": null
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.opts = defaultOpts
    this.httpRequest = this.httpRequest.bind(this)
  }

  httpRequest(options = Object.assign({}, this.opts)) {
    let httpObservable = Rx.Observable.create((observer) => {
      let xhr = new XMLHttpRequest()
      observer.next(xhr.readyState)
      xhr.open(options.method, options.url, true)
      xhr.setRequestHeader("Content-Type", "application/json")
      var obj = {
        "username": "ben",
        "password": "password"
      }
      xhr.send(JSON.stringify(obj))
      observer.next(xhr.readyState)

      xhr.onreadystatechange = () => {
        var DONE = 4 // readyState 4 means the request is done.
        var OK = 200 // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            // console.log(xhr.responseText) // 'This is the returned text.'
            observer.complete()
          }
          else {
            observer.error(xhr.status)
          }
        } else {
          observer.next(xhr.readyState)
        }
      }
    })

    httpObservable.subscribe({
      next: x => console.log('got value ' + x),

      error: err => console.error('Something wrong occurred: ' + err),
      complete: () => console.log('Oh yeah'),
    })



    

  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 onClick={() => this.httpRequest()}>Hello world</h1>
      </div>)
  }
}