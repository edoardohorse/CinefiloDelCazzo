import { log } from "../utils.js";
import { libPrisma } from "../lib/libPrisma.js";
export class DatabaseService {
    // Create a new film
    createFilm(film) {
        // log.info(`Trying ${JSON.stringify(film)}`);
        return libPrisma.film.create({
            data: {
                name: film.name,
                thumbnail: film?.thumbnail,
                releaseDate: film?.releaseDate,
                endDate: film?.endDate,
                type: film.type,
                links: film.links,
            }
        });
        /*.then((res) => {
        if (res.id) {
            log.success(`Film CREATED: id:${res.id} | ${film.name}`)
        }
    }).catch((err) => {
        log.error(`Error creating film: ${err.message}`);
    })*/
    }
    getFilms() {
        return libPrisma.film.findMany();
        /*.then(films => {
            log.success(`Films fetched: ${films.length}`)
        }).catch(err => log.error(`Error fetching films: ${err.message}`))*/
    }
    getFilmById(id) {
        return libPrisma.film.findFirst({
            where: {
                id: id
            }
        });
        /*.then(film => {
        log.success(`Film fetched: id: ${film?.id} | ${film?.name}`)
    }).catch(err => log.error(`Error fetching film: ${err.message}`))*/
    }
    // Update film
    updateFilm(id, film) {
        return libPrisma.film.update({
            where: {
                id: id
            },
            data: { ...film }
        });
    }
    // Delete film
    deleteFilm(id) {
        return libPrisma.film.delete({ where: { id: id } });
    }
    async checkConnection() {
        let check = true;
        try {
            // Method 1: Raw query
            await libPrisma.$queryRaw `SELECT 1`;
            log.success('Database connection successful');
            // Method 2: Using $connect (implicitly happens on first query)
            await libPrisma.$connect();
            log.success('Connected to database');
        }
        catch (error) {
            log.error(`Database connection failed: ${error}`);
            check = false;
        }
        finally {
            await libPrisma.$disconnect();
        }
        return new Promise(resolve => { resolve(check); });
    }
}
