import sqlite3 from 'sqlite3';
import {Film, FilmType} from "@cinefilodelcazzo/types";
import {Database, open} from "sqlite";
import {log} from "../utils.js";


export class DatabaseService {
	private db: Database | undefined;

	constructor() {
		this.connect()
	}

	private async connect() {
		this.db = await open({
			filename: "database.sqlite",
			driver: sqlite3.Database,
		});

		this.init()
	}

	private init(): void {
		const createTableSQL = `
        CREATE TABLE IF NOT EXISTS films
        (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT                                   NOT NULL,
            thumbnail   BLOB                                   NULL,
            releaseDate DATETIME                               NOT NULL,
            endDate     DATETIME,
            type        TEXT CHECK (type IN ('film', 'anime')) NOT NULL,
            description TEXT,
            links       TEXT, -- Store JSON array of strings
            createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP
        )
		`;

		this.db?.run(createTableSQL)
			.then((err) => {
				log.info('Films table ready.');
			}).catch((err) => {
				log.error(`Error creating table: ${err.message}`);
		});
	}

	// Create a new film
	createFilm(film: Omit<Film, 'id'>): Promise<number> {
		return new Promise((resolve, reject) => {
			const sql = `
          INSERT INTO films (name, thumbnail, releaseDate, endDate, type, description, links)
          VALUES (?, ?, ?, ?, ?, ?, ?)
			`;

			this.db?.run(
				sql,
				[
					film.name,
					film.thumbnail,
					film.releaseDate.toISOString(),
					film.endDate ? film.endDate.toISOString() : null,
					film.type,
					film.description,
					JSON.stringify(film.links || []) // Store links as JSON string
				]).then((res) => {
				if (res.lastID) {
					resolve(res.lastID);
					log.success(`Film CREATED: id:${res.lastID} | ${film.name}`)
				}
			}).catch((err) => {
				reject(err);
				log.error(`Error creating film: ${err.message}`);
			})
		});
	}

	// Get all films
	getFilms(): Promise<Film[]> {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films ORDER BY createdAt DESC';

			this.db?.all(sql, [])
				.then(res => {
					const films: Film[] = res.map(row => ({
						id: row.id,
						name: row.name,
						thumbnail: row.thumbnail,
						releaseDate: new Date(row.releaseDate),
						endDate: row.endDate ? new Date(row.endDate) : null,
						type: row.type as FilmType,
						description: row.description,
						links: row.links ? JSON.parse(row.links) : [] // Parse JSON back to array
					}));
					resolve(films);
					log.success(`Films fetched: ${films.length}`)
				})
				.catch((err) =>{
					reject(err)
					log.error(`Error fetching films: ${err.message}`)
				})
		})
	}

	// Get film by ID
	getFilmById(id: number): Promise<Film | null> {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films WHERE id = ?';

			this.db?.get(sql, [id]).then((row: any) => {
				if (!row) {
					resolve(null);
				} else {
					const film: Film = {
						id: row.id,
						name: row.name,
						thumbnail: row.thumbnail,
						releaseDate: new Date(row.releaseDate),
						endDate: row.endDate ? new Date(row.endDate) : null,
						type: row.type as FilmType,
						description: row.description,
						links: row.links ? JSON.parse(row.links) : [] // Parse JSON back to array
					};
					resolve(film);
					log.success(`Film fetched: id: ${film.id} | ${film.name}`)
				}
			}).catch((err) =>{
				reject(err)
				log.error(`Error fetching film: ${err.message}`)
			});
		});
	}

	// Update film
	updateFilm(id: number, film: Partial<Omit<Film, 'id'>>): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const fields: string[] = [];
			const values: any[] = [];

			if (film.name !== undefined) {
				fields.push('name = ?');
				values.push(film.name);
			}
			if (film.thumbnail !== undefined) {
				fields.push('thumbnail = ?');
				values.push(film.thumbnail);
			}
			if (film.releaseDate !== undefined) {
				fields.push('releaseDate = ?');
				values.push(film.releaseDate.toISOString());
			}
			if (film.endDate !== undefined) {
				fields.push('endDate = ?');
				values.push(film.endDate ? film.endDate.toISOString() : null);
			}
			if (film.type !== undefined) {
				fields.push('type = ?');
				values.push(film.type);
			}
			if (film.description !== undefined) {
				fields.push('description = ?');
				values.push(film.description);
			}
			if (film.links !== undefined) {
				fields.push('links = ?');
				values.push(JSON.stringify(film.links)); // Store links as JSON string
			}

			fields.push('updatedAt = CURRENT_TIMESTAMP');
			values.push(id);

			const sql = `UPDATE films
                   SET ${fields.join(', ')}
                   WHERE id = ?`;

			this.db?.run(sql, values).then(res => {
				if (res.changes) {
					resolve(res.changes > 0);
					log.success(`Film updated: id: ${id} | ${film.name}`)
				}
			}).catch(err => {
				reject(err)
				log.error(`Error updating film: ${err.message}`)
			});
		})
	}

	// Delete film
	deleteFilm(id: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const sql = 'DELETE FROM films WHERE id = ?';

			this.db?.run(sql, [id]).then((res) => {
				if (res.changes) {
					resolve(res.changes > 0);
					log.success(`Film deleted: id: ${id}`)
				}
			}).catch(err =>{
				reject(err)
				log.error(`Error deleting film: ${err.message}`)
			});
		});
	}

	close(): void {
		this.db?.close().then(_ => {
			log.info('Database connection closed.');
		}).catch(err => {
			if (err) {
				log.error(`Error closing database: ${err.message}`);
			}
		})
	}
}