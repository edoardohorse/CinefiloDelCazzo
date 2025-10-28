import type {FC} from 'react';
import {useFilm} from "@/hooks/useFilm";
import {CardFilm} from "@/components/Film/CardFilm";
import {Spinner, Text} from "@telegram-apps/telegram-ui";

export const CinemaPage: FC = () => {
    const {data, isFetching} = useFilm.fetchAll()

    if (isFetching) {
        return (
            <Spinner size="l"/>
        )
    }

    if (data?.length == 0) {
        return (
            <Text>Nessun film</Text>
        )
    }

    return (
        <>
            {data?.map(film => <CardFilm film={film} key={film.id}/>)}
        </>
    );
};