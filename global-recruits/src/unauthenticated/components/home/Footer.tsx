import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <section className="mt-12 lg:mt-24 mx-8">
            <hr className="border-black" />
            <div className="container mx-auto py-8">
                <div className="grid md:grid-cols-2 text-md 2xl:text-lg">
                    <div className="flex flex-col m-auto text-left w-fit">
                        <a href="#!">Terms & Conditions</a>
                        <a href="#!">Privacy</a>
                        <a href="#!" className="font-bold">Download Discord Now →</a>
                    </div>
                    <div className="flex flex-col m-auto mt-8 md:mt-0 w-fit text-center">
                        <span className="font-bold">FOLLOW GlobalRecruits</span>
                        <div className="flex justify-center my-2">
                            <div className="rounded-full gradient-theme p-3 w-10 mx-4">
                                <FaTwitter />
                            </div>
                            <div className="rounded-full gradient-theme p-3 w-10 mx-3" >
                                <FaFacebook />
                            </div>
                            <div className="rounded-full gradient-theme p-3 w-10 mx-4">
                                <FaInstagram />
                            </div>
                        </div>
                        <span className="font-bold">contact@globalrecruits.net</span>
                    </div>
                </div>
            </div>
        </section>
    );
}