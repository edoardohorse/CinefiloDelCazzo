import type { ComponentType, JSX } from 'react';

import {CinemaPage} from "@/pages/Cinema/CinemaPage";
import {FormFilm} from "@/pages/Cinema/FormFilm";
import {MainPage} from "@/pages/MainPage";
import CreateFilmForm from "@/components/Film/CreateFilmForm";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: MainPage },
  { path: '/list', Component: CinemaPage, title: 'Cinema' },
  { path: '/new', Component: FormFilm, title: 'New film' },
  { path: '/new2', Component: CreateFilmForm, title: 'New film' },
];
