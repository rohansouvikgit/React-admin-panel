import axios from 'axios'
// const token = localStorage.getItem('token')

export default axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		'X-API-KEY': 'mynameisrohan123',
		Authorization: `Bearer ${localStorage.getItem('token')}`
	}
})
