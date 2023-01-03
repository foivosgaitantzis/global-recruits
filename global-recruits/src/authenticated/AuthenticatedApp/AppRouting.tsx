import { Auth } from "aws-amplify";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useStateContext } from "../../shared/state/AppStateProvider";
import DashboardTemplate from "../../shared/templates/DashboardTemplate";
import { AuthenticatedRoutes } from "../routes";

export default function AppRouting() {
    const navigate = useNavigate();
    const details = useStateContext();
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