import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Container, FormControl, FormLabel, Row, Card, Button, Spinner } from 'react-bootstrap'
import Axios from '../Axios'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

const initialValues = {
	username: '',
	password: ''
}

const validationSchema = Yup.object({
	username: Yup.string().required('Username is Required!').min(5, 'Minimum 5 characters!'),
	password: Yup.string()
		.required('Password is required!')
		.matches(/(?=.*\d)/, 'Atleast 1 number!')
		.matches(/(?=.*[a-z])/, 'Atleast 1 character')
		.matches(/[0-9a-zA-Z]{5,}/, 'Should contain atleast 5 characters!')
})

const LoginPage = () => {
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const { addToast } = useToasts()

	const onSubmit = (form) => {
		console.log(form)
		setLoading(true)
		Axios.post('/admin/login', { form })
			.then(function (result) {
				if (result.status === 200) {
					localStorage.setItem('token', result.data.token)
					localStorage.setItem('username', result.data.username)
					history.push('/dashboard')
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
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Container>
				<Row xs={1} md={3} className="justify-content-md-center">
					<Card style={{ top: 50 }}>
						<Card.Header>Admin Login</Card.Header>
						<Card.Body>
							<Form id="login-form">
								<Field name="username">
									{({ field, form: { touched, errors }, meta }) => (
										<div>
											<FormLabel>Username</FormLabel>
											<FormControl type="text" placeholder="username" {...field} />
										</div>
									)}
								</Field>
								<ErrorMessage name="username" />

								<Field name="password">
									{({ field, form: { touched, errors }, meta }) => (
										<div>
											<FormLabel>Password</FormLabel>
											<FormControl type="password" placeholder="password" {...field} />
										</div>
									)}
								</Field>
								<ErrorMessage name="password" />

								{loading ? loadingButton : submitButton}
							</Form>
						</Card.Body>
					</Card>
				</Row>
			</Container>
		</Formik>
	)
}

export default LoginPage
