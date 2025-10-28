import {useMutation, useQuery} from "@tanstack/react-query";
import {createFilm, fetchAllFilm, QUERY_FN_FETCH_FILM} from "@/api/api";
import {Film, FilmType} from "../../../types/film";
import {useForm} from "react-hook-form";
import {CreateFilmFormData, createFilmSchema} from "@/schema/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangeEvent, useEffect, useState} from "react";

export const useFilm = {
	fetchAll: ()=> {
		return useQuery<Film[]>({
			queryKey: [QUERY_FN_FETCH_FILM],
			queryFn: () => fetchAllFilm(),
		})
	},
	createFilm: ()=>{
		return useMutation({
			mutationFn: (film: CreateFilmFormData) => createFilm(film)
		})
	},
}


export const useFormFilm = () => {
	const [bShowSnackbarFormSuccess, setShowSnackbarFormSuccess] = useState<boolean>(false)
	const [bShowSnackbarField, setShowSnackbarField] = useState<boolean>(false)

	const form = useForm<CreateFilmFormData>({
		resolver: zodResolver(createFilmSchema),
		defaultValues: {
			type: FilmType.FILM,
			endDate: null,
			description: null,
		},
	});

	const hasErrors = Object.keys(form.formState.errors).length > 0;

	const {mutateAsync, isSuccess, isPending} = useFilm.createFilm()

	const handleCreateFilm = async (data: CreateFilmFormData) => {
		// Convert File to Buffer if needed for your API
		const thumbnailBuffer = await data.thumbnail.arrayBuffer();

		const createFilmRequest = {
			...data,
			thumbnail: thumbnailBuffer,
		};

		console.log('Creating film:', createFilmRequest);
		// Call your API here
		await mutateAsync(data)
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

	const reset = ()=>{
		form.clearErrors()
		form.reset()
		setShowSnackbarFormSuccess(false)
		setShowSnackbarField(false)
	}

	const onChangeLinks = (mapLinks: Array<string>)=>{
		form.setValue("links", mapLinks);
	}

	const links = form.watch("links") ?? []

	useEffect(function onSuccessSendForm() {
		if(isSuccess){
			form.clearErrors()
			form.reset()
			setShowSnackbarFormSuccess(true)
		}
	}, [isSuccess]);

	useEffect(function onErrorSendForm() {
		if(hasErrors){
			setShowSnackbarField(true)
		}
	}, [hasErrors]);

	return {
		form,
		handleCreateFilm,
		onSwitchAnime,
		onUpload,
		isSuccess,
		isPending,
		reset,
		links,
		onChangeLinks,
		snackBar:{
			bShowSnakbarFormSuccess: bShowSnackbarFormSuccess,
			bShowSnackbarField,
			setShowSnackbarField,
			setShowSnakbarFormSuccess: setShowSnackbarFormSuccess
		}
	}
}