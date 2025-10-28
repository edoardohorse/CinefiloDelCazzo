import {useMutation, useQuery} from "@tanstack/react-query";
import {createFilm, fetchAllFilm, QUERY_FN_FETCH_FILM} from "@/api/api";
import { Film} from "../../../types/film";


export const useFilm = {
	fetchAll: ()=> {
		return useQuery<Film[]>({
			queryKey: [QUERY_FN_FETCH_FILM],
			queryFn: () => fetchAllFilm(),
		})
	},
	createFilm: ()=>{
		return useMutation({
			mutationFn: (film: Film) => createFilm(film)
		})
	}
}

