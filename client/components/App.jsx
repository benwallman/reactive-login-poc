import React from 'react'
import Rx from 'rxjs/Rx'

let defaultOpts = {
  "method": "POST",
  "url": "/login",
  "data": null
}

let httpRequest = function(options) {
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
    this.handleInputChange = this.handleInputChange.bind(this)
    this.observables = []
    this.autoSend = this.autoSend.bind(this)

    this.state = {
      username: "",
      password: ""
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    setTimeout(() => {
      this.autoSend()
    })
  }

  autoSend() {
    console.log(this.state.username + "   " + this.state.password)
    if (this.state.username && this.state.password) {
      this.observables.push(this.httpRequest({ "data": { "username": this.state.username, "password": this.state.password } }))
      if (this.observables.length) {
        let arrLength = this.observables.length - 1
        console.log(this.observables[arrLength])
        this.observables[arrLength].unsubscribe()
        console.log(this.observables[arrLength])
      }
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 onClick={() => {
          this.observables.push(this.httpRequest({ "data": { "username": "ben", "password": "password" } }))
          setTimeout(() => {
            let arrLength = this.observables.length - 1
            console.log(this.observables[arrLength])
            this.observables[arrLength].unsubscribe()
            console.log(this.observables[arrLength])
          }, 1000)
        }}>Hello world</h1>
        <span>username: <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}></input></span>
        <span>password: <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange}></input></span>
      </div>)
  }
}