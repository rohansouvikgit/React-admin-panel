import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { stack as Menu } from 'react-burger-menu'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import Dashboard from './Dashboard'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'

const Sidebar = (props) => {
	return (
		<>
			<SideNav
				onSelect={(selected) => {
					// Add your code here
				}}
			>
				<SideNav.Toggle />
				<SideNav.Nav defaultSelected="home">
					<NavItem eventKey="home">
						<NavIcon>
							<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
						</NavIcon>
						<NavText>Home</NavText>
					</NavItem>
					<NavItem eventKey="charts">
						<NavIcon>
							<i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
						</NavIcon>
					</NavItem>
				</SideNav.Nav>
			</SideNav>
		</>
	)
}

export default Sidebar
