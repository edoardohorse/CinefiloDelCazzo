export declare enum FilmType {
    FILM = "film",
    ANIME = "anime"
}
export interface Film {
    id?: number;
    name: string;
    thumbnail?: Blob | string;
    releaseDate: Date;
    endDate: Date | null;
    type: FilmType;
    description: string | null;
    links?: Array<string>;
}
export interface CreateFilmRequest {
    name: string;
    thumbnail: Blob;
    releaseDate: string;
    endDate?: string | null;
    type: FilmType;
    description?: string | null;
    links?: Array<string>;
}
export interface UpdateFilmRequest {
    name?: string;
    thumbnail?: Blob;
    releaseDate?: string;
    endDate?: string | null;
    type?: FilmType;
    description?: string | null;
    links?: Array<string>;
}
