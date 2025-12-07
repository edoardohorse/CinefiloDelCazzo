import {useMutation, useQuery} from "@tanstack/react-query";
import {
	createFilm,
	deleteFilm,
	fetchAllFilm,
	fetchFilmById,
	QUERY_FN_FETCH_FILM,
	QUERY_FN_FETCH_FILM_BY_ID, updateFilm
} from "@/api/api";

import {useForm} from "react-hook-form";
import {CreateFilmFormData, createFilmSchema, updateFilmSchema} from "@/schema/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangeEvent, useEffect, useState} from "react";
import {Film, FilmType, IResult, UpdateFilmRequest} from "@cinefilodelcazzo/types";
import {queryClient} from "@/components/Root";
import {snackbar} from "@/store/snackbar-store";
import {useNavigate} from "react-router-dom";

export const useFilm = {
	fetchAll: () => {
		return useQuery<Film[]>({
			queryKey: [QUERY_FN_FETCH_FILM],
			queryFn: () => fetchAllFilm(),
		})
	},
	createFilm: () => {
		return useMutation({
			mutationFn: (film: CreateFilmFormData) => createFilm(film),
			onSuccess: (data) => {
				// Invalidate and refetch users query after successful delete
				queryClient.invalidateQueries({queryKey: [QUERY_FN_FETCH_FILM]});
				snackbar.success(data.message);
			}
		})
	},
	fetchFilmById: (id: string) => {
		return useQuery<CreateFilmFormData>({
			queryKey: [QUERY_FN_FETCH_FILM_BY_ID, id],
			queryFn: () => fetchFilmById(id),
		})
	},
	updateFilm: () => {
		return useMutation({
			mutationFn: (film: UpdateFilmRequest) => updateFilm(film),
			onSuccess: (data) => {
				// Invalidate and refetch users query after successful delete
				queryClient.invalidateQueries({queryKey: [QUERY_FN_FETCH_FILM]});
				snackbar.success(data.message);
			}
		})
	},
	deleteFilmById: () => {
		return useMutation({
			mutationFn: (id: Film['id']) => deleteFilm(id),
			onSuccess: () => {
				// Invalidate and refetch users query after successful delete
				queryClient.invalidateQueries({queryKey: [QUERY_FN_FETCH_FILM]});
			}
		})
	}
}

export const defaultValues: CreateFilmFormData = {
	type: FilmType.FILM,
	description: null,
	name: ''
}

export type TTypeForm = 'create'|'update'


export const useFormFilm = (formInit: CreateFilmFormData | UpdateFilmRequest = defaultValues, type :TTypeForm) => {
	const navigate = useNavigate()
	const [hasEndDate, setHasEndDate] = useState<boolean>(false)
	const schema = type == 'create'? createFilmSchema: updateFilmSchema

	const form = useForm<typeof formInit>({
		resolver: zodResolver(schema),
		defaultValues: formInit
	})


	const hasErrors = Object.keys(form.formState.errors).length > 0;
	const endDate = form.watch('endDate')

	useEffect(function () {
		setHasEndDate(endDate != null && endDate != "")
	}, [endDate]);

	const create = useFilm.createFilm()
	const update = useFilm.updateFilm()

	const handleCreateFilm = async (data: CreateFilmFormData) => {
		const createFilmRequest = {
			...data,
		};
		if (data.thumbnail) {
			// Convert File to Buffer if needed for your API
			createFilmRequest.thumbnail = await data.thumbnail.arrayBuffer();
		}

		console.log('Creating film:', createFilmRequest);
		// Call your API here
		await create.mutateAsync(data).then(onSuccessCreateFilm)
	};

	const handleUpdateFilm = async (data: UpdateFilmRequest) => {
		const updateFilmRequest = {
			...data,
		};

		if (data.thumbnail) {
			// Convert File to Buffer if needed for your API
			// updateFilmRequest.thumbnail = await data.thumbnail.arrayBuffer();
		}

		if(updateFilmRequest.releaseDate){
			updateFilmRequest.releaseDate = new Date(updateFilmRequest.releaseDate).toISOString()
		}

		if(updateFilmRequest.endDate){
			updateFilmRequest.endDate = new Date(updateFilmRequest.endDate).toISOString()
		}

		// Call your API here
		await update.mutateAsync(updateFilmRequest).then(onSuccessUpdateFilm)
	};

	const onSwitchAnime = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			form.setValue("type", "anime" as FilmType)
		} else {
			form.setValue("type", "film" as FilmType)
		}
	}

	const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			form.clearErrors("thumbnail")
			form.setValue("thumbnail", e.target.files[0])
		}
	}

	const reset = () => {
		form.clearErrors()
		form.reset()
	}

	const onChangeLinks = (mapLinks: Array<string>) => {
		form.setValue("links", mapLinks);
	}

	const links = form.watch("links") ?? []

	const onSuccessCreateFilm = (res: IResult<Film>)=> {
		reset()
		navigate(`/film/${res.result.id}`)
	}

	const onSuccessUpdateFilm = (res: IResult<Film>)=> {
		reset()
		navigate(`/film/${res.result.id}`)
	}

	useEffect(function onErrorSendForm() {
		if (hasErrors) {
			snackbar.error('Compila i campi')
		}
	}, [hasErrors]);

	return {
		form,
		handleCreateFilm,
		handleUpdateFilm,
		onSwitchAnime,
		onUpload,
		createIsSuccess: create.isSuccess,
		createIsPending: create.isPending,
		updateIsSuccess: update.isSuccess,
		updateIsPending: update.isPending,
		reset,
		links,
		hasEndDate,
		setHasEndDate,
		onChangeLinks,
	}
}