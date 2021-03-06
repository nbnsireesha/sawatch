import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
// components
import Signup from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Nav';
import Home from './pages/Home';
import Quality from './pages/Quality';
import Lab from './pages/Lab';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      department: ''
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then((response) => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          department: response.data.user.department
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
   
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} department={this.state.department} />
        
        {/* greet user if logged in: */}
        {/*<div className = 'container'>
          {this.state.loggedIn &&
            <p>Join the party, {this.state.username}!</p>
          }
        </div>*/}
        {/* Routes to different components */}
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />} />
        <Route path="/signup" render={() => <Signup/>} />
        <Route path="/quality" render={() => <Quality username={this.state.username}/>} />
        <Route path="/lab" render={() => <Lab username={this.state.username}/>} />

      </div>
    );
  }
}

export default App;
