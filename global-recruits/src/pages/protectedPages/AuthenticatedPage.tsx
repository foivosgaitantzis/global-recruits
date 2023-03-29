import { Auth } from "aws-amplify";
import Authenticated from "../../components/amplify/Authenticated";
import Button from "../../components/common/Button";

export default function AuthenticatedPage() {
    const signOut = async () => {
        try {
            Auth.signOut();
            window.location.href = "/";
        } catch (error) {
            console.error("error signing out: ", error);
        }
    };

    return (
        <Authenticated>
            Hello there?
            <Button text="Sign Out" onClick={signOut} />
        </Authenticated>
    );
}