import { Route, Routes } from "react-router-dom";
import DashboardTemplate from "../../shared/templates/DashboardTemplate";
import { AuthenticatedRoutes } from "../routes";

export default function AppRouting() {
    return (
        <DashboardTemplate>
            <Routes>
                <Route path={AuthenticatedRoutes.courses} element={
                    <>
                        Welcome to the My Courses Page!
                    </>
                } />
                <Route path={AuthenticatedRoutes.dashboard} element={
                    <>
                        Welcome to the Dashboard Home Page!
                        <br />
                        Welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                        <br />
                        welcome welcome welcome welcome welcome
                    </>
                } />
                <Route path={"*"} element={
                    <>
                        Not Found!
                    </>
                } />
            </Routes>
        </DashboardTemplate>
    )
}