export enum FilmType{
	FILM= "film",
	ANIME="anime"
};

export interface Film {
	id?: number;
	name: string;
	thumbnail?: string ;
	releaseDate?: string | null;
	endDate?: string | null;
	type: FilmType;
	description: string | null;
	links?: Array<string>;
	seen? : boolean;
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

export interface IResult<T>{
	result: T
	message:string;
	error?:string;
}