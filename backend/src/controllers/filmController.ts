import type { Request, Response } from 'express';
import { DatabaseService } from '../services/database.ts';
import type {CreateFilmRequest, Film, UpdateFilmRequest} from '../../../types/film.ts';

interface CreateFilmRequestWithFiles extends Request {
	body: CreateFilmRequest;
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
		let bufferThumbnail: Film["thumbnail"] | null = req.files.thumbnail[0].buffer || null

		if(body == undefined) {
			console.error('Error creating film: body is empty');
			res.status(500).json({ error: 'Internal server error' });
			return {res: false, data: null};
		}


		if(body.name === undefined) {
			res.status(400).json({
				error: 'Missing required fields: name'
			});
			return {res: false, data: null};
		}
		if(body.name.trim() === ''){
			res.status(400).json({
				error: 'Name is empty'
			});
			return {res: false, data: null};
		}

		if(bufferThumbnail == null ) {
			res.status(400).json({
				error: 'Missing required fields: thumbnail'
			});
			return {res: false, data: null};
		}

		if(body.releaseDate === undefined) {
			res.status(400).json({
				error: 'Missing required fields: releaseDate'
			});
			return {res: false, data: null};
		}

		if(body.type === undefined) {
			res.status(400).json({
				error: 'Missing required fields: type'
			});
			return {res: false, data: null};
		}


		const filmData: CreateFilmRequest = req.body;
		const film = {
			name: filmData.name,
			thumbnail: bufferThumbnail,
			releaseDate: new Date(filmData.releaseDate),
			endDate: filmData.endDate ? new Date(filmData.endDate) : null,
			type: filmData.type,
			description: filmData.description || null
		};

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

			const id = await this.dbService.createFilm(film);
			res.status(201).json({ id, message: 'Film created successfully' });
		} catch (error) {
			console.error('Error creating film:', error);
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
				thumbnail: `data:image/png;base64,${(film?.thumbnail as Blob)?.toString('base64')}`
			}));

			res.json(filmsWithBase64);
		} catch (error) {
			console.error('Error fetching films:', error);
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
				thumbnail: film.thumbnail.toString('base64')
			};

			res.json(filmWithBase64);
		} catch (error) {
			console.error('Error fetching film:', error);
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

			const updateData: UpdateFilmRequest = req.body;

			// Validate type if provided
			if (updateData.type && !['film', 'anime'].includes(updateData.type)) {
				res.status(400).json({
					error: 'Type must be either "film" or "anime"'
				});
				return;
			}

			const filmUpdate: any = {};

			if (updateData.name !== undefined) filmUpdate.name = updateData.name;
			if (updateData.thumbnail !== undefined) filmUpdate.thumbnail = updateData.thumbnail;
			if (updateData.releaseDate !== undefined) filmUpdate.releaseDate = new Date(updateData.releaseDate);
			if (updateData.endDate !== undefined) filmUpdate.endDate = updateData.endDate ? new Date(updateData.endDate) : null;
			if (updateData.type !== undefined) filmUpdate.type = updateData.type;
			if (updateData.description !== undefined) filmUpdate.description = updateData.description;

			const updated = await this.dbService.updateFilm(id, filmUpdate);

			if (!updated) {
				res.status(404).json({ error: 'Film not found' });
				return;
			}

			res.json({ message: 'Film updated successfully' });
		} catch (error) {
			console.error('Error updating film:', error);
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

			res.json({ message: 'Film deleted successfully' });
		} catch (error) {
			console.error('Error deleting film:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	};
}