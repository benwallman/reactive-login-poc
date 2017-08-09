import React from 'react'
import Rx from 'rxjs/Rx'

let defaultOpts = {
  "method": "POST",
  "url": "/login",
  "data": null
}

let httpRequest = (options) => {
  options = Object.assign({}, defaultOpts, options)

  return Rx.Observable.create((observer) => {
    let xhr = new XMLHttpRequest()

    observer.next(xhr.readyState)

    xhr.open(options.method, options.url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(options.data))

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
  }).subscribe({
    next: x => console.log('got value ' + x),
    error: err => console.error('Something wrong occurred: ' + err),
    complete: () => console.log('Successful response')
  })

}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.httpRequest = httpRequest.bind(this)
    // this.observables = [];
  }


  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 onClick={() => {
          this.ongoingRequest = this.httpRequest({ "data": { "username": "ben", "password": "password" } })
          setTimeout(()=>{
            console.log(this.ongoingRequest)
            this.ongoingRequest.unsubscribe()
            console.log(this.ongoingRequest)
          }, 1000)
        }}>Hello world</h1>
      </div>)
  }
}