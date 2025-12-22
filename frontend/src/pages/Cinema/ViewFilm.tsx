import {useNavigate} from "react-router-dom";
import {useFilm} from "@/hooks/useFilm";
import {Button, LargeTitle, Title} from "@telegram-apps/telegram-ui";
import {formatReleaseAndEndDate} from "@/utils/stringFormatter";
import {ChipLinks} from "@/components/Film/ChipLinks";
import '@/css/film.css'
import {snackbar} from "@/store/snackbar-store";
import {FC} from "react";
import {LoadingPage} from "@/pages/LoadingPage";
import {FilmImage} from "@/components/Film/FilmImage";


const ViewFilm: FC<{ id?: string }> = ({id}: { id?: string }) => {

    const navigate = useNavigate();

    if (id == undefined) {
        return null
    }

    const {data: films, isError} = useFilm.fetchAll()
    const deleteFilm = useFilm.deleteFilmById()

    if (isError) {
        navigate("/")
    }

    const film = films?.find(f => String(f.id) === id)

    if (film == undefined) {
        return (<LoadingPage/>)
    }

    const handleDelete = async () => {
        if (id == undefined) return
        if (window.confirm('Confirm?')) {
            const res = await deleteFilm.mutateAsync(parseInt(id))

            snackbar.success(res.message)
            navigate("/list")
        }
    }

    const handleRedirectToEdit = () => {
        navigate(`/edit/${id}`)
    }

    return (
        <div className="film">
            <FilmImage src={film.thumbnail} blured={true} className="film-thumbnail"
                       classNameBg="film-thumbnail-background"/>
            <div className={'film-header'}>
                <div className={'film-title-wrapper'}>
                    <LargeTitle className={'film-title'}>{film.name}</LargeTitle>
                    <Title className={'film-subtitle'}>{formatReleaseAndEndDate(film.releaseDate, film.endDate)}</Title>
                </div>

            </div>
            <div className={'film-actions'}>
                <div className={'film-chips'}>
                    {film.links && <ChipLinks links={film.links}/>}
                </div>
                <div className="film-info-actions">
                    <Button
                        mode="bezeled"
                        size="l"
                        type="submit"
                        onClick={handleRedirectToEdit}
                    >
                        Modifica
                    </Button>
                    <Button
                        mode="bezeled"
                        size="l"
                        type="submit"
                        className={'btn-erase'}
                        onClick={handleDelete}
                    >
                        Elimina
                    </Button>

                </div>
            </div>

        </div>
    )
}

export default ViewFilm;