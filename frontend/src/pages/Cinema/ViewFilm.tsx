import {useParams} from "react-router-dom";
import {useFilm} from "@/hooks/useFilm";
import {Headline, LargeTitle, Spinner} from "@telegram-apps/telegram-ui";
import {dateFormatted} from "@/utils/stringFormatter";
import {ChipLinks} from "@/components/Film/ChipLinks";
import '@/css/film.css'

const ViewFilm = () => {

	const params = useParams<{ id: string }>()

	if (params.id == undefined) {
		return null
	}
	const {data: film} = useFilm.fetchFilmById(params.id)


	if (film == undefined) {
		return (<Spinner size={"l"}/>)
	}

	return (
		<div className="film">
			<div className="film-info-wrapper">
				<div className="film-info">
					<div>
						<LargeTitle weight={"3"}>{film.name}</LargeTitle>
					</div>
					<div>
						{film?.releaseDate && <Headline weight={"1"}>{dateFormatted(film.releaseDate)}</Headline>}
						{film.endDate && <Headline weight={"1"}>{dateFormatted(film.endDate)}</Headline>}
					</div>
					{film.links && <ChipLinks links={film.links}/>}
				</div>
			</div>
			<img src={`${film.thumbnail}`} className="film-thumbnail" alt={'film'}/>
		</div>
	)
}

export default ViewFilm;