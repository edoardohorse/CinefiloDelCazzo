// stores/snackbar.store.ts
import { signal, batch } from '@tma.js/signals';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarMessage {
	show: boolean;
	title?: string;
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
export const snackbarQueue = signal<SnackbarMessage | null>({
	show: false,
});

// Methods to manage snackbars
export const showSnackbar = (
	message: string,
	title: string = "Message",
	severity: SnackbarSeverity = 'info',
	duration: number = 3000,
	action?: { label: string; onClick: () => void }
) => {
	const id = Math.random().toString(36).substr(2, 9);
	const newMessage: SnackbarMessage = {
		show: true,
		title,
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
	success: (message: string, title?:string, duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, title || 'Fatto','success', duration, action),

	error: (message: string, title?:string,duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, title || 'Error','error', duration, action),

	warning: (message: string, title?:string,duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, title || 'Attenzione','warning', duration, action),

	info: (message: string, title?:string,duration?: number, action?: { label: string; onClick: () => void }) =>
		showSnackbar(message, title || 'Info','info', duration, action),
};

