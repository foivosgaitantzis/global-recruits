import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetDiscordAccessToken, navigateToDiscordLogin } from "../util/auth.service";

const discordApiUrl = process.env.REACT_APP_DISCORD_API_URL;

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function executeToken() {
            const discordTokenDetailsText = localStorage.getItem("DiscordTokenDetails");
            if (!discordTokenDetailsText) {
                navigate("/");
                return;
            }
            const accessTokenStorage: GetDiscordAccessToken = JSON.parse(discordTokenDetailsText)

            try {
                const response = await axios.get(discordApiUrl + "/users/@me", {
                    headers: {
                        Authorization: "Bearer " + accessTokenStorage.access_token
                    }
                });
                setName(response.data.username + ":" + response.data.discriminator);
                setEmail(response.data.email);
            } catch (error: any) {
                console.log("Error detected");
            }
        }

        executeToken();
    }, []);


    return (
        <div className="text-xl text-center">
            Hello <span className="font-bold">{name}</span>!
            <br />
            Your Email: {email}
        </div>
    );
}