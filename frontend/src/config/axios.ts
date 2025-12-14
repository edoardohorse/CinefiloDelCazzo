import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_API;
const DOMAIN = import.meta.env.VITE_DOMAIN
const API_URL = `https://${DOMAIN}/${BASE_API}`;

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;