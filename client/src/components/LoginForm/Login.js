import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Col, Row, Container } from "../Grid";
import { Input, FormBtn } from "../Form";
import Card from "../Card";
class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <Container>
                    <Row>
                        <Col size="md-12">
                            <Card title="Login">
                                <form>
                                    <Input 
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                    
                                    <Input 
                                        placeholder="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    
                                    <FormBtn
                                        onClick={this.handleSubmit}
                                        type="submit">Login
                                    </FormBtn>
                                    
                                </form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default LoginForm
