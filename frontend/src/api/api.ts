
import api from "@/config/axios";
import {Film} from "../../../types/film";

export const QUERY_FN_FETCH_FILM = '/films';

export async function fetchAllFilm(){
	const {data} = await api.get(QUERY_FN_FETCH_FILM);
	return data;
}

export async function createFilm(film: Film){
	const {data} = await api.post(QUERY_FN_FETCH_FILM, film,{
		headers: {
			'Content-Type': 'multipart/form-data',
		}
	});
	return data;
}

