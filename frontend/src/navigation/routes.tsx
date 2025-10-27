import type { ComponentType, JSX } from 'react';

import {CinemaPage} from "@/pages/Cinema/CinemaPage";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: CinemaPage, title: 'Cinema' }
];
