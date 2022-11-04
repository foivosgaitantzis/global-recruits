import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { get } from "../util/axios.service";

const discordApiUrl = process.env.REACT_APP_DISCORD_API_URL;

export default function Profile() {
    const [memberData, setMemberData] = useState<any>();
    const [avatar, setAvatar] = useState<any>();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getMemberData() {
            try {
                const response = await get(undefined, "/member");
                const avatarResponse = await get(undefined, "/member/avatar", undefined, "blob");
                if (response) {
                    setMemberData(response.data.data);
                    if (avatarResponse) {
                        const imageObjectUrl = URL.createObjectURL(avatarResponse.data);
                        setAvatar(imageObjectUrl);
                    }
                    setLoaded(true);
                } else {
                    navigate("/");
                }
            } catch (error: any) {
                navigate("/");
            }
        }

        getMemberData();
    }, []);

    return (
        loaded
        ? <div className="text-xl text-center flex flex-col items-center justify-center">
            <div className="my-4">Hello <span className="font-bold">{memberData?.firstName + " " + memberData?.lastName}</span>!</div>
            <div><img src={avatar} alt="icons" /></div>
        </div>
        : <LoadingPage />
    );
}