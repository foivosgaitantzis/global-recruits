import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="gradient">
            <section className="h-screen font-custom text-black mx-4 sm:mx-0">
                <div className="w-full md:w-1/4 m-auto h-full flex flex-col items-center justify-center text-center">
                    <span className="text-8xl font-bold">Oops!</span>
                    <span className="text-3xl font-bold mt-6 mb-4">404 - PAGE NOT FOUND</span>
                    <span className="text-xl font-bold">The page you are looking for might have been had its name changed or is temporarily unavailable</span>
                    <span className="text-xl font-bold mb-4"></span>
                    <Button color="black" text="GO TO HOMEPAGE" fontSizeClass="lg" onClick={() => navigate("/")} />
                </div>
            </section>
        </div>
    );
}