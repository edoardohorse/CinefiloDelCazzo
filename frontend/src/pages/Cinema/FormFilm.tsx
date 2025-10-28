import {
	Cell,
	Input,
	Switch,
	Text,
	FileInput,
	List,
	Caption,
	Button,
	FixedLayout,
	Badge
} from "@telegram-apps/telegram-ui";
import {ChangeEvent, ChangeEventHandler, useState} from "react";
import {useForm} from "react-hook-form";
import {CreateFilmFormData, createFilmSchema} from "@/schema/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FilmType} from "../../../../types/film";
import {useFilm} from "@/hooks/useFilm";

const FormFilm = () => {
	const [bEndDate, setEndDate] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: {errors, isDirty},
		setValue,
		watch,
		clearErrors,
	} = useForm<CreateFilmFormData>({
		resolver: zodResolver(createFilmSchema),
		defaultValues: {
			type: FilmType.FILM,
			endDate: null,
			description: null,
		},
	});

	const {mutateAsync} = useFilm.createFilm()

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
			setValue("type", "anime" as FilmType)
		} else {
			setValue("type", "film" as FilmType)
		}
	}

	const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			clearErrors("thumbnail")
			setValue("thumbnail", e.target.files[0])
		}
	}

	const nFileUploded = watch("thumbnail") == undefined ? 0 : 1;

	return (
		<List>
			<form onSubmit={handleSubmit(handleCreateFilm)}>
				{/*Name*/}
				<Input {...register('name')} header="Nome" placeholder="Nome film" type="text" status={errors.name && "error"}/>

				{/*Anime*/}
				<Cell Component="label" after={<Switch onChange={onSwitchAnime}/>}>
					<Text>Anime? </Text>
				</Cell>

				{/*Data uscita*/}
				<Input {...register("releaseDate")} header="Data d'uscita" type="date" status={errors.releaseDate && "error"}/>

				{/*Data fine*/}
				<Cell Component="label" after={<Switch onChange={() => setEndDate(!bEndDate)}/>}>
					<Text>Fino a...</Text>
				</Cell>
				<Input {...register("endDate")} header="Fino a" type="date" disabled={!bEndDate} status={errors.endDate && "error"}/>

				{/*File*/}
				<div style={{display: "flex", alignItems: "center"}}>
						<FileInput label={"Thumbnail"} onChange={onUpload} className={"test"}/>
						{errors.thumbnail && (
							<Text>{errors.thumbnail.message}</Text>
						)}
						{nFileUploded != 0 &&
		          <Cell>
		            <Badge mode="primary" type="number">{nFileUploded}</Badge>
		            <Text>Allegato</Text>
		          </Cell>
						}
				</div>


				<FixedLayout vertical="bottom" style={{ padding: "1em"}}>
					<Button
						mode="filled"
						size="l"
						disabled={!isDirty}
						stretched
						type="submit"
					>
						Aggiungi film
					</Button>
				</FixedLayout>

			</form>
		</List>
	)
}

export {FormFilm}