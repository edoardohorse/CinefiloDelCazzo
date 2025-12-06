import {redirect, useNavigate, useParams} from "react-router-dom";
import {useFilm} from "@/hooks/useFilm";
import {Button, Headline, LargeTitle, Spinner} from "@telegram-apps/telegram-ui";
import {dateFormatted} from "@/utils/stringFormatter";
import {ChipLinks} from "@/components/Film/ChipLinks";
import '@/css/film.css'
import {snackbar} from "@/store/snackbar-store";



const ViewFilm = () => {

	const params = useParams<{ id: string }>()


	if (params.id == undefined) {
		return null
	}
	const {data: film, isError} = useFilm.fetchFilmById(params.id)
	const deleteFilm = useFilm.deleteFilmById()
	const navigate = useNavigate();

	//<editor-fold desc="ViewFilm.tsx > ViewFilm - line 22 at 06/12/2025 12:29:14">
	console.group('ViewFilm.tsx > ViewFilm - line 22 at 06/12/2025 12:29:14');
	console.debug(isError);
	console.groupEnd();
	//</editor-fold>
	if(isError){
		navigate("/")
	}

	if (film == undefined) {
		return (<Spinner size={"l"}/>)
	}

	const handleDelete = async() => {
		if(params?.id == undefined) return
		if (window.confirm('Confirm?')) {
			const res = await deleteFilm.mutateAsync(parseInt(params.id))

			snackbar.success(res.message)
			navigate("/list")
		}
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
						{film.endDate && <Headline weight={"1"}>{dateFormatted(film.endDate)}</Headline>}
					</div>
					{film.links && <ChipLinks links={film.links}/>}
					</div>
					<div className="film-info-actions">
						<Button
							mode="bezeled"
							size="l"
							type="submit"
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