import {Film} from "../../../../types/film";
import {capitalize, dateFormatted} from "@/utils/stringFormatter";
import {Card} from "@telegram-apps/telegram-ui";
import {Fragment} from "react";

type TCardFilmProps = {
	film: Film;
}

const CardDate = ({film}: TCardFilmProps) => {

	if (film.endDate) {
		return (
			<p>{dateFormatted(film.releaseDate)} - {dateFormatted(film.releaseDate)}</p>
		)
	}

	return (
		<p>{dateFormatted(film.releaseDate)}</p>
	)
}

const CardFilm = ({film}: TCardFilmProps) => {

	return (
		<Card type="ambient" key={film.id}>
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