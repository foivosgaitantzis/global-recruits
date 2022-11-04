import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/common/Button";
import LoadingPage from "../pages/LoadingPage";
import { get, post } from "../util/axios.service";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function RegisterPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [emailAddress, setEmailAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const [creating, setCreating] = useState(false);
    useEffect(() => {
        async function handleAllowRegistration() {
            // TODO: Scenario when State Parameter
            const stateParameter = searchParams.get("state");
            if (!stateParameter) {
                navigate("/");
                return;
            }

            const route = localStorage.getItem(stateParameter);
            if (!route) {
                navigate("/");
                return;
            }
            try {
                await get(undefined, "/member");
                navigate(route);
                localStorage.removeItem(stateParameter);
            } catch (error: any) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    return;
                }
                navigate("/");
            }
        }
        handleAllowRegistration();
    }, []);

    async function registerUser() {
        if (emailAddress && firstName && lastName) {
            try {
                setCreating(true);
                await post(undefined, "/member", {
                    data: {
                        firstName,
                        lastName,
                        emailAddress
                    }
                });
                await sleep(5000);
                const stateParameter = searchParams.get("state");
                console.log(stateParameter);
                if (!stateParameter) {
                    navigate("/profile");
                    return;
                }

                const route = localStorage.getItem(stateParameter);
                if (!route) {
                    navigate("/profile");
                    return;
                }
                console.log(route);
                navigate(route);
            } catch (error: any) {
                console.log("Error!")
            }
        }
    }

    return (
        creating
        ? <LoadingPage />
        : <>
            <div className="text-xl text-center flex flex-col items-center justify-center">
                <span className="mt-6 p-6">Welcome Guest! This is your first Login so you will need to provide some more details...</span>
                <input className="bg-gray-100 rounded-lg rounded-r-none text-lg text-black leading-none p-3 w-2/3 sm:w-1/2 md:w-1/4 focus:outline-none focus:border-gray-500 my-4" placeholder="Your First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                <input className="bg-gray-100 rounded-lg rounded-r-none text-lg text-black leading-none p-3 w-2/3 sm:w-1/2 md:w-1/4 focus:outline-none focus:border-gray-500" placeholder="Your Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                <input className="bg-gray-100 rounded-lg rounded-r-none text-lg text-black leading-none p-3 w-2/3 sm:w-1/2 md:w-1/4 focus:outline-none focus:border-gray-500 my-4" type="email" placeholder="Your Email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} />
                <Button fontSizeClass="lg" text="SIGN UP" onClick={registerUser} ></Button>
            </div>
        </>
    );
}