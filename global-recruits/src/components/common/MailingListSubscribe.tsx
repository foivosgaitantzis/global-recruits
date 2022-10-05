import axios from "axios";
import { useState } from "react";

export default function MailingListSubscribe() {
    const [emailAddress, setEmailAddress] = useState("");
    const [mailingListStatus, setMailingListStatus] = useState({
        isError: false,
        isSuccessful: false,
        message: ""
    })
    const joinMailingList = async () => {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        if (apiBaseUrl) {
            let emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailAddress && emailRegex.test(emailAddress)) {
                try {
                    await axios.post(apiBaseUrl + "/join-mailing-list", {
                        email_address: emailAddress
                    })
                    setMailingListStatus({
                        isError: false,
                        isSuccessful: true,
                        message: "Successfully Joined our Mailing List"
                    })
                } catch (error: any) {
                    setMailingListStatus({
                        isError: true,
                        isSuccessful: false,
                        message: "An unexpected error has occured. Please try again later."
                    }) 
                }
            } else {
                setMailingListStatus({
                    isError: true,
                    isSuccessful: false,
                    message: "Please enter a Valid Email Address."
                })
            }
        } else {
            setMailingListStatus({
                isError: true,
                isSuccessful: false,
                message: "An unexpected error has occured. Please try again later."
            }) 
        }
    }
    return (
        <>
            <div className="flex items-center items-stretch justify-center w-full">
                <input className="bg-gray-100 rounded-lg rounded-r-none text-sm text-black leading-none p-3 w-1/2 focus:outline-none focus:border-gray-500" type="email" placeholder="Your Email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} />
                <button className="bg-black text-white font-medium text-sm hover:underline leading-none rounded-lg rounded-l-none py-3 px-2 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out" onClick={joinMailingList}>JOIN NOW</button>
            </div>
            <div className={"mt-5 sm:w-2/3 flex items-center justify-center " + ((!mailingListStatus.isError && !mailingListStatus.isSuccessful) && "hidden") }>
                <img className="w-6" src="exclamation.png" />
                <div className="px-2 text-sm text-left">
                    {mailingListStatus.message}
                </div>
            </div>
        </>
    );
}