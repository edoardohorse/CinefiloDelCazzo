import type { Request, Response } from 'express';
import { DatabaseService } from '../services/database.js';
import {CreateFilmRequest, Film, IResult, UpdateFilmRequest} from "@cinefilodelcazzo/types";
import {log} from "../utils.js";

const SUCCESS_CREATE_FILM = 'Film created successfully'
const SUCCESS_UPDATE_FILM = 'Film updated successfully'
const SUCCESS_DELETE_FILM = 'Film deleted successfully'

interface CreateFilmRequestWithFiles extends Request {
	body: CreateFilmRequest;
	files: {
		thumbnail: Express.Multer.File[];
	};
}

interface UpdateFilmRequestWithFiles extends Request {
	body: UpdateFilmRequest;
	files: {
		thumbnail: Express.Multer.File[];
	};
}

export class FilmController {
	private dbService: DatabaseService;

	constructor() {
		this.dbService = new DatabaseService();
	}

	validateCreateFilmRequest(req: CreateFilmRequestWithFiles, res: Response): {res: boolean, data: Film | null} {
		const {body, files} = req;
		// @ts-ignore
		let bufferThumbnail: Film["thumbnail"] | null = req.files?.thumbnail?.[0].buffer || null

		if(body == undefined) {
			log.error('Error creating film: body is empty');
			res.status(500).json({ error: 'Internal server error' });
			return {res: false, data: null};
		}

		if(body.name === undefined) {
			res.status(400).json({
				error: 'Missing required fields: name'
			});
			log.error('Film CREATE: Missing required fields: name')
			return {res: false, data: null};
		}
		if(body.name.trim() === ''){
			res.status(400).json({
				error: 'Name is empty'
			});
			return {res: false, data: null};
		}


		if(body.type === undefined) {
			res.status(400).json({
				error: 'Missing required fields: type'
			});
			log.error('Film CREATE: Missing required fields: type')
			return {res: false, data: null};
		}


		const filmData: CreateFilmRequest = req.body;
		const film = {
			name: filmData.name,
			thumbnail: bufferThumbnail?.toString('base64') || null,
			releaseDate: filmData.releaseDate? new Date(filmData.releaseDate): null,
			endDate: filmData.endDate ? new Date(filmData.endDate) : null,
			type: filmData.type,
			description: filmData.description || null,
			links: filmData.links || []
		};

		return {res: true, data: film}
	}

	validateEditFilmRequest(req: UpdateFilmRequestWithFiles, res: Response):  {res: boolean, data: Film | null}  {
		const {body: film, files} = req;

		let bufferThumbnail: Film["thumbnail"] | null = req.files?.thumbnail?.[0].buffer || null

		// @ts-ignore
		// let bufferThumbnail: Film["thumbnail"] | null = req.files.thumbnail[0].buffer || null

		delete film.id

		if(film.releaseDate == ""){
			film.releaseDate = null
		}

		if(film.endDate == ""){
			film.endDate = null
		}

		if(Object.keys(req.files).length == 0){
			film.thumbnail = undefined;
		}
		else{
			film.thumbnail = bufferThumbnail?.toString('base64')
		}

		return {res: true, data: film}
	}

	// Create a new film
	createFilm = async (req: CreateFilmRequestWithFiles, res: Response): Promise<void> => {
		try {
			// Validation
			const {res: resValidate, data:film}  = this.validateCreateFilmRequest(req, res);
			if(!resValidate || film == null) {
				return
			}

			const result = await this.dbService.createFilm(film);

			res.status(201).json({ result: result, message: SUCCESS_CREATE_FILM } as IResult<Film>);
		} catch (error) {
			log.error(`Error creating film: ${error}`);
			res.status(500).json({ error: 'Internal server error' });
		}
	};

	// Get all films
	getFilms = async (req: Request, res: Response): Promise<void> => {
		try {
			const films = await this.dbService.getFilms();

			// Convert thumbnail buffer to base64 for JSON response
			const filmsWithBase64 = films.map(film => ({
				...film,
				// @ts-ignore
				thumbnail: film?.thumbnail ? `data:image/png;base64,${(film?.thumbnail as Blob)?.toString('base64')}` : null
			}));

			res.json(filmsWithBase64);
		} catch (error) {
			log.error(`Error fetching films: ${error}`);
			res.status(500).json({ error: 'Internal server error' });
		}
	};

	// Get film by ID
	getFilmById = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);

			if (isNaN(id)) {
				res.status(400).json({ error: 'Invalid film ID' });
				return;
			}

			const film = await this.dbService.getFilmById(id);

			if (!film) {
				res.status(404).json({ error: 'Film not found' });
				return;
			}

			// Convert thumbnail buffer to base64
			const filmWithBase64 = {
				...film,
				// @ts-ignore
				thumbnail: `data:image/png;base64,${(film?.thumbnail as Blob)?.toString('base64')}`
			};

			res.json(filmWithBase64);
		} catch (error) {
			log.error(`Error fetching film: ${error}`);
			res.status(500).json({ error: 'Internal server error' });
		}
	};

	// Update film
	updateFilm = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);

			if (isNaN(id)) {
				res.status(400).json({ error: 'Invalid film ID' });
				return;
			}

			const {res: resValidate, data:film}  = this.validateEditFilmRequest(req, res);


			const updated = await this.dbService.updateFilm(id, film);

			if (!updated) {
				res.status(404).json({ error: 'Film not found' });
				return;
			}

			res.status(200).json({ result: updated, message: SUCCESS_UPDATE_FILM} as IResult<Film>);
		} catch (error) {
			log.error(`Error updating film: ${error}`);
			res.status(500).json({ error: 'Internal server error' });
		}
	};

	// Delete film
	deleteFilm = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);

			if (isNaN(id)) {
				res.status(400).json({ error: 'Invalid film ID' });
				return;
			}

			const deleted = await this.dbService.deleteFilm(id);

			if (!deleted) {
				res.status(404).json({ error: 'Film not found' });
				return;
			}

			res.status(200).json({ result: deleted, message: SUCCESS_DELETE_FILM } as IResult<Film>);
		} catch (error) {
			log.error(`Error deleting film: ${error}`);
			res.status(500).json({ error: 'Internal server error' });
		}
	};
}