import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingPage from '../../shared/pages/LoadingPage';
import { AuthenticatedRoutes } from '../routes';

const Course = React.lazy(() => import('../pages/courses/Course'));

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