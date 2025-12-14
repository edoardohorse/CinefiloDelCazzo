const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Film API',
            version: '1.0.0',
            description: 'A REST API for managing films and anime with SQLite database',
            contact: {
                name: 'API Support',
                email: 'support@filmapi.com'
            },
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html'
            }
        },
        servers: [
            {
                url: 'https://204.216.220.56',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Film: {
                    type: 'object',
                    required: ['name', 'thumbnail', 'releaseDate', 'type'],
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                            description: 'Auto-generated film ID',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the film',
                            example: 'Inception'
                        },
                        thumbnail: {
                            type: 'string',
                            format: 'byte',
                            description: 'Base64 encoded thumbnail image',
                            example: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
                        },
                        releaseDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Film release date',
                            example: '2010-07-16T00:00:00.000Z'
                        },
                        endDate: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                            description: 'Film end date (if applicable)',
                            example: '2010-09-16T00:00:00.000Z'
                        },
                        type: {
                            type: 'string',
                            enum: ['film', 'anime'],
                            description: 'Type of media'
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            description: 'Film description',
                            example: 'A mind-bending thriller about dreams and reality'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Record creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Record last update timestamp'
                        }
                    }
                },
                CreateFilmRequest: {
                    type: 'object',
                    required: ['name', 'thumbnail', 'releaseDate', 'type'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Inception'
                        },
                        thumbnail: {
                            type: 'string',
                            format: 'byte',
                            description: 'Base64 encoded image',
                            example: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
                        },
                        releaseDate: {
                            type: 'string',
                            format: 'date-time',
                            example: '2010-07-16T00:00:00.000Z'
                        },
                        endDate: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                            example: '2010-09-16T00:00:00.000Z'
                        },
                        type: {
                            type: 'string',
                            enum: ['film', 'anime'],
                            example: 'film'
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            example: 'A mind-bending thriller about dreams and reality'
                        }
                    }
                },
                UpdateFilmRequest: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Inception Updated'
                        },
                        thumbnail: {
                            type: 'string',
                            format: 'byte',
                            description: 'Base64 encoded image'
                        },
                        releaseDate: {
                            type: 'string',
                            format: 'date-time',
                            example: '2010-07-16T00:00:00.000Z'
                        },
                        endDate: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true
                        },
                        type: {
                            type: 'string',
                            enum: ['film', 'anime']
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            example: 'Updated description'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message'
                        }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Success message'
                        },
                        id: {
                            type: 'integer',
                            description: 'Created film ID (for create operations)'
                        }
                    }
                }
            },
            responses: {
                NotFound: {
                    description: 'Resource not found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            },
                            example: {
                                error: 'Film not found'
                            }
                        }
                    }
                },
                ValidationError: {
                    description: 'Validation error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            },
                            example: {
                                error: 'Missing required fields: name, thumbnail, releaseDate, type'
                            }
                        }
                    }
                },
                ServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            },
                            example: {
                                error: 'Internal server error'
                            }
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Films',
                description: 'Film management endpoints'
            },
            {
                name: 'Health',
                description: 'Server health check'
            }
        ]
    },
    apis: ['./src/server.ts'] // Path to the API files
};
export default swaggerOptions;
