export enum FilmType{
	FILM= "film",
	ANIME="anime"
};

export type Film ={
	id?: number;
	name: string;
	thumbnail?: string ;
	release_date?: string | null;
	end_date?: string | null;
	type: FilmType;
	description: string | null;
	links?: Array<string>;
	seen? : boolean;
	created_at: Date,
	updated_at: Date
}

export type TKeyFilter = keyof Film;
export type TFilter = {
	sortedBy:TKeyFilter,
	order:'asc'|'desc'
}

export interface CreateFilmRequest {
	name: string;
	thumbnail?: string;
	releaseDate?: string | null;
	endDate?: string | null;
	type: FilmType;
	description?: string | null;
	links?: Array<string>;
}


export interface UpdateFilmRequest {
	id?: number;
	name?: string;
	thumbnail?: string;
	releaseDate?: string | null;
	endDate?: string | null;
	type?: FilmType;
	description?: string | null;
	links?: Array<string>;
}

export type IResult<T> ={
	result: T
	message:string;
	error?:string;
}