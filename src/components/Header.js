import React from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBCollapse, MDBNavbarBrand } from 'mdbreact'

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
		<div className="header">
			<header>
				<MDBNavbar style={{ backgroundColor: 'black' }} dark expand="md" scrolling>
					<MDBNavbarBrand>
						<strong className="white-text">Admin Panel</strong>
					</MDBNavbarBrand>
					<MDBCollapse navbar>
						<MDBNavbarNav left>
							<NavLink to="/dashboard" activeClassName="active" style={{ color: 'white' }}>
								Dashboard
							</NavLink>
							&nbsp;&nbsp;
							<NavLink to="/category" activeClassName="active" style={{ color: 'white' }}>
								Category
							</NavLink>
							&nbsp;&nbsp;
							<NavLink to="/brand" activeClassName="active" style={{ color: 'white' }}>
								Brand
							</NavLink>
							&nbsp;&nbsp;
							<NavLink to="/product" activeClassName="seleactivected" style={{ color: 'white' }}>
								Product
							</NavLink>
						</MDBNavbarNav>
						<MDBNavbarNav right>
							<MDBNavItem>
								<strong onClick={logoutButton} style={{ color: 'white', cursor: 'pointer' }}>
									Logout
								</strong>
							</MDBNavItem>
						</MDBNavbarNav>
					</MDBCollapse>
				</MDBNavbar>
			</header>
			{/* <Navbar collapseOnSelect expand="lg" bg="light">
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
			</Navbar> */}
		</div>
	)
}

export default Header
