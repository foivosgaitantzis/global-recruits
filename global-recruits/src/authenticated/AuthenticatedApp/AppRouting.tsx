import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "../../shared/pages/LoadingPage";
import DashboardTemplate from "../../shared/templates/DashboardTemplate";
import { AuthenticatedRoutes } from "../routes";

const DashboardHome = React.lazy(() => import('../pages/DashboardHome'));
//const CourseApp = React.lazy(() => import('../CourseApp/CourseApp'));

/**
 * Custom App Routing Component for Authenticated App (Post Login)
 * @returns A list of Viable Authenticated Routes
 */
export default function AppRouting() {
    return (
        <DashboardTemplate>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route path={AuthenticatedRoutes.courses} element={
                        <>
                            Welcome to the My Courses Page!
                        </>
                    } />
                    {/*<Route path={`${AuthenticatedRoutes.defaultCoursePath}/*`} element={<CourseApp />} />*/}
                    <Route path={AuthenticatedRoutes.dashboard} element={<DashboardHome />} />
                    <Route path={"*"} element={
                        <>
                            Not Found!
                        </>
                    } />
                </Routes>
            </Suspense>
        </DashboardTemplate>
    )
}