import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import React, { Suspense } from 'react';
import { Fragment } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthenticatedRoutes } from './authenticated/routes';
import { AmplifyComponents } from './shared/cognito/components';
import { CognitoConfiguration } from './shared/cognito/configuration';
import { AmplifyServices } from './shared/cognito/services';
import { AmplifyTheme } from './shared/cognito/Theme';
import "@aws-amplify/ui-react/styles.css";
import { UnauthenticatedRoutes } from './unauthenticated/routes';
import UnauthenticatedApp from './unauthenticated/UnauthenticatedApp/UnauthenticatedApp';
import LoadingPage from './shared/pages/LoadingPage';

const AuthenticatedApp = React.lazy(() => import("./authenticated/AuthenticatedApp/AuthenticatedApp"));

// Setup Cognito Configuration
Auth.configure(CognitoConfiguration);

export default function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route
						path={`${AuthenticatedRoutes.defaultPath}/*`}
						element={
							<AmplifyProvider theme={AmplifyTheme}>
								<Authenticator
									className="gradient-theme font-custom text-black mx-4 sm:mx-0 h-full min-h-screen flex items-center justify-center flex-wrap m-auto"
									loginMechanisms={["email"]}
									components={AmplifyComponents}
									services={AmplifyServices}
								>
									<Suspense fallback={<LoadingPage />}>
										<AuthenticatedApp />
									</Suspense>
								</Authenticator>
							</AmplifyProvider>
						}
					/>
					<Route path={UnauthenticatedRoutes.defaultPath} element={<UnauthenticatedApp />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	)
}
