import {FormFilm} from "@/components/Film/FormFilm";
import { useFilm} from "@/hooks/useFilm";
import {useParams} from "react-router-dom";
import {Spinner} from "@telegram-apps/telegram-ui";

export const EditFilm = () => {

	const params = useParams<{ id: string }>()

	if (params.id == undefined) {
		return null
	}

	const {data: film, isFetching} = useFilm.fetchFilmById(params.id)

	if(isFetching){
		return (<Spinner size={"l"}/>)
	}

	if(film){
		film.releaseDate = film?.releaseDate? String(film?.releaseDate).split("T")[0]: '';
		film.endDate = film?.endDate? String(film?.endDate).split("T")[0]: '';
		return <FormFilm film={film} type={'update'}/>
	}
}