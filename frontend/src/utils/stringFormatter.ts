import {Film} from "@cinefilodelcazzo/types";

export function dateFormatted(dateStr: string){
	const date = new Date(dateStr);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function capitalize(str: string){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getHostName(link: string){
	return (new URL(link)).hostname;
}

export function formatReleaseAndEndDate(releaseDate: Film['releaseDate'], endDate:Film['endDate']){
	if(releaseDate === null || releaseDate === undefined){ return ''; }

	const endDateStr = endDate? ` - ${dateFormatted(endDate)}` : '';

	return `${dateFormatted(releaseDate)}${endDateStr}`;
}