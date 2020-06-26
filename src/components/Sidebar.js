import React from 'react'
import { Link } from 'react-router-dom'
import { stack as Menu } from 'react-burger-menu'

const Sidebar = (props) => {
	return (
		<Menu {...props}>
			<Link to="/" className="menu-item">
				DashBoard
			</Link>

			<Link to="/category" className="menu-item">
				Category
			</Link>

			<Link to="/product" className="menu-item">
				Product
			</Link>
		</Menu>
	)
}

export default Sidebar
