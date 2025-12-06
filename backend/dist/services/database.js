import { libPrisma } from "../lib/libPrisma.js";
export class DatabaseService {
    // Create a new film
    createFilm(film) {
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
}
