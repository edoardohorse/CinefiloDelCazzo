import {useNavigate, useParams} from "react-router-dom";
import {useFilm} from "@/hooks/useFilm";
import {Button, Headline, LargeTitle, Spinner} from "@telegram-apps/telegram-ui";
import {dateFormatted} from "@/utils/stringFormatter";
import {ChipLinks} from "@/components/Film/ChipLinks";
import '@/css/film.css'
import {snackbar} from "@/store/snackbar-store";
import {FC} from "react";



const ViewFilm:FC<{id?:string}> = ({id} :{ id?: string }) => {

	const navigate = useNavigate();

	if (id == undefined) {
		return null
	}

	const {data: film, isError} = useFilm.fetchFilmById(id)
	const deleteFilm = useFilm.deleteFilmById()

	if(isError){
		navigate("/")
	}

	if (film == undefined) {
		return (<Spinner size={"l"}/>)
	}

	const handleDelete = async() => {
		if(id == undefined) return
		if (window.confirm('Confirm?')) {
			const res = await deleteFilm.mutateAsync(parseInt(id))

			snackbar.success(res.message)
			navigate("/list")
		}
	}

	const handleRedirectToEdit = ()=>{
		navigate(`/edit/${id}`)
	}

	return (
		<div className="film">
			<div className="film-info-wrapper">
				<div className="film-info">
					<div className="film-info-body">
					<div>
						<LargeTitle weight={"3"}>{film.name}</LargeTitle>
					</div>
					<div>
						{film?.releaseDate && <Headline weight={"1"}>{dateFormatted(film.releaseDate)}</Headline>}
						{film?.endDate && <Headline weight={"1"}>{dateFormatted(film.endDate)}</Headline>}
					</div>
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
			<img src={`${film.thumbnail}`} className="film-thumbnail" alt={'film'}/>
		</div>
	)
}

export default ViewFilm;