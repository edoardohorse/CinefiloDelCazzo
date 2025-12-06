// stores/snackbar.store.ts
import { signal, batch } from '@tma.js/signals';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarMessage {
	show: boolean;
	id?: string;
	message?: string;
	severity?: SnackbarSeverity;
	duration?: number;
	action?: {
		label: string;
		onClick: () => void;
	};
	timestamp?: number;
}

// Create reactive signals
export const snackbarQueue = signal<SnackbarMessage | null>(null);
export const activeSnackbar = signal<SnackbarMessage | null>(null);

// Methods to manage snackbars
export const showSnackbar = (
	message: string,
	severity: SnackbarSeverity = 'info',
	duration: number = 3000,
	action?: { label: string; onClick: () => void }
) => {
	const id = Math.random().toString(36).substr(2, 9);
	const newMessage: SnackbarMessage = {
		show: true,
		id,
		message,
		severity,
		duration,
		action,
		timestamp: Date.now(),
	};

	// Use batch to update multiple signals atomically
	batch(() => {
		snackbarQueue.set(newMessage)
	});
};



// Convenience methods with tma.js signals
export const snackbar = {
	success: (message: string, duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, 'success', duration, action),

	error: (message: string, duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, 'error', duration, action),

	warning: (message: string, duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, 'warning', duration, action),

	info: (message: string, duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, 'info', duration, action),
};

