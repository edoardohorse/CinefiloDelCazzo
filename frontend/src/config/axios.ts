import axios from "axios";

const PORT = '10000'
const BASE_URL = `http://localhost:${PORT}/api`;


const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;