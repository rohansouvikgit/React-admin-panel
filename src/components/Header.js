import React from 'react'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const Header = () => {
	const history = useHistory()
	const { addToast } = useToasts()

	const logoutButton = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		history.push('/auth/login')
		addToast('You are successfully logged out...', {
			appearance: 'info',
			autoDismiss: true
		})
	}

	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="light">
				<Nav className="mr-auto">
					<i className="fa fa-align-justify fa-2x"></i>
				</Nav>
				<Nav>
					<Dropdown>
						<Dropdown.Toggle id="dropdown-basic-button" drop="left">
							<i className="fa fa-user-circle-o fa-2x" style={{ cursor: 'pointer' }}></i>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={logoutButton}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar>
		</div>
	)
}

export default Header
