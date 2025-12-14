import { DatabaseService } from '../services/database.js';
import { log } from "../utils.js";
const SUCCESS_CREATE_FILM = 'Film created successfully';
const SUCCESS_UPDATE_FILM = 'Film updated successfully';
const SUCCESS_DELETE_FILM = 'Film deleted successfully';
export const FILM_ENDPOINTS = (BASE_URL) => ({
    getFilms: `/${BASE_URL}/films`,
    getFilmById: `/${BASE_URL}/films/:id`,
    createFilm: `/${BASE_URL}/films`,
    updateFilm: `/${BASE_URL}/films/:id`,
    deleteFilm: `/${BASE_URL}/films/:id`,
    health: `/${BASE_URL}/health`,
});
export class FilmController {
    dbService;
    _endpoints;
    constructor(baseUrl) {
        this.dbService = new DatabaseService();
        this._endpoints = FILM_ENDPOINTS(baseUrl);
    }
    endpoints() { return this._endpoints; }
    validateCreateFilmRequest(req, res) {
        const { body, files } = req;
        // @ts-ignore
        let bufferThumbnail = req.files?.thumbnail?.[0].buffer || null;
        if (body == undefined) {
            log.error('Error creating film: body is empty');
            res.status(500).json({ error: 'Internal server error' });
            return { res: false, data: null };
        }
        if (body.name === undefined) {
            res.status(400).json({
                error: 'Missing required fields: name'
            });
            log.error('Film CREATE: Missing required fields: name');
            return { res: false, data: null };
        }
        if (body.name.trim() === '') {
            res.status(400).json({
                error: 'Name is empty'
            });
            return { res: false, data: null };
        }
        if (body.type === undefined) {
            res.status(400).json({
                error: 'Missing required fields: type'
            });
            log.error('Film CREATE: Missing required fields: type');
            return { res: false, data: null };
        }
        const filmData = req.body;
        const film = {
            name: filmData.name,
            thumbnail: bufferThumbnail?.toString('base64') || null,
            releaseDate: filmData.releaseDate ? new Date(filmData.releaseDate) : null,
            endDate: filmData.endDate ? new Date(filmData.endDate) : null,
            type: filmData.type,
            description: filmData.description || null,
            links: filmData.links || []
        };
        // @ts-ignore
        return { res: true, data: film };
    }
    validateEditFilmRequest(req, res) {
        const { body: film, files } = req;
        let bufferThumbnail = req.files?.thumbnail?.[0].buffer || null;
        // @ts-ignore
        // let bufferThumbnail: Film["thumbnail"] | null = req.files.thumbnail[0].buffer || null
        delete film.id;
        if (film.releaseDate == "") {
            film.releaseDate = null;
        }
        if (film.endDate == "") {
            film.endDate = null;
        }
        if (Object.keys(req.files).length == 0) {
            film.thumbnail = undefined;
        }
        else {
            film.thumbnail = bufferThumbnail?.toString('base64');
        }
        // @ts-ignore
        return { res: true, data: film };
    }
    // Create a new film
    createFilm = async (req, res) => {
        try {
            // Validation
            const { res: resValidate, data: film } = this.validateCreateFilmRequest(req, res);
            if (!resValidate || film == null) {
                return;
            }
            const result = await this.dbService.createFilm(film);
            res.status(201).json({ result: result, message: SUCCESS_CREATE_FILM });
        }
        catch (error) {
            log.error(`Error creating film: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    // Get all films
    getFilms = async (req, res) => {
        try {
            const films = await this.dbService.getFilms();
            // Convert thumbnail buffer to base64 for JSON response
            const filmsWithBase64 = films.map(film => ({
                ...film,
                // @ts-ignore
                thumbnail: film?.thumbnail ? `data:image/png;base64,${film?.thumbnail?.toString('base64')}` : null
            }));
            log.success(`Films fetched: ${filmsWithBase64.length}`);
            res.json(filmsWithBase64);
        }
        catch (error) {
            log.error(`Error fetching films: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    // Get film by ID
    getFilmById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid film ID' });
                return;
            }
            const film = await this.dbService.getFilmById(id);
            if (!film) {
                log.error(`Film not found`);
                res.status(404).json({ error: 'Film not found' });
                return;
            }
            // Convert thumbnail buffer to base64
            const filmWithBase64 = {
                ...film,
                // @ts-ignore
                thumbnail: `data:image/png;base64,${film?.thumbnail?.toString('base64')}`
            };
            log.success(`Film fetched: ${filmWithBase64.id}`);
            res.json(filmWithBase64);
        }
        catch (error) {
            log.error(`Error fetching film: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    // Update film
    updateFilm = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid film ID' });
                return;
            }
            const { res: resValidate, data: film } = this.validateEditFilmRequest(req, res);
            let updated = null;
            if (film != null) {
                updated = await this.dbService.updateFilm(id, film);
            }
            if (!updated) {
                res.status(404).json({ error: 'Film not found' });
                return;
            }
            res.status(200).json({ result: updated, message: SUCCESS_UPDATE_FILM });
        }
        catch (error) {
            log.error(`Error updating film: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    // Delete film
    deleteFilm = async (req, res) => {
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
            res.status(200).json({ result: deleted, message: SUCCESS_DELETE_FILM });
        }
        catch (error) {
            log.error(`Error deleting film: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
    checkConnection = async () => {
        return await this.dbService.checkConnection();
    };
}
