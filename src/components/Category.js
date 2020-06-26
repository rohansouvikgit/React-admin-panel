import React, { useState, useEffect } from 'react'
import Axios from '../Axios'
import { Table, Button } from 'react-bootstrap'
import CatEditModal from './CategoryEdit'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const Category = () => {
	const [cat, setCat] = useState([])
	const [show, setShow] = useState(false)
	const [filteredCat, setFilteredCat] = useState([])
	const history = useHistory()
	const { addToast } = useToasts()

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	let count = 0
	function autoInc() {
		count++
		return count
	}

	const insertCat = () => {
		history.push('/category/insert')
	}

	const showCategory = async () => {
		const response = await Axios.get('/admin/showCategory')
		setCat(response.data.cat)
		// console.log(response.data.cat)
	}

	const editCat = (name) => {
		const result = cat.filter((key) => key.name === name)
		setFilteredCat(result)
		// console.log(filteredCat)
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
		}).then(async (result) => {
			if (result.value) {
				const response = await Axios.delete(`/admin/categoryRemove/${name}`).catch((error) => {
					if (error.response) {
						addToast("Something's Went Wrong!", {
							appearance: 'error',
							autoDismiss: true
						})
					}
				})
				if (response.data.name) {
					addToast('Category removed!', {
						appearance: 'warning',
						autoDismiss: true
					})
					setCat(cat.filter((key) => key.name !== response.data.name))
				}
			}
		})
	}

	useEffect(() => {
		showCategory()
	}, [handleClose])

	const editModal = (
		<CatEditModal show={show} handleClose={handleClose} filteredCat={filteredCat[0]} />
	)

	return (
		<div>
			<Button variant="primary" onClick={insertCat}>
				Add Category
			</Button>
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
					{cat.map((item) => {
						return (
							<tr key={item.id}>
								<td>{autoInc()}</td>
								<td>{item.name}</td>
								<td>
									<ol>
										{item.brand_id.map((brand) => {
											return <li key={brand.id}>{brand.name}</li>
										})}
									</ol>
								</td>
								<td>
									<Button variant="primary" onClick={() => editCat(item.name)}>
										Edit
									</Button>
									&nbsp;&nbsp;
									<Button variant="danger" onClick={() => removeCat(item.name)}>
										Delete
									</Button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>

			{show ? editModal : ''}
		</div>
	)
}

export default Category
