import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Axios from '../Axios'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
	const history = useHistory()
	const { addToast } = useToasts()

	const [form, setForm] = useState({
		username: '',
		password: ''
	})

	const submitForm = (e) => {
		e.preventDefault()
		Axios.post('/admin/login', { form })
			.then(function (result) {
				if (result.status === 200) {
					localStorage.setItem('token', result.data.token)
					localStorage.setItem('username', result.data.username)
					history.push('/category')
					addToast('Sucessfully Logged In...', {
						appearance: 'success',
						autoDismiss: true
					})
				}
			})
			.catch(function (error) {
				if (error.response) {
					addToast('Invalid Credentials!', {
						appearance: 'error',
						autoDismiss: true
					})
					document.getElementById('login-form').reset()
				}
			})
	}

	const changeHandler = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	return (
		<div>
			<Form onSubmit={submitForm} id="login-form">
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						name="username"
						placeholder="Enter Username"
						onChange={changeHandler}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						placeholder="Enter Password"
						onChange={changeHandler}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	)
}

export default LoginPage
