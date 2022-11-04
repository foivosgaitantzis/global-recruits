import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRefreshTokenDetailsFromSource, getTokenDetailsFromSource } from "../util/auth.service";
import { get } from "../util/axios.service";
import LoadingPage from "./LoadingPage";

export default function Authenticate() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleAuthentication() {
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
                await getTokenDetailsFromSource(code);
                await get(undefined, "/member");                 
                navigate(route);
                localStorage.removeItem(stateParameter);
            } catch (error: any) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    navigate("/register?state=" + stateParameter);
                    return;
                }
                navigate("/")
            }
        }
        handleAuthentication();
    }, []);

    return (
        <LoadingPage />
    );
}