import React from 'react'
import Rx from 'rxjs/Rx'

let defaultOpts = {
  "method": "POST",
  "url": "/login",
  "data": null
}


let httpRequest = (options) => Rx.Observable.create(observer => {
  options = Object.assign({}, defaultOpts, options)

  let xhr = new XMLHttpRequest()

  observer.next(xhr.readyState)

  xhr.open(options.method, options.url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(options.data))

  observer.next(xhr.readyState)

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      (xhr.status === 200) ? observer.complete() : observer.error(xhr.status)
    } else {
      observer.next(xhr.readyState)
    }
  }

  return () => {
    xhr.abort()
  }
}
)

export default class App extends React.Component {
  constructor(props) {
    super(props)

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
    setTimeout(() => this.autoSend())
  }

  autoSend() {
    if (this.state.username && this.state.password) {
      let options = { "data": { "username": this.state.username, "password": this.state.password } }
      this.observables.push(httpRequest(options).subscribe({
        // next: x => console.log('got value ' + x),
        error: (err) => {
          if (err === 0) {
            console.log("Request cancelled")
          } else {
            console.log("Request failed")
          }
        },
        complete: () => alert('Successful response')
      }))

      if (this.observables.length) {
        let arrLength = this.observables.length - 2
        if (this.observables[arrLength]) {
          this.observables[arrLength].unsubscribe()
        }
      }
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>No button login P.o.C</h1>
        <span>username: <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}></input></span>
        <span>password: <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange}></input></span>
        <br/><br/><span>Hint, the username is 'ben' and the password is 'password'</span>
      </div>)
  }
}