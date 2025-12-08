import axios from "axios";

const PORT = '10000'
const BASE_URL = `http://192.168.1.249:${PORT}/api`;


const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;