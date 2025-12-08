import { z } from 'zod';
import {FilmType} from "@cinefilodelcazzo/types";

// Base film schema with common fields
const baseFilmSchema = z.object({
	name: z.string().min(1, 'Il nome è obbligatorio').max(250, 'Il nome è troppo lungo'),
	releaseDate: z.string().optional(),
	endDate: z.string().optional(),
	type: z.nativeEnum(FilmType),
	description: z.string().max(1000, 'Description is too long').nullable().optional(),
	links: z.array(z.string()).optional(),
});

// Create film schema (includes thumbnail as required)
export const createFilmSchema = baseFilmSchema.extend({
	thumbnail: z.instanceof(File)
		.refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
		.refine((file) =>
				['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
			'Only .jpg, .png, and .webp formats are supported'
		).optional(),
});

// Update film schema (all fields optional)
export const updateFilmSchema = baseFilmSchema.extend({
	id: z.number(),
	name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
	thumbnail: z.union([z.string() ,z.instanceof(File)
		.refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
		.refine((file) =>
				['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
			'Only .jpg, .png, and .webp formats are supported'
		)]).optional(),
	type: z.nativeEnum(FilmType).optional(),
}).partial();

// Type inference
export type CreateFilmFormData = z.infer<typeof createFilmSchema>;
export type UpdateFilmFormData = z.infer<typeof updateFilmSchema>;