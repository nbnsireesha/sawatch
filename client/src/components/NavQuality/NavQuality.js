import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

class Nav extends Component {
    constructor() {
        super()
        this.state = {
          redirectTo: null
        }
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
            window.location = "http://localhost:3000/login";
            this.setState({
              redirectTo: '/login'
            })
            console.log("*********props in Nav logout ************", this.props);
          }
        }).catch(error => {
            console.log('Logout error')
        })
        
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        if (this.state.redirectTo) {
          return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
         else if (loggedIn) {
          return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <a class="navbar-brand" href="/">KDI</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="/">About <span class="sr-only">(current)</span></a>
                  </li>
                </ul>
                <div class="my-2 my-lg-0">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <a class="nav-link" href="/login" onClick={this.logout}>Logout</a>
                    </li>
                </ul>
                </div>
              </div>
            </nav>
          )
      }
      else{
        return(
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/">KDI</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/">About <span class="sr-only">(current)</span></a>
                </li>
              </ul>
              <div class="my-2 my-lg-0">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="/signup">SignUp</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
              </ul>
              </div>
            </div>
          </nav>
        );
      }


    }
}

export default Nav