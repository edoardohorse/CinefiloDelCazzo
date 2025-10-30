import type { ComponentType, JSX } from 'react';

import {CinemaPage} from "@/pages/Cinema/CinemaPage";
import {FormFilm} from "@/components/Film/FormFilm";
import {MainPage} from "@/pages/MainPage";
import ViewFilm from "@/pages/Cinema/ViewFilm";

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
  { path: '/film/:id', Component: ViewFilm, title: 'Film' },
];
