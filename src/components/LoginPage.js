import React, { useState } from 'react'
import { Form, Button, Spinner, Container, Row, Card } from 'react-bootstrap'
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

	const [loading, setLoading] = useState(false)

	const submitForm = (e) => {
		e.preventDefault()
		setLoading(true)
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
					setLoading(false)
				}
			})
			.catch(function (error) {
				if (error.response) {
					addToast('Invalid Credentials!', {
						appearance: 'error',
						autoDismiss: true
					})
					document.getElementById('login-form').reset()
					setLoading(false)
				}
			})
	}

	const changeHandler = (e) => {
		e.preventDefault()

		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const loadingButton = (
		<Button variant="primary" type="submit" style={{ float: 'right' }}>
			<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
			Loading...
		</Button>
	)
	const submitButton = (
		<Button variant="primary" type="submit" style={{ float: 'right' }}>
			Login
		</Button>
	)

	return (
		<div>
			<Container>
				<Row xs={1} md={3} className="justify-content-md-center">
					<Card style={{ top: 50 }}>
						<Card.Header>Admin Login</Card.Header>
						<Card.Body>
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
								{loading ? loadingButton : submitButton}
							</Form>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</div>
	)
}

export default LoginPage
