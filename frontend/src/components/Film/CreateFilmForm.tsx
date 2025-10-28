import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CreateFilmFormData, createFilmSchema} from "@/schema/zod";
import { FilmType } from '../../../../types/film';


export function CreateFilmForm() {
	const {
		register,
		handleSubmit,
		formState: {errors, isDirty},
		watch,
		setValue,
	} = useForm<CreateFilmFormData>({
		resolver: zodResolver(createFilmSchema),
		defaultValues: {
			type: FilmType.FILM,
			endDate: null,
			description: null,
		},
	});

	const handleCreateFilm = async (data: CreateFilmFormData) => {
		// Convert File to Buffer if needed for your API
		const thumbnailBuffer = await data.thumbnail.arrayBuffer();

		const createFilmRequest = {
			...data,
			thumbnail: thumbnailBuffer,
		};

		console.log('Creating film:', createFilmRequest);
		// Call your API here
	};


	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const blob = new Blob([file]);
			setValue('thumbnail', blob, {shouldValidate: true});
		}
	};

	return (
		<form onSubmit={handleSubmit(handleCreateFilm)} className="space-y-6">
			{/* Name Field */}
			<div>
				<label htmlFor="name" className="block text-sm font-medium text-gray-700">
					Film Name *
				</label>
				<input
					{...register('name')}
					type="text"
					id="name"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					placeholder="Enter film name"
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
				)}
			</div>

			{/* Thumbnail Field */}
			<div>
				<label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
					Thumbnail *
				</label>
				<input
					type="file"
					id="thumbnail"
					accept="image/jpeg,image/jpg,image/png,image/webp"
					onChange={handleFileChange}
					className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
				/>

				{errors.thumbnail && (
					<p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>
				)}
			</div>

			{/* Release Date Field */}
			<div>
				<label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">
					Release Date *
				</label>
				<input
					{...register('releaseDate')}
					type="date"
					id="releaseDate"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				{errors.releaseDate && (
					<p className="mt-1 text-sm text-red-600">{errors.releaseDate.message}</p>
				)}
			</div>

			{/* End Date Field */}
			<div>
				<label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
					End Date
				</label>
				<input
					{...register('endDate')}
					type="date"
					id="endDate"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				{errors.endDate && (
					<p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
				)}
			</div>

			{/* Type Field */}
			<div>
				<label htmlFor="type" className="block text-sm font-medium text-gray-700">
					Film Type *
				</label>
				<select
					{...register('type')}
					id="type"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				>
					<option value={FilmType.FILM}>Film</option>
					<option value={FilmType.ANIME}>Anime</option>
				</select>
				{errors.type && (
					<p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
				)}
			</div>

			{/* Description Field */}
			<div>
				<label htmlFor="description" className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					{...register('description')}
					id="description"
					rows={4}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					placeholder="Enter film description"
				/>
				{errors.description && (
					<p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
				)}
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				disabled={!isDirty}
				className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Create Film
			</button>
		</form>
	);
}

export default CreateFilmForm;