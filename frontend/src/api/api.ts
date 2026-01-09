
import api from "@/config/axios";
import {CreateFilmFormData} from "@/schema/zod";
import {Film, TFilter, UpdateFilmRequest} from "@cinefilodelcazzo/types";

export const BASE_URL = 'films';
export const QUERY_FN_FETCH_FILM = `/${BASE_URL}`;
export const QUERY_FN_FETCH_FILM_BY_ID = (id:string)=>`/${BASE_URL}/${id}`
export const QUERY_FN_DELETE_FILM_BY_ID = (id:string)=>`/${BASE_URL}/${id}`
export const QUERY_FN_UPDATE_FILM_BY_ID = (id:string)=>`/${BASE_URL}/${id}`


export async function fetchAllFilm(sortedOptions?: TFilter){
	const {data} = await api.get(QUERY_FN_FETCH_FILM, {
		params: {
			...sortedOptions
		}
	});
	return data;
}

export async function fetchFilmById(id: string){
	const {data} = await api.get(QUERY_FN_FETCH_FILM_BY_ID(id));
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

export async function updateFilm(film: UpdateFilmRequest){
	const {data} = await api.put(QUERY_FN_UPDATE_FILM_BY_ID(String(film.id)), film,{
		headers: {
			'Content-Type': 'multipart/form-data',
		}
	});
	return data;
}

export async function deleteFilm(filmId: Film['id']){
		const {data} = await api.delete(QUERY_FN_DELETE_FILM_BY_ID(String(filmId)));
	return data;
}

