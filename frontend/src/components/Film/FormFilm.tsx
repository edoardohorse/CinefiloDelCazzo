import {
	Cell,
	Input,
	Switch,
	Text,
	FileInput,
	List,
	Button,
	FixedLayout,
	Badge
} from "@telegram-apps/telegram-ui";
import {useState} from "react";
import { useFormFilm} from "@/hooks/useFilm";

const FormFilm = () => {
	const [bEndDate, setEndDate] = useState<boolean>(false)

	const {form, handleCreateFilm, onSwitchAnime, onUpload } = useFormFilm();
	const {
		watch,
		formState: {errors, isDirty},
		register,
		handleSubmit
	} = form

	const nFileUploaded = watch("thumbnail") == undefined ? 0 : 1;

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
						{nFileUploaded != 0 &&
		          <Cell>
		            <Badge mode="primary" type="number">{nFileUploaded}</Badge>
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