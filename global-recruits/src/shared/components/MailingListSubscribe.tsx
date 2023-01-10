import axios from "axios";
import { useState } from "react";
import { BsHourglass } from "react-icons/bs"
import { AiFillCloseCircle } from "react-icons/ai"
import { IoIosCheckmarkCircle } from "react-icons/io"

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function MailingListSubscribe() {
    const [emailAddress, setEmailAddress] = useState("");
    const [mailingListStatus, setMailingListStatus] = useState({
        isError: false,
        isSuccessful: false,
        isProcessing: false,
        message: ""
    })
    const joinMailingList = async () => {
        if (apiBaseUrl) {
            let emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailAddress && emailRegex.test(emailAddress)) {
                try {
                    setMailingListStatus({
                        isError: false,
                        isSuccessful: false,
                        isProcessing: true,
                        message: "Adding you to our mailing List"
                    });
                    await axios.post(apiBaseUrl + "/mailinglist", {
                        data: {
                            emailAddress: emailAddress
                        }
                    })
                    setMailingListStatus({
                        isError: false,
                        isSuccessful: true,
                        isProcessing: false,
                        message: "Successfully Joined our Mailing List"
                    })
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        const errorData: any = error.response?.data;
                        if (errorData?.title === "Member Exists") {
                            setMailingListStatus({
                                isError: false,
                                isSuccessful: true,
                                isProcessing: false,
                                message: "You are already a member :)"
                            });
                        } else {
                            setMailingListStatus({
                                isError: true,
                                isSuccessful: false,
                                isProcessing: false,
                                message: "An unexpected error has occured"
                            });
                        }
                    } else {
                        setMailingListStatus({
                            isError: true,
                            isSuccessful: false,
                            isProcessing: false,
                            message: "An unexpected error has occured"
                        });
                    }
                }
            } else {
                setMailingListStatus({
                    isError: true,
                    isSuccessful: false,
                    isProcessing: false,
                    message: "Please enter a Valid Email Address."
                })
            }
        } else {
            setMailingListStatus({
                isError: true,
                isSuccessful: false,
                isProcessing: false,
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
            <div className={"mt-5 sm:w-2/3 flex items-center justify-center " + ((!mailingListStatus.isError && !mailingListStatus.isSuccessful && !mailingListStatus.isProcessing) && "hidden")}>
                {mailingListStatus.isProcessing
                    ? <BsHourglass size="24" />
                    : mailingListStatus.isError
                        ? <AiFillCloseCircle size="24" />
                        : <IoIosCheckmarkCircle size="24" />
                }
                <div className="px-2 text-sm text-left">
                    {mailingListStatus.message}
                </div>
            </div>
        </>
    );
}