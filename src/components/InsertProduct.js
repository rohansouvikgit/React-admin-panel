import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Axios from '../Axios'
import { useToasts } from 'react-toast-notifications'

const InsertProduct = () => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		cat_id: '',
		brand_id: '',
		price: '',
		product_size: '',
		product_color: '',
		product_weight: '',
		isActive: false,
		images: []
	})
	const [preview, setPreview] = useState([])
	const [category, setCategory] = useState([])
	const [brand, setBrand] = useState([])
	const history = useHistory()
	const { addToast } = useToasts()

	const formSubmit = (e) => {
		e.preventDefault()
		let formData = new FormData()
		for (let image of form.images) {
			formData.append('image', image)
		}
		formData.append('name', form.name)
		formData.append('product_description', form.description)
		formData.append('cat_id', form.cat_id)
		formData.append('brand_id', form.brand_id)
		formData.append('price', form.price)
		formData.append('product_size', form.product_size)
		formData.append('product_color', form.product_color)
		formData.append('product_weight', form.product_weight)
		formData.append('isActive', form.isActive)

		Axios.post('/admin/productInsert', formData)
			.then(function (result) {
				if (result.status === 201) {
					addToast('Product Inserted...', {
						appearance: 'success',
						autoDismiss: true
					})
					history.push('/product')
				}
			})
			.catch((error) => {
				if (error.response) {
					addToast("Something's Went Wrong!", {
						appearance: 'error',
						autoDismiss: true
					})
					history.push('/product')
				}
			})
	}

	const handleChange = (e) => {
		if (e.target.id === 'categorySelect' && e.target.value !== 'none') {
			setForm({ ...form, cat_id: e.target.value })
		} else if (e.target.id === 'brandSelect' && e.target.value !== 'none') {
			setForm({ ...form, brand_id: e.target.value })
		} else if (e.target.id === 'isActiveCheckbox') {
			setForm({ ...form, isActive: !form.isActive })
		}
	}

	const onSelectFiles = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			return
		}
		let pics = []
		for (let file of e.target.files) {
			pics.push(file)
		}

		if (form.images.length + pics.length <= 5) {
			setForm({
				...form,
				images: form.images.concat(pics)
			})
		}
	}

	const categoryNames = async () => {
		const result = await Axios.get('/admin/showCategory')
		setCategory(result.data.cat)
	}
	const brandNames = async () => {
		const result = await Axios.get('/admin/showBrand')
		setBrand(result.data.brand)
	}

	useEffect(() => {
		categoryNames()
		brandNames()
	}, [])

	useEffect(() => {
		if (!form.images) {
			setPreview([])
			return
		}

		let objectUrl = []
		for (let file of form.images) {
			objectUrl.push(URL.createObjectURL(file))
		}
		setPreview(objectUrl)

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl)
	}, [form.images])

	const reset = () => {
		setForm({ ...form, images: [] })
		setPreview([])
	}

	return (
		<div>
			<Button onClick={() => history.push('/product')}>Goto Product Page</Button>
			<Container>
				<Form onSubmit={formSubmit}>
					<Form.Group controlId="productName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
						/>
					</Form.Group>
					<Form.Group controlId="productDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows="3"
							value={form.description}
							onChange={(e) => setForm({ ...form, description: e.target.value })}
						/>
					</Form.Group>
					<Row>
						<Col>
							<Form.Group controlId="categorySelect">
								<Form.Label>Category</Form.Label>
								<Form.Control as="select" onChange={handleChange}>
									<option value="none">---choose---</option>
									{category.map((obj) => {
										return (
											<option key={obj.id} value={obj.id}>
												{obj.name}
											</option>
										)
									})}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="brandSelect">
								<Form.Label>Brand</Form.Label>
								<Form.Control as="select" onChange={handleChange}>
									<option value="none">---choose---</option>
									{brand.map((obj) => {
										return (
											<option key={obj.id} value={obj.id}>
												{obj.name}
											</option>
										)
									})}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="productPrice">
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="text"
									value={form.price}
									onChange={(e) => setForm({ ...form, price: e.target.value })}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="productSize">
								<Form.Label>Size</Form.Label>
								<Form.Control
									type="text"
									value={form.product_size}
									onChange={(e) => setForm({ ...form, product_size: e.target.value })}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="productColor">
								<Form.Label>Color</Form.Label>
								<Form.Control
									type="text"
									value={form.product_color}
									onChange={(e) => setForm({ ...form, product_color: e.target.value })}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="productWight">
								<Form.Label>Weight</Form.Label>
								<Form.Control
									type="text"
									value={form.product_weight}
									onChange={(e) => setForm({ ...form, product_weight: e.target.value })}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group>
						<Form.Check
							id="isActiveCheckbox"
							type="checkbox"
							checked={form.isActive}
							label="Active"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.File id="exampleFormControlFile1" multiple onChange={onSelectFiles} />
						<p>Select maximum 5 images...</p>
						<Button variant="warning" onClick={reset} style={{ float: 'right' }}>
							Clear
						</Button>
					</Form.Group>

					{form.images &&
						preview &&
						preview.map((file) => {
							return (
								<img
									src={file}
									alt="brand"
									style={{ height: '10rem', width: '10rem' }}
									key={file}
								/>
							)
						})}

					<br />
					<br />

					<Button variant="primary" type="submit" style={{ float: 'right' }}>
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	)
}

export default InsertProduct
