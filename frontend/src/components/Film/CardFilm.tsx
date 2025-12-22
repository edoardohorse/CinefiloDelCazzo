	import {Film} from "../../../../types";
import {capitalize, dateFormatted} from "@/utils/stringFormatter";
import {Card} from "@telegram-apps/telegram-ui";
import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

type TCardFilmProps = {
	film: Film;
}

const CardDate = ({film}: TCardFilmProps) => {

	if(film?.releaseDate == undefined){
		return null;
	}

	if (film.endDate) {
		return (
			<p>{dateFormatted(film.releaseDate)} - {dateFormatted(film.endDate)}</p>
		)
	}

	return (
		<p>{dateFormatted(film.releaseDate)}</p>
	)
}

const CardFilm = ({film}: TCardFilmProps) => {
	const navigate  = useNavigate();

	const onClickCard = ()=>{
		navigate(`/list/${film.id}`);
		// showViewFilm(film.id)
	}
	return (
		<Card type="ambient" key={film.id} className={'card-film'} onClick={onClickCard} style={{ cursor: "pointer", minWidth:"30vw" }}>
			<Fragment>
				<Card.Chip readOnly>{capitalize(film.type)}</Card.Chip>
				<img
					alt="Dog"
					src={`${film.thumbnail}`}
					style={{
						display: 'block',
						height: 400,
						objectFit: 'cover',
						width: 300
					}}
				/>
				<Card.Cell subtitle={<CardDate film={film}/>}>{film.name}</Card.Cell>
			</Fragment>
		</Card>
	)
}

export {CardFilm}