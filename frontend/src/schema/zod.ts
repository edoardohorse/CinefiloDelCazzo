import { z } from 'zod';
import {FilmType} from "@cinofilodelcazzo/types";

// Base film schema with common fields
const baseFilmSchema = z.object({
	name: z.string().min(1, 'Il nome è obbligatorio').max(250, 'Il nome è troppo lungo'),
	releaseDate: z.string().min(1, 'Release date is required'),
	endDate: z.string().nullable().optional(),
	type: z.nativeEnum(FilmType),
	description: z.string().max(1000, 'Description is too long').nullable().optional(),
	links: z.array(z.string()).optional(),
});

// Create film schema (includes thumbnail as required)
export const createFilmSchema = baseFilmSchema.extend({
	thumbnail: z.instanceof(File, { message: 'Aggiungere una foto di copertina' })
		.refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
		.refine((file) =>
				['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
			'Only .jpg, .png, and .webp formats are supported'
		),
});

// Update film schema (all fields optional)
export const updateFilmSchema = baseFilmSchema.extend({
	name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
	thumbnail: z.instanceof(File, { message: 'Thumbnail must be a valid file' })
		.refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
		.refine((file) =>
				['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
			'Only .jpg, .png, and .webp formats are supported'
		).optional(),
	releaseDate: z.string().min(1, 'Release date is required').optional(),
	type: z.nativeEnum(FilmType).optional(),
}).partial();

// Type inference
export type CreateFilmFormData = z.infer<typeof createFilmSchema>;
export type UpdateFilmFormData = z.infer<typeof updateFilmSchema>;