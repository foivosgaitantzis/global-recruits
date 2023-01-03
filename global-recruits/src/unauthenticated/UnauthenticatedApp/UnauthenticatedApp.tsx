import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { UnauthenticatedRoutes } from "../routes";

export default function UnauthenticatedApp() {
    return (
        <Routes>
            <Route path={UnauthenticatedRoutes.home} element={<HomePage />} />
            <Route path={"*"} element={
                <>
                    Unknown Unauthenticated Page...
                </>
            } />
        </Routes>
    );
}