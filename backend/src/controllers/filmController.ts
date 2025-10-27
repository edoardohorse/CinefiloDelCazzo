import { Request, Response } from 'express';
import { DatabaseService } from '../services/database';
import { CreateFilmRequest, UpdateFilmRequest } from '../types/film';

export class FilmController {
	private dbService: DatabaseService;

	constructor() {
		this.dbService = new DatabaseService();
	}

	// Create a new film
	createFilm = async (req: Request, res: Response): Promise<void> => {
		try {
			const filmData: CreateFilmRequest = req.body;

			// Validation
			if (!filmData.name || !filmData.thumbnail || !filmData.releaseDate || !filmData.type) {
				res.status(400).json({
					error: 'Missing required fields: name, thumbnail, releaseDate, type'
				});
				return;
			}

			if (!['film', 'anime'].includes(filmData.type)) {
				res.status(400).json({
					error: 'Type must be either "film" or "anime"'
				});
				return;
			}

			const film = {
				name: filmData.name,
				thumbnail: filmData.thumbnail,
				releaseDate: new Date(filmData.releaseDate),
				endDate: filmData.endDate ? new Date(filmData.endDate) : null,
				type: filmData.type,
				description: filmData.description || null
			};

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
				thumbnail: film.thumbnail.toString('base64')
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