import axios from "axios";

// const PORT = '10000'
const BASE_DOMAIN = '204.216.220.56'
const BASE_URL = `${BASE_DOMAIN}/api`;


const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;