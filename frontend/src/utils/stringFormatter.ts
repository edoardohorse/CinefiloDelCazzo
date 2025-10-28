export function dateFormatted(dateStr: Date){
	const date = new Date(dateStr);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function capitalize(str: string){
	return str.charAt(0).toUpperCase() + str.slice(1);
}