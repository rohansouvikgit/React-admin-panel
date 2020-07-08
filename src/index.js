import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import PrivateRoute from './components/PrivateRoute'
import './styles.scss'
const Header = lazy(() => import('./components/Header'))
// const Sidebar = lazy(() => import('./components/Sidebar'))
const LoginPage = lazy(() => import('./components/LoginPage'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Category = lazy(() => import('./components/category/Category'))
const Brand = lazy(() => import('./components/brand/Brands'))
const Product = lazy(() => import('./components/product/Product'))
const InsertCategory = lazy(() => import('./components/category/InsertCategory'))
const InsertBrand = lazy(() => import('./components/brand/InsertBrand'))
const InsertProduct = lazy(() => import('./components/product/InsertProduct'))

const App = () => {
	return (
		<div>
			<ToastProvider>
				<Router>
					<Suspense fallback={<h2>Loading...</h2>}>
						<div>
							<PrivateRoute component={Header} />
							{/* <PrivateRoute component={Sidebar} /> */}
							<Switch>
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
