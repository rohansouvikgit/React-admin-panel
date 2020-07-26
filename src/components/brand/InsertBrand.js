import React, { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Axios from '../../Axios'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

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
	const [crop, setCrop] = useState({ aspect: 16 / 9 })
	const [image, setImage] = useState(null)
	const [result, setResult] = useState(null)

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}

		setSelectedFile(e.target.files[0])
	}

	const getCroppedImg = (e) => {
		e.preventDefault()
		const canvas = document.createElement('canvas')
		const scaleX = image.naturalWidth / image.width
		const scaleY = image.naturalHeight / image.height
		canvas.width = crop.width
		canvas.height = crop.height
		const ctx = canvas.getContext('2d')

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		)

		const base64Image = canvas.toDataURL('image/jpeg')
		setResult(base64Image)
		var blob = dataURLtoBlob(base64Image)
		const imageFile = new File([blob], 'uploaded_file.jpg', {
			type: 'image/jpeg',
			lastModified: Date.now()
		})
		setForm({
			...form,
			image: imageFile
		})
	}

	/**
	 * Convert base64 to blob
	 */
	function dataURLtoBlob(dataurl) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new Blob([u8arr], { type: mime })
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
							accept="image/*"
							onChange={onSelectFile}
						/>
					</Form.Group>
					{/* {selectedFile && (
						<img src={preview} alt="brand" style={{ height: '9rem', width: '9rem' }} />
					)} */}

					{selectedFile && (
						<div>
							<ReactCrop src={preview} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
							<button className="btn btn-danger" onClick={getCroppedImg}>
								Crop Image
							</button>
						</div>
					)}
					{form.image && (
						<div>
							<img src={result} alt="brand" />
						</div>
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
