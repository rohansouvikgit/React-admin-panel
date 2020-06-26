import axios from 'axios'

export default axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		'X-API-KEY': 'mynameisrohan123'
	}
})
