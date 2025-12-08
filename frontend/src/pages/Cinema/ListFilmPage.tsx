import {FC} from 'react';
import {useFilm} from "@/hooks/useFilm";
import {CardFilm} from "@/components/Film/CardFilm";
import { Placeholder, Spinner} from "@telegram-apps/telegram-ui";
import {LoadingPage} from "@/pages/LoadingPage";


export const ListFilmPage: FC = () => {
	const {data, isFetching} = useFilm.fetchAll()

	if (isFetching) {
		return (
			<LoadingPage/>
		)
	}

	if (data?.length == 0) {
		return (
			<Placeholder title={"Nessun film"}/>
		)
	}

	return (
		<div className={"list-wrapper"}>
			{data?.map(film => <CardFilm film={film} key={film.id}/>)}
		</div>
	);
};