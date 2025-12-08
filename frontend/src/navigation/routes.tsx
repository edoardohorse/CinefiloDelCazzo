import type { ComponentType, JSX } from 'react';

import {CinemaPage} from "@/pages/Cinema/CinemaPage";
import {EditFilm} from "@/pages/Cinema/EditFilm";
import {CreateFilm} from "@/pages/Cinema/CreateFilm";

interface Route {
  path: string;
  Component: ComponentType;
  title: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
	{ path: '/list', Component: CinemaPage, title: 'Cinema' },
	{ path: '/list/:id', Component: CinemaPage, title: 'Cinema' },
	{ path: '/new', Component: CreateFilm, title: 'New film' },
	{ path: '/edit/:id', Component: EditFilm, title: 'Film' },
];
