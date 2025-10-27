
import api from "@/config/axios";

export const QUERY_FN_FETCH_FILM = 'fetchAllFilm';

export async function fetchAllFilm(){
	const {data} = await api.get('/films');
	return data;
}


