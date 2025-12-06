import type {FC, JSX} from 'react';

import {ListFilmPage} from "@/pages/Cinema/ListFilmPage";
import {EditFilm} from "@/pages/Cinema/EditFilm";
import {CreateFilm} from "@/pages/Cinema/CreateFilm";
import ViewFilm from "@/pages/Cinema/ViewFilm";

export interface Route {
  path: string;
  Component: FC<{id?: string}>;
  title: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
	{ path: '/list', Component: ListFilmPage, title: 'Cinema' },
	{ path: '/list/:id', Component: ViewFilm, title: 'Cinema' },
	{ path: '/new', Component: CreateFilm, title: 'New film' },
	{ path: '/edit/:id', Component: EditFilm, title: 'Film' },
];
