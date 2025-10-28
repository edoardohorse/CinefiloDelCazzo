
import api from "@/config/axios";
import {CreateFilmFormData} from "@/schema/zod";

export const QUERY_FN_FETCH_FILM = '/films';

export async function fetchAllFilm(){
	const {data} = await api.get(QUERY_FN_FETCH_FILM);
	return data;
}

export async function createFilm(film: CreateFilmFormData){
	const {data} = await api.post(QUERY_FN_FETCH_FILM, film,{
		headers: {
			'Content-Type': 'multipart/form-data',
		}
	});
	return data;
}

