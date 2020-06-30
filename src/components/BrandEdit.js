import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Axios from '../Axios'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const BrandEditModal = ({ show, handleClose, filteredBrand }) => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		image: ''
	})
	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState()

	const baseURL = 'http://localhost:8000/'
	const history = useHistory()
	const { addToast } = useToasts()

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}

		setSelectedFile(e.target.files[0])
		setForm({
			...form,
			image: e.target.files[0]
		})
	}

	const formSubmit = (e) => {
		e.preventDefault()
		let formData = new FormData()
		formData.append('name', form.name)
		formData.append('description', form.description)
		if (typeof form.image === 'object') {
			formData.append('image', form.image)
		}

		Axios.patch(`/admin/brandEdit/${filteredBrand.id}`, formData)
			.then(function (result) {
				if (result.status === 200) {
					addToast('Brand updated...', {
						appearance: 'success',
						autoDismiss: true
					})
					history.push('/brand')
					handleClose()
				}
			})
			.catch((error) => {
				if (error.response) {
					addToast("Something's Went Wrong!", {
						appearance: 'error',
						autoDismiss: true
					})
					history.push('/brand')
					handleClose()
				}
			})
	}

	useEffect(() => {
		setForm({
			...form,
			name: filteredBrand.name,
			description: filteredBrand.brand_description,
			image: filteredBrand.brand_image
		})
	}, [])

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}

		const objectUrl = URL.createObjectURL(selectedFile)
		setPreview(objectUrl)

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl)
	}, [selectedFile])

	return (
		<>
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Category Edit</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={formSubmit}>
						<Form.Group controlId="brandName">
							<Form.Label>Brand Name</Form.Label>
							<Form.Control
								type="text"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
							/>
						</Form.Group>
						<Form.Group controlId="brandDescription">
							<Form.Label>Brand Description</Form.Label>
							<Form.Control
								type="text"
								value={form.description}
								onChange={(e) => setForm({ ...form, description: e.target.value })}
							/>
						</Form.Group>
						<Form.Group>
							<Form.File
								id="exampleFormControlFile1"
								label="Example file input"
								onChange={onSelectFile}
							/>
						</Form.Group>
						{selectedFile ? (
							<img src={preview} alt="brand" style={{ height: '9rem', width: '9rem' }} />
						) : (
							<img
								src={baseURL + form.image}
								alt="brand"
								style={{ height: '9rem', width: '9rem' }}
							/>
						)}

						<br />
						<br />

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

export default BrandEditModal
