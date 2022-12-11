import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Auth } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Theme from './components/amplify/Theme';
import AuthenticatedPage from './pages/protectedPages/AuthenticatedPage';
import Profile from './pages/protectedPages/Profile';

//const RegisterPage = React.lazy(() => import('./protectedPages/RegisterPage'));

Auth.configure({
	region: "us-east-1",
	userPoolId: "us-east-1_QgydbX3kW",
	userPoolWebClientId: "5gi5p2gntl7dafj7t6hkim0es1"
});

export default function App() {
	return (
		<React.Suspense fallback={<LoadingPage />}>
			<ThemeProvider theme={Theme}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/loading" element={<LoadingPage />}></Route>
						<Route path="/profile" element={<AuthenticatedPage><Profile /></AuthenticatedPage>}></Route>
						<Route path="*" element={<NotFoundPage />}></Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</React.Suspense>
	)
}
