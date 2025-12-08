// stores/snackbar.store.ts
import { signal, batch } from '@tma.js/signals';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SViewFilm {
	show: boolean;
	idFilm?: string;
}

// Create reactive signals
export const signalViewFilm = signal<SViewFilm | null>(null);

// Methods to manage snackbars
export const showViewFilm = (
	idFilm: SViewFilm['idFilm'],
) => {
	const newMessage: SViewFilm = {
		show: true,
		idFilm,
	};

	// Use batch to update multiple signals atomically
	batch(() => {
		signalViewFilm.set(newMessage)
	});
};

export const hideViewFilm = () => {
	// Use batch to update multiple signals atomically
	batch(() => {
		signalViewFilm.set({show: false})
	});
}
