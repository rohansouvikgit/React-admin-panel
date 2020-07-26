import React, { useState, useEffect, useReducer } from 'react'
import Axios from '../../Axios'
import { Table, Button, Container } from 'react-bootstrap'
import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact'
import CatEditModal from './CategoryEdit'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { Edit, Trash2 } from 'react-feather'

const initialState = {
	category: [],
	filteredCategory: [],
	filterEditCat: []
}

const categoryReducer = (state, action) => {
	switch (action.type) {
		case 'SHOW_CATEGORY':
			return {
				...state,
				category: action.payload,
				filteredCategory: action.payload
			}
		case 'REMOVE_CATEGORY': {
			const deletedCat = state.category.filter((key) => key.name !== action.payload)
			const deletedFilteredCat = state.filteredCategory.filter((key) => key.name !== action.payload)

			return {
				...state,
				category: deletedCat,
				filteredCategory: deletedFilteredCat
			}
		}
		case 'FILTERED_CATEGORY':
			return {
				...state,
				filteredCategory: action.payload
			}
		case 'FILTER_EDIT_CATEGORY': {
			const result = state.filteredCategory.filter((key) => key.name === action.payload)

			return {
				...state,
				filterEditCat: result
			}
		}
		default:
			return state
	}
}

const Category = () => {
	const [state, dispatch] = useReducer(categoryReducer, initialState)
	const [show, setShow] = useState(false)
	const history = useHistory()
	const { addToast } = useToasts()
	let count = 0

	const handleClose = () => {
		setShow(false)
		showCategory()
	}
	const handleShow = () => setShow(true)

	const showCategory = () => {
		Axios.get('/admin/showCategory')
			.then((response) => {
				dispatch({
					type: 'SHOW_CATEGORY',
					payload: response.data.cat
				})
			})
			.catch((err) => {
				if (err.response.status) {
					console.log('unauthorized')
				}
			})
	}

	const editCat = (name) => {
		dispatch({
			type: 'FILTER_EDIT_CATEGORY',
			payload: name
		})
		handleShow()
	}

	const removeCat = (name) => {
		Swal.fire({
			title: 'Are you sure?',
			text: `You want to delete ${name}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.value) {
				Axios.delete(`/admin/categoryRemove/${name}`)
					.then((response) => {
						if (response.data.name) {
							addToast('Category removed!', {
								appearance: 'warning',
								autoDismiss: true
							})
							dispatch({
								type: 'REMOVE_CATEGORY',
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

	const searchFilter = (e) => {
		const filtered = state.category.filter((obj) =>
			obj.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		console.log(filtered)
		dispatch({
			type: 'FILTERED_CATEGORY',
			payload: filtered
		})
	}

	useEffect(() => {
		showCategory()
	}, [])

	return (
		<div>
			<Button variant="primary" onClick={() => history.push('/category/insert')}>
				Add Category
			</Button>
			<br />
			<br />

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
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>No.</th>
							<th>Category Name</th>
							<th>Brand Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{state.filteredCategory.map((item) => {
							return (
								<tr key={item.id}>
									<td>{++count}</td>
									<td>{item.name}</td>
									<td>
										<ol>
											{item.brand_id.map((brand) => {
												return <li key={brand.id}>{brand.name}</li>
											})}
										</ol>
									</td>
									<td>
										<Edit
											color="blue"
											style={{ cursor: 'pointer' }}
											onClick={() => editCat(item.name)}
										/>
										&nbsp;&nbsp;
										<Trash2
											color="red"
											style={{ cursor: 'pointer' }}
											onClick={() => removeCat(item.name)}
										/>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Container>

			{show && (
				<CatEditModal show={show} handleClose={handleClose} filteredCat={state.filterEditCat[0]} />
			)}
		</div>
	)
}

export default Category
