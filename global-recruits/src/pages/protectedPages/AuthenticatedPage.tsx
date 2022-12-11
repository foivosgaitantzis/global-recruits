import { Auth, Hub } from "aws-amplify";
import { cloneElement, useEffect, useState } from "react";
import Authenticator from "../../components/amplify/Authenticator";

export default function AuthenticatedPage(props: any) {
    const [user, setUser] = useState<any>(undefined);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                if (user) {
                    setUser(user);
                }
            } catch (error: any) {
                console.log("Not currently authenticated.");
            }
        };
        const listener = Hub.listen('auth', getUserInfo);
        getUserInfo();
        return () => listener()
    }, []);

    const signOut = async () => {
        try {
            await Auth.signOut();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <Authenticator>
            <>
                {user ?
                    cloneElement(props.children, { user, signOut })
                    : null
                }
            </>
        </Authenticator>
    );
}