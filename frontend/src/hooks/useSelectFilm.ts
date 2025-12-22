import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFilm} from "@/hooks/useFilm";
import {SwipeableHandlers, useSwipeable} from "react-swipeable";

type TIndexes = {
    prev: number
    next: number
}

export function useSelectFilm(idFilmSelected: string | undefined): SwipeableHandlers {
    const navigate = useNavigate();
    const [indexes, setIndexes] = useState<TIndexes>({
        prev: -1,
        next: -1
    })
    const {data: films} = useFilm.fetchAll()
    const handlers = useSwipeable({
        onSwipedLeft: () => { indexes.next !== -1 && navigate(`/list/${indexes.next}`)},
        onSwipedRight: () =>{  indexes.prev !== -1 && navigate(`/list/${indexes.prev}`)},
    });


    const recal = ()=> {
        if (films && idFilmSelected) {
            const nLength = films.length
            const index = films.findIndex(film => film.id === parseInt(idFilmSelected));
            if (index === 0) {
                setIndexes({prev: -1, next: films[1].id as number});
            } else if (index === nLength - 1) {
                setIndexes({prev: films[ nLength - 2].id as number, next: -1});
            } else {
                setIndexes({prev: films[index-1].id as number, next: films[index+1].id as number});
            }
        }
    }

    useEffect(recal, [films,idFilmSelected]);

    return handlers;
}