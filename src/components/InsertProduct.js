import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

const InsertProduct = () => {
	const history = useHistory()

	return (
		<div>
			<Button onClick={() => history.push('/product')}>Goto Category page</Button>
			<h3>Product works!</h3>
		</div>
	)
}

export default InsertProduct
