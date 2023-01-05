import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogoutPage from "../pages/LogoutPage";
import { UnauthenticatedRoutes } from "../routes";

export default function UnauthenticatedApp() {
    return (
        <Routes>
            <Route path={UnauthenticatedRoutes.home} element={<HomePage />} />
            <Route path={UnauthenticatedRoutes.logout} element={<LogoutPage />} />
            <Route path={"*"} element={
                <>
                    Unknown Unauthenticated Page...
                </>
            } />
        </Routes>
    );
}