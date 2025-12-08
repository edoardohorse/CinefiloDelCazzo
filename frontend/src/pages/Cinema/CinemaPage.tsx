import {FC, useEffect} from 'react';
import {useFilm} from "@/hooks/useFilm";
import {CardFilm} from "@/components/Film/CardFilm";
import {Modal, Placeholder, Spinner} from "@telegram-apps/telegram-ui";
import ViewFilm from "@/pages/Cinema/ViewFilm";
import {useSignal} from "@tma.js/sdk-react";
import {hideViewFilm, showViewFilm, signalViewFilm} from "@/store/modal-view-film";
import {useNavigate, useParams} from "react-router-dom";
import {
	ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {ModalClose} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import {Icon28Close} from "@telegram-apps/telegram-ui/dist/icons/28/close";

export const CinemaPage = () => {
	const params = useParams<{ id: string }>()
	const navigate = useNavigate();
	const viewFilm =  useSignal(signalViewFilm)
	const {data, isFetching} = useFilm.fetchAll()

	useEffect(function () {
		if(params.id){
			showViewFilm(params.id)
		}
	}, [params.id]);



	if (isFetching) {
		return (
			<Spinner size="l"/>
		)
	}

	if (data?.length == 0) {
		return (
			<Placeholder title={"Nessun film"}/>
		)
	}

	const onOpenChange = (open:boolean)=>{
		if(!open){
			hideViewFilm()
			navigate('/list')
		}
	}

	return (
		<div className={"list-wrapper"}>
			{data?.map(film => <CardFilm film={film} key={film.id}/>)}
			<Modal open={viewFilm?.show || false} dismissible onOpenChange={onOpenChange}
			       header={<ModalHeader after={<ModalClose><Icon28Close style={{color: 'var(--tgui--plain_foreground)'}} /></ModalClose>}>Only iOS header</ModalHeader>}
			>
				{viewFilm?.idFilm && <ViewFilm id={viewFilm.idFilm}/>}
			</Modal>
		</div>
	);
};