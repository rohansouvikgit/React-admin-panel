import React, { useReducer, useEffect, useState } from 'react'
import Axios from '../../Axios'
import { Card, Button, Container, CardColumns } from 'react-bootstrap'
import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import BrandEditModal from './BrandEdit'
import { Edit, Trash2 } from 'react-feather'

const brandReducer = (state, action) => {
	switch (action.type) {
		case 'SHOW_BRAND':
			return action.payload
		case 'REMOVE_BRAND':
			return state.filter((key) => key.name !== action.payload)
		default:
			return state
	}
}

const Brand = () => {
	const [brand, dispatch] = useReducer(brandReducer, [])
	const [filteredBrand, setFilteredBrand] = useState([])
	const [show, setShow] = useState(false)
	const baseURL = 'http://localhost:8000/'
	const history = useHistory()
	const { addToast } = useToasts()

	const handleClose = () => {
		setShow(false)
		showBrand()
	}
	const handleShow = () => setShow(true)

	const showBrand = async () => {
		const response = await Axios.get('/admin/showBrand')
		dispatch({
			type: 'SHOW_BRAND',
			payload: response.data.brand
		})
		setFilterBrand(response.data.brand)
	}

	const editBrand = (name) => {
		const result = brand.filter((key) => key.name === name)
		setFilteredBrand(result)
		handleShow()
	}

	const removeBrand = (name) => {
		Swal.fire({
			title: 'Are you sure?',
			text: `You want to delete ${name}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.value) {
				Axios.delete(`/admin/brandRemove/${name}`)
					.then((response) => {
						if (response.data.name) {
							addToast('Brand removed!', {
								appearance: 'warning',
								autoDismiss: true
							})
							dispatch({
								type: 'REMOVE_BRAND',
								payload: response.data.name
							})
						}
					})
					.catch((error) => {
						if (error.response) {
							addToast("Something's Went Wrong!", {
								appearance: 'error',
								autoDismiss: true
							})
						}
					})
			}
		})
	}

	const [filterBrand, setFilterBrand] = useState([])
	const searchFilter = (e) => {
		const filtered = brand.filter((obj) =>
			obj.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFilterBrand(filtered)
	}

	useEffect(() => {
		showBrand()
	}, [])
	useEffect(() => {
		showBrand()
	}, [brand])

	const editModal = (
		<BrandEditModal show={show} handleClose={handleClose} filteredBrand={filteredBrand[0]} />
	)

	return (
		<div style={{ position: 'sticky' }}>
			<Button variant="primary" onClick={() => history.push('/brand/insert')}>
				Add Brand
			</Button>
			<Container>
				<MDBCol md="4">
					<MDBFormInline className="md-form">
						<MDBIcon icon="search" />
						<input
							className="form-control form-control-sm ml-3 w-75"
							type="text"
							placeholder="Search"
							aria-label="Search"
							onChange={searchFilter}
						/>
					</MDBFormInline>
				</MDBCol>
				<br />
				<CardColumns>
					{filterBrand.map((key) => {
						return (
							<Card style={{ width: '18rem' }} key={key.id}>
								<Card.Img variant="top" src={baseURL + key.brand_image} alt="brand" />
								<Card.Body>
									<Card.Title>{key.name}</Card.Title>
									<Card.Text>{key.brand_description}</Card.Text>
									<Edit
										color="blue"
										style={{ cursor: 'pointer' }}
										onClick={() => editBrand(key.name)}
									/>
									&nbsp;&nbsp;
									<Trash2
										color="red"
										style={{ cursor: 'pointer' }}
										onClick={() => removeBrand(key.name)}
									/>
								</Card.Body>
							</Card>
						)
					})}
				</CardColumns>
			</Container>
			{show && editModal}
		</div>
	)
}

export default Brand
