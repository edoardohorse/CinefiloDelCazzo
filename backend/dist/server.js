import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { FilmController } from "./controllers/filmController.js";
import swaggerOptions from "./config/swagger.js";
import { log } from "./utils.js";
// Configure multer
const upload = multer();
const app = express();
const PORT = process.env.PORT || 10000;
const DOMAIN = process.env.VITE_DOMAIN;
const BASE_URL = process.env.VITE_BASE_API || "";
// Initialize Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Middleware
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
if (BASE_URL == '') {
    log.error('BASE_URL environment variable not set. Exiting...');
    process.exit(1);
}
// Swagger UI
app.use(`/${BASE_URL}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Initialize controller
const filmController = new FilmController(BASE_URL);
const endpoints = filmController.endpoints();
//<editor-fold desc="server.ts >  - line 48 at 14/12/2025 23:12:42">
console.group('server.ts >  - line 48 at 14/12/2025 23:12:42');
console.debug(endpoints);
console.groupEnd();
//</editor-fold>
// app.use(express.static(path.join(dirFrontend, 'dist')));
/**
 * @swagger
 * /cinefilo/films:
 *   get:
 *     summary: Get all films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: List of all films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
app.get(endpoints.getFilms, filmController.getFilms);
/**
 * @swagger
 * /cinefilo/films/{id}:
 *   get:
 *     summary: Get a film by ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Film ID
 *     responses:
 *       200:
 *         description: Film details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       400:
 *         description: Invalid film ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Invalid film ID
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
app.get(endpoints.getFilmById, filmController.getFilmById);
/**
 * @swagger
 * /cinefilo/films:
 *   post:
 *     summary: Create a new film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFilmRequest'
 *     responses:
 *       201:
 *         description: Film created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created film
 *                 message:
 *                   type: string
 *                   example: Film created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// @ts-ignore
app.post(endpoints.createFilm, upload.fields([{ name: "thumbnail", maxCount: 1 }]), filmController.createFilm);
/**
 * @swagger
 * /cinefilo/films/{id}:
 *   put:
 *     summary: Update a film
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Film ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFilmRequest'
 *     responses:
 *       200:
 *         description: Film updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// @ts-ignore
app.put(endpoints.updateFilm, upload.fields([{ name: "thumbnail", maxCount: 1 }]), filmController.updateFilm);
/**
 * @swagger
 * /cinefilo/films/{id}:
 *   delete:
 *     summary: Delete a film
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Film ID
 *     responses:
 *       200:
 *         description: Film deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid film ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Invalid film ID
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
app.delete(endpoints.deleteFilm, filmController.deleteFilm);
/**
 * @swagger
 * /cinefilo/health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-01-01T00:00:00.000Z
 */
app.get(endpoints.health, async (req, res) => {
    const result = { status: 'OK', timestamp: new Date().toISOString() };
    await filmController.checkConnection();
    res.json(result);
    log.success(`Status: ${result.status} - ${result.timestamp}`);
});
// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    log.info(`Request for ${req.originalUrl} received`);
    res.status(404);
    // res.sendFile(path.join(dirFrontend, 'dist', 'index.html'));
});
// Error handler
app.use((error, req, res, next) => {
    log.error(`Unhandled error: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    log.info(`Server running on http://localhost:${PORT} → https://${DOMAIN}${endpoints.health}`);
    log.info(`Swagger documentation available at http://localhost:${PORT}/docs → https://${DOMAIN}/${BASE_URL}/docs`);
});
// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});
