import Button from "./common/Button";
import MailingListSubscribe from "./common/MailingListSubscribe";

export default function Hero() {
    return (
        <section className="gradient h-screen font-custom text-black shadow shadow-2xl">
            <div className="container h-full flex items-center justify-center flex-wrap m-auto">
                <div className="w-full h-2/3 mx-8 border-b-2 sm:mx-0 sm:w-1/2 lg:w-2/3 sm:h-fit sm:border-r-2 sm:border-b-0 border-black flex flex-col items-center justify-center text-center">
                    <img className="w-1/2 sm:w-3/12 my-2" src="logo.png" />
                    <span className="text-4xl font-bold">GLOBAL RECRUITS</span>
                    <div className="text-xl mt-2 mb-4">
                        Achieve your <span className="font-bold">Dreams</span>
                        <br />
                        Become a College <span className="font-bold">Athlete</span>
                    </div>
                    <Button text="FIND OUT MORE" fontSizeClass="lg" />
                </div>
                <div className="w-full h-1/3 sm:w-1/2 lg:w-1/3 sm:h-fit flex flex-col items-center justify-center text-center m-auto">
                    <span className="text-2xl font-bold my-4">STAY IN THE LOOP !</span>
                    <MailingListSubscribe />
                    <div className="mt-5 sm:w-2/3 flex items-center justify-center">
                        <img className="w-6" src="exclamation.png" />
                        <div className="px-2 text-sm text-left">
                            Please enter a valid email address
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}