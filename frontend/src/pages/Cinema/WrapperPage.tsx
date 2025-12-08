import {
	ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {ModalClose} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import {Icon28Close} from "@telegram-apps/telegram-ui/dist/icons/28/close";

import {Modal} from "@telegram-apps/telegram-ui";
import {hideViewFilm, showViewFilm, signalViewFilm} from "@/store/modal-view-film";
import {useNavigate, useParams} from "react-router-dom";
import {useSignal} from "@tma.js/sdk-react";
import {useEffect} from "react";
import {ListFilmPage} from "@/pages/Cinema/ListFilmPage";
import {Route, routes} from "@/navigation/routes";

export const WrapperPage = ({route}: { route: Route }) => {
	const params = useParams<{ id: string }>()

	const navigate = useNavigate();
	useEffect(function () {
		if (params.id) {
			showViewFilm(params.id)
		} else {
			hideViewFilm()
		}
	}, [params.id]);

	const onOpenChange = (open: boolean) => {
		if (!open) {
			navigate('/list');
		}
	}

	return (
		<div>
			<ListFilmPage/>
			<Modal open={route.path != '/list'} dismissible onOpenChange={onOpenChange} nested={true}
			       header={<ModalHeader
				       after={<ModalClose><Icon28Close style={{color: 'var(--tgui--plain_foreground)'}}/></ModalClose>}/>}
			>
				{route.path != '/list' &&
					params.id ? <route.Component id={params.id}/> : <route.Component/>
				}

			</Modal>
		</div>
	)
}