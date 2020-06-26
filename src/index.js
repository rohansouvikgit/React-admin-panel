import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import Header from './components/Header'
// import Sidebar from './components/Sidebar'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import Category from './components/Category'
import Product from './components/Product'
import InsertCategory from './components/InsertCategory'
import PrivateRoute from './components/PrivateRoute'
import './styles.css'

const App = () => {
	return (
		<div>
			<ToastProvider>
				<Router>
					<div>
						<PrivateRoute component={Header} />
						<Switch>
							{/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'App'} /> */}
							<Route path="/auth/login" exact component={LoginPage} />
							<PrivateRoute path="/dashboard" exact component={Dashboard} />
							<PrivateRoute path="/category" exact component={Category} />
							<PrivateRoute path="/category/insert" exact component={InsertCategory} />
							<PrivateRoute path="/product" exact component={Product} />
						</Switch>
					</div>
				</Router>
			</ToastProvider>

			{/* <div id="page-wrap">
				<h1>Click to show menu</h1>
			</div> */}
		</div>
	)
}

ReactDOM.render(<App />, document.querySelector('#root'))
