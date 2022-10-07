import axios from "axios";
import { useState } from "react";

const sleep = (ms: any) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default function MailingListSubscribe() {
    const [emailAddress, setEmailAddress] = useState("");
    const [mailingListStatus, setMailingListStatus] = useState({
        isError: false,
        isSuccessful: false,
        isProcessing: false,
        message: ""
    })
    const joinMailingList = async () => {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
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
                    await axios.post(apiBaseUrl + "/join-mailing-list", {
                        email_address: emailAddress
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
                        if (errorData.title === "Member Exists") {
                            setMailingListStatus({
                                isError: true,
                                isSuccessful: false,
                                isProcessing: false,
                                message: "You are already a member"
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
                    ? <svg className="px-2 w-10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 204.481 204.481" xmlSpace="preserve">
                        <g>
                            <path d="M162.116,38.31c0.163-0.215,0.315-0.438,0.454-0.67c0.033-0.055,0.068-0.109,0.1-0.164
                                c0.156-0.276,0.297-0.561,0.419-0.857c0.014-0.034,0.024-0.069,0.038-0.104c0.102-0.26,0.188-0.528,0.261-0.801
                                c0.019-0.069,0.037-0.137,0.053-0.207c0.068-0.288,0.124-0.581,0.157-0.881c0.002-0.017,0.006-0.034,0.008-0.052
                                c0.028-0.262,0.043-0.527,0.043-0.796V7.5c0-4.142-3.358-7.5-7.5-7.5H48.332c-4.142,0-7.5,3.358-7.5,7.5v26.279
                                c0,0.269,0.016,0.534,0.043,0.796c0.002,0.017,0.006,0.034,0.008,0.052c0.034,0.3,0.089,0.593,0.157,0.881
                                c0.016,0.069,0.035,0.138,0.053,0.207c0.073,0.273,0.159,0.541,0.261,0.801c0.013,0.034,0.024,0.069,0.038,0.104
                                c0.121,0.296,0.262,0.581,0.419,0.857c0.032,0.056,0.067,0.109,0.1,0.164c0.14,0.232,0.291,0.455,0.454,0.67
                                c0.027,0.035,0.047,0.074,0.074,0.109l50.255,63.821l-50.255,63.821c-0.028,0.035-0.047,0.074-0.074,0.109
                                c-0.163,0.215-0.315,0.438-0.454,0.67c-0.033,0.055-0.068,0.109-0.1,0.164c-0.156,0.276-0.297,0.561-0.419,0.857
                                c-0.014,0.034-0.024,0.069-0.038,0.104c-0.102,0.26-0.188,0.528-0.261,0.801c-0.019,0.069-0.037,0.137-0.053,0.207
                                c-0.068,0.288-0.124,0.581-0.157,0.881c-0.002,0.017-0.006,0.034-0.008,0.052c-0.028,0.262-0.043,0.527-0.043,0.796v26.279
                                c0,4.142,3.358,7.5,7.5,7.5h107.817c4.142,0,7.5-3.358,7.5-7.5v-26.279c0-0.269-0.016-0.534-0.043-0.796
                                c-0.002-0.017-0.006-0.034-0.008-0.052c-0.034-0.3-0.089-0.593-0.157-0.881c-0.016-0.069-0.035-0.138-0.053-0.207
                                c-0.073-0.273-0.159-0.541-0.261-0.801c-0.013-0.034-0.024-0.069-0.038-0.104c-0.121-0.296-0.262-0.581-0.419-0.857
                                c-0.032-0.056-0.067-0.109-0.1-0.164c-0.14-0.232-0.291-0.455-0.454-0.67c-0.027-0.035-0.047-0.074-0.074-0.109l-50.255-63.821
                                l50.255-63.821C162.07,38.385,162.089,38.346,162.116,38.31z M148.649,15v11.279H55.832V15H148.649z M55.832,189.481v-11.279
                                h92.817v11.279H55.832z M140.698,163.202H63.784l38.457-48.838L140.698,163.202z M102.241,90.118L63.784,41.279h76.914
                                L102.241,90.118z"/>
                        </g>
                    </svg>
                    : mailingListStatus.isError
                        ? <svg className="px-2 w-10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 51.976 51.976" xmlSpace="preserve">
                            <g>
                                <path d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0
                                    C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778
                                    c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828
                                    c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828
                                    l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/>
                            </g>
                        </svg>
                        : <svg className="px-2 w-10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 191.667 191.667" xmlSpace="preserve">
                            <path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z
                                M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685
                                c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971
                                l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969
                                C156.146,65.765,156.146,74.362,150.862,79.646z"/>
                        </svg>
                }
                <div className="px-2 text-sm text-left">
                    {mailingListStatus.message}
                </div>
            </div>
        </>
    );
}