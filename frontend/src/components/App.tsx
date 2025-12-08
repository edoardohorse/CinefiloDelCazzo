import {Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import {useSignal, miniApp} from '@tma.js/sdk-react';
import {AppRoot, Snackbar} from '@telegram-apps/telegram-ui';

import {routes} from '@/navigation/routes.tsx';
import {snackbarQueue} from "@/store/snackbar-store";

export function App() {
	// const lp = useLaunchParams();
	const isDark = useSignal(miniApp.isDark);
	const snackbarInfo = useSignal(snackbarQueue);

	return (
		<AppRoot
			appearance={isDark ? 'dark' : 'light'}
			// platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
			platform={'base'}
		>
			<BrowserRouter>
				<Routes>
					{routes.map((route) => <Route key={route.path} {...route} />)}
					<Route path="*" element={<Navigate to="/list"/>}/>
				</Routes>
				{snackbarInfo?.show && <Snackbar

          duration={snackbarInfo?.duration}
          description={snackbarInfo?.message}
          onClose={() => {
						snackbarQueue.set({show: false})
					}}>{snackbarInfo.title}</Snackbar>}
			</BrowserRouter>
		</AppRoot>
	);
}
