import type { FC} from 'react';
import {useFilm} from "@/hooks/useFilm";
import {CardFilm} from "@/pages/Cinema/CardFilm";

export const CinemaPage: FC = () => {
	const {data} = useFilm.fetchAll()

  return (
		<>
	    {data?.map(film => <CardFilm film={film} key={film.id}/>)}
		</>
  );
};