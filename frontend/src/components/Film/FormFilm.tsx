import {
	Cell,
	Input,
	Switch,
	Text,
	FileInput,
	List,
	Button,
	FixedLayout,
	Badge, Snackbar
} from "@telegram-apps/telegram-ui";
import {TTypeForm, useFormFilm} from "@/hooks/useFilm";
import {TextAreaLinks} from "@/components/Film/TextAreaLinks";
import {Controller} from "react-hook-form";
import {CreateFilmFormData} from "@/schema/zod";
import {UpdateFilmRequest} from "@cinefilodelcazzo/types/src/film";

const FormFilm = ({film, type}: { film: CreateFilmFormData | UpdateFilmRequest, type: TTypeForm}) => {

	const {
		form,
		handleCreateFilm,
		handleUpdateFilm,
		onSwitchAnime,
		onUpload,
		createIsPending,
		updateIsPending,
		snackBar,
		reset,
		links,
		hasEndDate,
		setHasEndDate,
		onChangeLinks
	} = useFormFilm(film, type);

	const {watch, formState: {errors}, handleSubmit} = form

	const nFileUploaded = watch("thumbnail") == undefined ? 0 : 1;
	let handleOnSubmit = handleCreateFilm

	if(type == 'update') {
		handleOnSubmit = handleUpdateFilm
	}
	//<editor-fold desc="FormFilm.tsx > FormFilm - line 44 at 07/12/2025 15:52:51">
	console.group('FormFilm.tsx > FormFilm - line 44 at 07/12/2025 15:52:51');
	console.debug(form.getValues());
	console.groupEnd();
	//</editor-fold>
	return (
		<List>
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				{/*Name*/}
				<Controller name={"name"} control={form.control} render={(({field}) =>
					<Input {...field} header="Nome *" placeholder="Nome film" type="text" status={errors.name && "error"}/> )}
				/>

				{/*Anime*/}
				<Cell Component="label" after={<Switch onChange={onSwitchAnime}/>}>
					<Text>Anime? </Text>
				</Cell>

				{/*Data uscita*/}
				<Controller name={"releaseDate"} control={form.control} render={(({field}) =>
						<Input {...field} header="Data d'uscita" type="date"
						       status={errors.releaseDate && "error"}
						/>)}
				/>


				{/*Data fine*/}
				<Cell Component="label" after={<Switch checked={hasEndDate} onChange={() => setHasEndDate(!hasEndDate)}/>}>
					<Text>Fino a...</Text>
				</Cell>
				<Controller name={"endDate"} control={form.control} render={(({field}) =>
					<Input {...field} header="Fino a" type="date" disabled={!hasEndDate} status={errors.endDate && "error"} />)}
				/>


				{/*File*/}
				<div style={{display: "flex", alignItems: "center"}}>

					{type === 'create' &&
            <FileInput label={"Thumbnail *"} onChange={onUpload} className={"test"}/>
					}
					{errors.thumbnail && (
						<Text style={{color: "red"}}>{errors.thumbnail.message}</Text>
					)}
					{nFileUploaded != 0 &&
            <Cell>
              <Badge mode="primary" type="number">{nFileUploaded}</Badge>
              <Text>Allegato</Text>
            </Cell>
					}
				</div>

				{/*Links*/}
				<TextAreaLinks links={links} setLinks={onChangeLinks}/>


				<FixedLayout vertical="bottom"
				             style={{padding: "1em", display: "flex", alignItems: "center", gap: "1em"}}>
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