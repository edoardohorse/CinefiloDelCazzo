import {Film} from "@cinefilodelcazzo/types";
import {log} from "../utils.js";
import {libPrisma} from "../lib/libPrisma.js";


export class DatabaseService {


	// Create a new film
	createFilm(film: Omit<Film, 'id'>) {
		// log.info(`Trying ${JSON.stringify(film)}`);

		return libPrisma.film.create({
			data: {
				name: film.name,
				thumbnail: film?.thumbnail,
				releaseDate: film?.releaseDate?.toISOString(),
				endDate: film?.endDate?.toISOString(),
				type: film.type,
				links: film.links,
			}
		})
			/*.then((res) => {
			if (res.id) {
				log.success(`Film CREATED: id:${res.id} | ${film.name}`)
			}
		}).catch((err) => {
			log.error(`Error creating film: ${err.message}`);
		})*/

	}

	getFilms() {
		return libPrisma.film.findMany()
			/*.then(films => {
				log.success(`Films fetched: ${films.length}`)
			}).catch(err => log.error(`Error fetching films: ${err.message}`))*/
	}

	getFilmById(id: number) {
		return libPrisma.film.findFirst({
			where: {
				id: id
			}
		})
			/*.then(film => {
			log.success(`Film fetched: id: ${film?.id} | ${film?.name}`)
		}).catch(err => log.error(`Error fetching film: ${err.message}`))*/

	}

	// Delete film
	deleteFilm(id: number){
		return libPrisma.film.delete({where: {id: id}})
	}

	// Get all films
	/*	getFilms(): Promise<Film[]> {
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
	 }*/

	/*	// Get film by ID
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



	 close(): void {
	 this.db?.close().then(_ => {
	 log.info('Database connection closed.');
	 }).catch(err => {
	 if (err) {
	 log.error(`Error closing database: ${err.message}`);
	 }
	 })
	 }*/
}