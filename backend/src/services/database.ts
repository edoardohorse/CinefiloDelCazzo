import sqlite3 from 'sqlite3';
import type { Film, FilmType } from '../../../types/film.ts';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = path.join(__dirname, '../../films.db');

export class DatabaseService {
	private db: sqlite3.Database;

	constructor() {
		this.db = new sqlite3.Database(DB_PATH, (err) => {
			if (err) {
				console.error('Error opening database:', err.message);
			} else {
				console.log('Connected to SQLite database.');
				this.init();
			}
		});
	}

	private init(): void {
		const createTableSQL = `
			CREATE TABLE IF NOT EXISTS films (
			 id INTEGER PRIMARY KEY AUTOINCREMENT,
			 name TEXT NOT NULL,
			 thumbnail BLOB NULL,
			 releaseDate DATETIME NOT NULL,
			 endDate DATETIME,
			 type TEXT CHECK(type IN ('film', 'anime')) NOT NULL,
			 description TEXT,
			 links TEXT, -- Store JSON array of strings
			 createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			 updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`;

		this.db.run(createTableSQL, (err) => {
			if (err) {
				console.error('Error creating table:', err.message);
			} else {
				console.log('Films table ready.');
			}
		});
	}

	// Create a new film
	createFilm(film: Omit<Film, 'id'>): Promise<number> {
		return new Promise((resolve, reject) => {
			const sql = `
				INSERT INTO films (name, thumbnail, releaseDate, endDate, type, description, links)
				VALUES (?, ?, ?, ?, ?, ?, ?)
			`;

			this.db.run(
				sql,
				[
					film.name,
					film.thumbnail,
					film.releaseDate.toISOString(),
					film.endDate ? film.endDate.toISOString() : null,
					film.type,
					film.description,
					JSON.stringify(film.links || []) // Store links as JSON string
				],
				function(err) {
					if (err) {
						reject(err);
					} else {
						resolve(this.lastID);
					}
				}
			);
		});
	}

	// Get all films
	getFilms(): Promise<Film[]> {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films ORDER BY createdAt DESC';

			this.db.all(sql, [], (err, rows: any[]) => {
				if (err) {
					reject(err);
				} else {
					const films: Film[] = rows.map(row => ({
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
				}
			});
		});
	}

	// Get film by ID
	getFilmById(id: number): Promise<Film | null> {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films WHERE id = ?';

			this.db.get(sql, [id], (err, row: any) => {
				if (err) {
					reject(err);
				} else if (!row) {
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
				}
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

			const sql = `UPDATE films SET ${fields.join(', ')} WHERE id = ?`;

			this.db.run(sql, values, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve(this.changes > 0);
				}
			});
		});
	}

	// Delete film
	deleteFilm(id: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const sql = 'DELETE FROM films WHERE id = ?';

			this.db.run(sql, [id], function(err) {
				if (err) {
					reject(err);
				} else {
					resolve(this.changes > 0);
				}
			});
		});
	}

	close(): void {
		this.db.close((err) => {
			if (err) {
				console.error('Error closing database:', err.message);
			} else {
				console.log('Database connection closed.');
			}
		});
	}
}