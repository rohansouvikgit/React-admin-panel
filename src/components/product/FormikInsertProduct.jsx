import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
	Container,
	FormControl,
	FormLabel,
	Row,
	Button,
	Col,
	FormCheck,
	FormGroup,
	FormFile
} from 'react-bootstrap'
import Axios from '../../Axios'
import { useToasts } from 'react-toast-notifications'
// import { useHistory } from 'react-router-dom'

const initialValues = {
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
}

const validationSchema = Yup.object({
	// name: Yup.string().required('Username is Required!'),
	// description: Yup.string().required('Password is required!'),
	// cat_id: Yup.string().required('Catgegory id is required!'),
	// brand_id: Yup.string().required('Brand id is required!'),
	// price: Yup.string().required('Price id is required!'),
	// product_size: Yup.string().required('size is required!'),
	// product_color: Yup.string().required('Color is required!'),
	// product_weight: Yup.string().required('Weight is required!'),
	// isActive: Yup.string().required('Active is required!'),
	// images: Yup.string().required('Imgae id is required!')
})

const InsertProduct = () => {
	const [category, setCategory] = useState([])
	const [brand, setBrand] = useState([])
	const [preview, setPreview] = useState([])
	// const history = useHistory()
	const { addToast } = useToasts()

	const onSubmit = (form) => {
		console.log(form)
		// let formData = new FormData()
		// for (let image of form.images) {
		// 	formData.append('image', image)
		// }
		// formData.append('name', form.name)
		// formData.append('product_description', form.description)
		// formData.append('cat_id', form.cat_id)
		// formData.append('brand_id', form.brand_id)
		// formData.append('price', form.price)
		// formData.append('product_size', form.product_size)
		// formData.append('product_color', form.product_color)
		// formData.append('product_weight', form.product_weight)
		// formData.append('isActive', form.isActive)

		// Axios.post('/admin/productInsert', formData)
		// 	.then(function (result) {
		// 		if (result.status === 201) {
		// 			addToast('Product Inserted...', {
		// 				appearance: 'success',
		// 				autoDismiss: true
		// 			})
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error.response)
		// 		if (error.response) {
		// 			addToast("Something's Went Wrong!", {
		// 				appearance: 'error',
		// 				autoDismiss: true
		// 			})
		// 		}
		// 	})
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

	return (
		<Container>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => (
					<Form id="login-form">
						<FormGroup>
							<Field name="name">
								{({ field, form, meta }) => (
									<div>
										<FormLabel>Name</FormLabel>
										<FormControl type="text" {...field} />
									</div>
								)}
							</Field>
							<ErrorMessage name="name" />
						</FormGroup>

						<FormGroup>
							<Field name="description">
								{({ field, form, meta }) => (
									<div>
										<FormLabel>Description</FormLabel>
										<FormControl as="textarea" rows="3" type="text" {...field} />
									</div>
								)}
							</Field>
							<ErrorMessage name="description" />
						</FormGroup>

						<Row>
							<Col>
								<FormGroup>
									<Field name="cat_id">
										{({ field, form, meta }) => (
											<div>
												<FormLabel>Category</FormLabel>
												<FormControl as="select" {...field}>
													{category.map((obj) => {
														return (
															<option key={obj.id} value={obj.id}>
																{obj.name}
															</option>
														)
													})}
												</FormControl>
											</div>
										)}
									</Field>
									<ErrorMessage name="cat_id" />
								</FormGroup>
							</Col>

							<Col>
								<FormGroup>
									<Field name="brand_id">
										{({ field, form, meta }) => (
											<div>
												<FormLabel>Brand</FormLabel>
												<FormControl as="select" {...field}>
													{brand.map((obj) => {
														return (
															<option key={obj.id} value={obj.id}>
																{obj.name}
															</option>
														)
													})}
												</FormControl>
											</div>
										)}
									</Field>
									<ErrorMessage name="brand_id" />
								</FormGroup>
							</Col>

							<Col>
								<FormGroup>
									<Field name="price">
										{({ field, form, meta }) => (
											<div>
												<FormLabel>Price</FormLabel>
												<FormControl type="text" {...field} />
											</div>
										)}
									</Field>
									<ErrorMessage name="price" />
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col>
								<FormGroup>
									<Field name="product_size">
										{({ field, form, meta }) => (
											<div>
												<FormLabel>Size</FormLabel>
												<FormControl type="text" {...field} />
											</div>
										)}
									</Field>
									<ErrorMessage name="product_size" />
								</FormGroup>
							</Col>

							<Col>
								<FormGroup>
									<Field name="product_color">
										{({ field, form, meta }) => (
											<div>
												<FormLabel>Color</FormLabel>
												<FormControl type="text" {...field} />
											</div>
										)}
									</Field>
									<ErrorMessage name="product_color" />
								</FormGroup>
							</Col>

							<Col>
								<FormGroup>
									<Field name="product_weight">
										{({ field, form, meta }) => (
											<div>
												<FormLabel>Weight</FormLabel>
												<FormControl type="text" {...field} />
											</div>
										)}
									</Field>
									<ErrorMessage name="product_weight" />
								</FormGroup>
							</Col>
						</Row>

						<FormGroup>
							<Field name="isActive">
								{({ field, form, meta }) => (
									<div>
										<FormLabel>Active</FormLabel>
										<FormCheck id="isActiveCheckbox" type="checkbox" label="Active" {...field} />
									</div>
								)}
							</Field>
							<ErrorMessage name="isActive" />
						</FormGroup>

						<FormGroup>
							<Field name="isActive">
								{({ field, form, meta }) => (
									<div>
										<FormLabel>Active</FormLabel>
										<FormFile
											id="exampleFormControlFile1"
											multiple
											onChange={(e) => form.setFieldValue('images', e.currentTarget.files)}
										/>
										<p>Select maximum 5 images...</p>
									</div>
								)}
							</Field>
							<ErrorMessage name="isActive" />
						</FormGroup>

						<br />
						<Button variant="primary" type="submit" style={{ float: 'right' }}>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	)
}

export default InsertProduct
