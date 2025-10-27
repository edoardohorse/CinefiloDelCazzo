export type FilmType = 'film' | 'anime';

export interface Film {
	id?: number;
	name: string;
	thumbnail: Buffer;
	releaseDate: Date;
	endDate: Date | null;
	type: FilmType;
	description: string | null;
}

export interface CreateFilmRequest {
	name: string;
	thumbnail: Buffer;
	releaseDate: string;
	endDate?: string | null;
	type: FilmType;
	description?: string | null;
}

export interface UpdateFilmRequest {
	name?: string;
	thumbnail?: Buffer;
	releaseDate?: string;
	endDate?: string | null;
	type?: FilmType;
	description?: string | null;
}