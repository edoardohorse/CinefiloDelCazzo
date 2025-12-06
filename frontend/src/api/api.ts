
import api from "@/config/axios";
import {CreateFilmFormData} from "@/schema/zod";
import {Film} from "@cinefilodelcazzo/types";

export const QUERY_FN_FETCH_FILM = '/films';
export const QUERY_FN_FETCH_FILM_BY_ID = (id:string)=>`/films/${id}`


export async function fetchAllFilm(){
	const {data} = await api.get(QUERY_FN_FETCH_FILM);
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

export async function deleteFilm(filmId: Film['id']){
		const {data} = await api.delete(`${QUERY_FN_FETCH_FILM}/${filmId}`);
	return data;
}

