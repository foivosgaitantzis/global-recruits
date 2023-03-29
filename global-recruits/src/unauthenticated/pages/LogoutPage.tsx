import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../shared/pages/LoadingPage";
import { UnauthenticatedRoutes } from "../routes";

export default function LogoutPage() {
    const navigate = useNavigate();
    useEffect(() => {
        Auth.signOut()
            .then(() => {
                navigate(`/${UnauthenticatedRoutes.defaultPath}`)
            })
    }, [navigate]);


    return (
        <LoadingPage />
    );
}