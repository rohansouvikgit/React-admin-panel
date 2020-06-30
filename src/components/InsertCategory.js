import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import Axios from '../Axios'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const InsertCategory = () => {
	const [brand, setBrand] = useState([])
	const [form, setForm] = useState({
		name: '',
		brand_id: []
	})
	const history = useHistory()
	const { addToast } = useToasts()

	const submitCat = async (e) => {
		e.preventDefault()
		const result = await Axios.post('/admin/categoryInsert', { form }).catch((error) => {
			if (error.response) {
				addToast("Something's Went Wrong!", {
					appearance: 'error',
					autoDismiss: true
				})
			}
		})
		if (result.status === 201) {
			history.push('/category')
			addToast('Category added...', {
				appearance: 'success',
				autoDismiss: true
			})
		}
	}

	const brandNames = async () => {
		const result = await Axios.get('/admin/showBrand')
		setBrand(result.data.brand)
	}

	useEffect(() => {
		brandNames()
	}, [])

	const handleMultiSelect = (e) => {
		const values = [...e.target.selectedOptions].map((opt) => opt.value)
		setForm({ ...form, brand_id: values })
	}

	return (
		<div>
			<Button onClick={() => history.push('/category')}>Goto Category page</Button>
			<Container>
				<Form onSubmit={submitCat}>
					<Form.Group controlId="categoryName">
						<Form.Label>Category Name</Form.Label>
						<Form.Control
							type="text"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
						/>
					</Form.Group>
					<Form.Group controlId="brandName">
						<Form.Label>Brands</Form.Label>
						<Form.Control as="select" multiple onChange={handleMultiSelect}>
							{brand.map((key) => {
								return (
									<option key={key.id} value={key.id}>
										{key.name}
									</option>
								)
							})}
						</Form.Control>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	)
}

export default InsertCategory
