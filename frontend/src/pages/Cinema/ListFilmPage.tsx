import {ChangeEvent, FC, useState} from 'react';
import {useFilm} from "@/hooks/useFilm";
import {CardFilm} from "@/components/Film/CardFilm";
import {Select, Placeholder, IconButton} from "@telegram-apps/telegram-ui";
import {LoadingPage} from "@/pages/LoadingPage";
import {TFilter, TKeyFilter} from "@cinefilodelcazzo/types";
import FilterListIcon from '@mui/icons-material/FilterList';
export const ListFilmPage: FC = () => {
	const [filterOptions, setFilterOptions] = useState<TFilter>({sortedBy:'createdAt',order:'desc'})
	//<editor-fold desc="ListFilmPage.tsx > ListFilmPage - line 10 at 09/01/2026 22:05:30">
	console.group('ListFilmPage.tsx > ListFilmPage - line 10 at 09/01/2026 22:05:30');
	console.debug(filterOptions);
	console.groupEnd();
	//</editor-fold>
	const {data, isFetching} = useFilm.fetchAll(filterOptions)

	if (isFetching) {
		return (
			<LoadingPage/>
		)
	}

	if (data?.length == 0) {
		return (
			<Placeholder title={"Nessun film"}/>
		)
	}

	const onChangeHandle = (event: ChangeEvent<HTMLSelectElement>)=>{
		setFilterOptions(prev=>({...prev, sortedBy: event.target.value as TKeyFilter}))
		// refetch()
	}

	const reverseOrder = ()=>{
		setFilterOptions(prev=>({...prev, order: prev.order == 'desc'? 'asc' : 'desc'}))
	}

	return (
		<div>
			<div className={"list-filter"}>
				<Select header="Ordine per" value={filterOptions.sortedBy} onChange={onChangeHandle}>
					<option value={'createdAt' as TKeyFilter}>Data creazione</option>
					<option value={'releaseDate' as TKeyFilter}>Data di uscita</option>
				</Select>
				<IconButton className={"list-filter-btn"} onClick={reverseOrder}>
					<FilterListIcon/>
					<span>{filterOptions.order.toUpperCase()}</span>
				</IconButton>
			</div>
			<div className={"list-wrapper"}>
				{data?.map(film => <CardFilm film={film} key={film.id}/>)}
			</div>
		</div>
	);
};