import {FormFilm} from "@/components/Film/FormFilm";
import { useFilm} from "@/hooks/useFilm";
import {useParams} from "react-router-dom";
import {Spinner} from "@telegram-apps/telegram-ui";
import type {FC} from "react";
import {LoadingPage} from "@/pages/LoadingPage";

export const EditFilm: FC = () => {

	const params = useParams<{ id: string }>()

	if (params.id == undefined) {
		return null
	}

	const {data: films, isFetching} = useFilm.fetchAll()

	const film = films?.find(f=>f.id == params.id)

	if(isFetching){
		return (<LoadingPage/>)
	}

	if(film){
		film.releaseDate = film?.releaseDate? String(film?.releaseDate).split("T")[0]: '';
		film.endDate = film?.endDate? String(film?.endDate).split("T")[0]: '';
		return <FormFilm film={film} type={'update'}/>
	}
}