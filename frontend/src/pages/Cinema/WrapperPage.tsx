import {
    ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";

import {IconButton, Modal} from "@telegram-apps/telegram-ui";
import {hideViewFilm, showViewFilm} from "@/store/modal-view-film";
import {useNavigate, useParams} from "react-router-dom";
import {useSignal} from "@tma.js/sdk-react";
import {useEffect} from "react";
import {ListFilmPage} from "@/pages/Cinema/ListFilmPage";
import {Route} from "@/navigation/routes";
import {Icon28Edit} from "@telegram-apps/telegram-ui/dist/icons/28/edit";
import {snackbarQueue} from "@/store/snackbar-store";
import clsx from "clsx";

export const WrapperPage = ({route}: { route: Route }) => {
    const params = useParams<{ id: string }>()
    const signalSnackbar = useSignal(snackbarQueue)


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

            <IconButton
                mode="bezeled"
                size="l"
                className={clsx('new-btn', signalSnackbar?.show && 'new-btn--movedup')}
                onClick={() => navigate('/new')}
            >
                <Icon28Edit/>
            </IconButton>

            <Modal open={route.path != '/list'} dismissible onOpenChange={onOpenChange} nested={true}
                   header={<ModalHeader/>}>
                {route.path != '/list' && params.id
                    ? <route.Component id={params.id}/>
                    : <route.Component/>
                }
            </Modal>
        </div>
    )
}