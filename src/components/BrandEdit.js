import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Axios from '../Axios'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const BrandEditModal = ({ show, handleClose, filteredBrand }) => {
	return (
		<>
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Category Edit</Modal.Title>
				</Modal.Header>
				<Modal.Body>{console.log(filteredBrand)}</Modal.Body>
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
