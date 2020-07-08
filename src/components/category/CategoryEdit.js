import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Axios from '../../Axios'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const CatEditModal = ({ show, handleClose, filteredCat }) => {
	const [brand, setBrand] = useState([])
	const [form, setForm] = useState({
		name: '',
		brand_id: []
	})
	const history = useHistory()
	const { addToast } = useToasts()

	const brandNames = async () => {
		const result = await Axios.get('/admin/showBrand')
		setBrand(result.data.brand)
	}

	useEffect(() => {
		brandNames()
		const values = filteredCat.brand_id.map((key) => key.id)
		setForm({ ...form, name: filteredCat.name, brand_id: values })
	}, [])

	const handleMultiSelect = (e) => {
		const values = [...e.target.selectedOptions].map((opt) => opt.value)
		setForm({ ...form, brand_id: values })
	}

	const formSubmit = (e) => {
		e.preventDefault()
		Axios.patch(`/admin/categoryEdit/${filteredCat.id}`, form)
			.then(function (result) {
				if (result.status === 200) {
					addToast('Category updated...', {
						appearance: 'success',
						autoDismiss: true
					})
					history.push('/category')
					handleClose()
				}
			})
			.catch((error) => {
				if (error.response) {
					addToast("Something's Went Wrong!", {
						appearance: 'error',
						autoDismiss: true
					})
					history.push('/category')
					handleClose()
				}
			})
	}

	return (
		<>
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Category Edit</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={formSubmit}>
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
							<Form.Control
								as="select"
								multiple
								defaultValue={form.brand_id}
								onChange={handleMultiSelect}
							>
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
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default CatEditModal
