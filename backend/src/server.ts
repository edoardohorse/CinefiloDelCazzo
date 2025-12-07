import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import multer from 'multer';
import {FilmController} from "./controllers/filmController.js";
import swaggerOptions from "./config/swagger.js";
import path from 'path'


// Configure multer
const upload = multer();


const app = express();
const port = 10000;

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

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize controller
const filmController = new FilmController();

// Serve static files from Vite build
import { fileURLToPath } from 'url';

// ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirnameSplit = __dirname.split('/')
const dirname = dirnameSplit.slice(0,dirnameSplit.length-2).join('/')
const dirFrontend =`${dirname}/frontend`

app.use(express.static(path.join(dirFrontend, 'dist')));

/**
 * @swagger
 * /api/films:
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
app.get('/api/films', filmController.getFilms);

/**
 * @swagger
 * /api/films/{id}:
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
app.get('/api/films/:id', filmController.getFilmById);

/**
 * @swagger
 * /api/films:
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
app.post('/api/films', upload.fields([{name:"thumbnail", maxCount:1}]) , filmController.createFilm);

/**
 * @swagger
 * /api/films/{id}:
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
app.put('/api/films/:id', upload.fields([{name:"thumbnail", maxCount:1}]) , filmController.updateFilm);

/**
 * @swagger
 * /api/films/{id}:
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
app.delete('/api/films/:id', filmController.deleteFilm);

/**
 * @swagger
 * /health:
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
app.get('/health', (req, res) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Swagger API Documentation
 *     description: Interactive API documentation
 *     tags: [Documentation]
 */

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
	res.sendFile(path.join(dirFrontend, 'dist', 'index.html'));
});


// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error('Unhandled error:', error);
	res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
	console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});

// Graceful shutdown
process.on('SIGINT', () => {
	console.log('\nShutting down server...');
	process.exit(0);
});