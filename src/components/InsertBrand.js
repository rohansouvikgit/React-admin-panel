import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Axios from '../Axios'

const InsertBrand = () => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		image: ''
	})
	const history = useHistory()
	const { addToast } = useToasts()

	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState()

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
		formData.append('image', form.image)

		Axios.post('/admin/brandInsert', formData)
			.then(function (result) {
				if (result.status === 201) {
					addToast('Brand Inserted...', {
						appearance: 'success',
						autoDismiss: true
					})
					history.push('/brand')
				}
			})
			.catch((error) => {
				if (error.response) {
					addToast("Something's Went Wrong!", {
						appearance: 'error',
						autoDismiss: true
					})
					history.push('/brand')
				}
			})
	}

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
		<div>
			<Button onClick={() => history.push('/brand')}>Goto Category page</Button>
			<Container>
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
					{selectedFile && (
						<img src={preview} alt="brand" style={{ height: '9rem', width: '9rem' }} />
					)}

					<br />
					<br />

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	)
}

export default InsertBrand
