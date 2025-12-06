import {FormFilm} from "@/components/Film/FormFilm";
import {defaultValues} from "@/hooks/useFilm";
import type {FC} from "react";

export const CreateFilm: FC = () => {

	return <FormFilm film={defaultValues} type={'create'} />
}