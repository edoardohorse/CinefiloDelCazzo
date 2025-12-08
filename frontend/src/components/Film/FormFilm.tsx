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
import {TTypeForm, useFormFilm} from "@/hooks/useFilm";
import {TextAreaLinks} from "@/components/Film/TextAreaLinks";
import {Controller} from "react-hook-form";
import {CreateFilmFormData} from "@/schema/zod";
import {UpdateFilmRequest} from "@cinefilodelcazzo/types/src/film";
import {PreviewImage} from "@/components/Film/PreviewImage";

const FormFilm = ({film, type}: { film: CreateFilmFormData | UpdateFilmRequest, type: TTypeForm}) => {

	const {
		form,
		handleCreateFilm,
		handleUpdateFilm,
		onSwitchAnime,
		onUpload,
		createIsPending,
		updateIsPending,
		reset,
		links,
		hasEndDate,
		setHasEndDate,
		onChangeLinks,
		imageURI,
		removeThumbnail
	} = useFormFilm(film, type);

	const {formState: {errors}, watch, handleSubmit} = form

	let handleOnSubmit = handleCreateFilm

	if(type == 'update') {
		handleOnSubmit = handleUpdateFilm
	}

	return (
		<List>
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				{/*Name*/}
				<Controller name={"name"} control={form.control} render={(({field}) =>
					<Input {...field} header="Nome *" placeholder="Nome film" type="text" status={errors.name && "error"} tabIndex={1}/> )}
				/>

				{/*Anime*/}
				<Cell Component="label" after={<Switch checked={watch('type') == 'anime'} onChange={onSwitchAnime}/>}>
					<Text>Anime? </Text>
				</Cell>

				{/*Data uscita*/}
				<Controller name={"releaseDate"} control={form.control} render={(({field}) =>
						<Input {...field} onChange={(e)=>field.onChange(e)} header="Data d'uscita" type="date" status={errors.releaseDate && "error"}/>)}
				/>


				{/*Data fine*/}
				<Cell Component="label" after={<Switch checked={hasEndDate} onChange={() => setHasEndDate(!hasEndDate)}/>}>
					<Text>Fino a...</Text>
				</Cell>
				<Controller name={"endDate"} control={form.control} render={(({field}) =>
					<Input {...field} header="Fino a" type="date" disabled={!hasEndDate} status={errors.endDate && "error"} />)}
				/>

				{/*Links*/}
				<TextAreaLinks links={links} setLinks={onChangeLinks}/>

				{/*File*/}
				<div style={{display: "flex", alignItems: "center"}}>
					{type === 'create' || (imageURI == undefined && type == 'update') &&
            <FileInput label={"Thumbnail"} onChange={onUpload} className={"test"}/>
					}
					{errors.thumbnail && (
						<Text style={{color: "red"}}>{errors.thumbnail.message}</Text>
					)}
					{imageURI && <PreviewImage uri={imageURI} onErase={removeThumbnail}/>}
				</div>




				<FixedLayout vertical="bottom" style={{padding: "1em", display: "flex", alignItems: "center", gap: "1em", position: "relative"}}>
					<Button
						mode="bezeled"
						size="l"
						disabled={createIsPending || updateIsPending }
						type="submit"
						loading={createIsPending}
						style={{flex: 1}}
					>
						{type ==='create' ? 'Aggiungi film' : 'Modifica film'}
					</Button>
					<Button mode={"outline"} size={"l"} onClick={reset}>Reset</Button>
				</FixedLayout>
			</form>
		</List>
	)
}

export {FormFilm}