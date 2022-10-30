import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTokenDetailsFromSource } from "../util/auth.service";

export default function Authenticate() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function navigateBackToRoute() {
            const stateParameter = searchParams.get("state");
            const code = searchParams.get("code");
            if (!stateParameter || !code) {
                navigate("/");
                return;
            }
        
            const route = localStorage.getItem(stateParameter);
            if (!route) {
                navigate("/");
                return;
            }
            try {
                console.log(route);
                await getTokenDetailsFromSource(code);
                navigate(route);
                localStorage.removeItem(stateParameter);
            } catch (error: any) {
                navigate("/")
            }
        }
        console.log("Fired once");
        navigateBackToRoute();

    }, []);

    return (
        <>
        </>
    );
}