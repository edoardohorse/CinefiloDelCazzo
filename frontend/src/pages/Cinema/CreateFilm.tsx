import {FormFilm} from "@/components/Film/FormFilm";
import {defaultValues} from "@/hooks/useFilm";

export const CreateFilm = () => {

	return <FormFilm film={defaultValues} type={'create'} />
}