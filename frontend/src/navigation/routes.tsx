import type { ComponentType, JSX } from 'react';

import {CinemaPage} from "@/pages/Cinema/CinemaPage";
import {MainPage} from "@/pages/MainPage";
import ViewFilm from "@/pages/Cinema/ViewFilm";
import {EditFilm} from "@/pages/Cinema/EditFilm";
import {CreateFilm} from "@/pages/Cinema/CreateFilm";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: MainPage },
  { path: '/list', Component: CinemaPage, title: 'Cinema' },
  { path: '/new', Component: CreateFilm, title: 'New film' },
  { path: '/film/:id', Component: ViewFilm, title: 'Film' },
  { path: '/edit/:id', Component: EditFilm, title: 'Film' },
];
