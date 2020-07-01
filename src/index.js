import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
// import Sidebar from './components/Sidebar'
import PrivateRoute from './components/PrivateRoute'
import './styles.css'
const Header = lazy(() => import('./components/Header'))
const LoginPage = lazy(() => import('./components/LoginPage'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Category = lazy(() => import('./components/Category'))
const Brand = lazy(() => import('./components/Brands'))
const Product = lazy(() => import('./components/Product'))
const InsertCategory = lazy(() => import('./components/InsertCategory'))
const InsertBrand = lazy(() => import('./components/InsertBrand'))
const InsertProduct = lazy(() => import('./components/InsertProduct'))

const App = () => {
	return (
		<div>
			<ToastProvider>
				<Router>
					<Suspense fallback={<h2>Loading...</h2>}>
						<div>
							<PrivateRoute component={Header} />
							<Switch>
								{/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'App'} /> */}
								<Route exact path="/" component={() => <Redirect to="/Dashboard" />} />
								<Route path="/auth/login" exact component={LoginPage} />
								<PrivateRoute path="/dashboard" exact component={Dashboard} />
								<PrivateRoute path="/category" exact component={Category} />
								<PrivateRoute path="/category/insert" exact component={InsertCategory} />
								<PrivateRoute path="/brand" exact component={Brand} />
								<PrivateRoute path="/brand/insert" exact component={InsertBrand} />
								<PrivateRoute path="/product" exact component={Product} />
								<PrivateRoute path="/product/insert" exact component={InsertProduct} />
							</Switch>
						</div>
					</Suspense>
				</Router>
			</ToastProvider>

			{/* <div id="page-wrap">
				<h1>Click to show menu</h1>
			</div> */}
		</div>
	)
}

ReactDOM.render(<App />, document.querySelector('#root'))
