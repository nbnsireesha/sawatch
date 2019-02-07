import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import { Input, FormBtn } from "../Form";
import { Col, Row, Container } from "../Grid";

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
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
        event.preventDefault();
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo }} />
	}
	return (
		<Container>
			<Row>
				<Col size="md-12">
					<Card title="SignUp">
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
								type="submit"
								>Sign up
							</FormBtn>
						</form>
					</Card>
				</Col>
			</Row>
		</Container>

	)
}
}

export default Signup
