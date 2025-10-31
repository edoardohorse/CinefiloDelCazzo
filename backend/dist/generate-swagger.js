import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';
import fs from 'fs';
import path from 'path';
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Write Swagger JSON to file
const swaggerJsonPath = path.join(__dirname, '../swagger.json');
fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger JSON generated at:', swaggerJsonPath);
console.log('You can view it at: http://localhost:3000/api-docs');
