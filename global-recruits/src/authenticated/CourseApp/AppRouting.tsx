import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingPage from '../../shared/pages/LoadingPage';
import { AuthenticatedRoutes } from '../routes';

const Course = React.lazy(() => import('./pages/Course'));

/**
 * Router for Courses Inner Parameter
 * @returns A list of Viable Courses Routes
 */
export default function AppRouting() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Routes>
                <Route path={AuthenticatedRoutes.course} element={<Course />} />
                <Route path={"*"} element={
                    <>
                        Not Found!
                    </>
                } />
            </Routes>
        </Suspense>
    )
}