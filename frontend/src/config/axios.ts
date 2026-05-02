import axios from "axios";

// const PORT = '10000'

const BASE_API = import.meta.env.VITE_BASE_URL;

const api = axios.create({
	baseURL: BASE_API,
	headers: {
		'Content-Type': 'application/json',
	},

});

export default api;