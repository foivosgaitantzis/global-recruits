import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setTokenDetailsFromSource } from "../util/auth.service";

export default function Authenticate() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
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
        //localStorage.removeItem(stateParameter);
        try {
            setTokenDetailsFromSource(code);
            navigate(route);
        } catch (error: any) {
            navigate("/")
        }
    }, []);

    return (
        <>
        </>
    );
}