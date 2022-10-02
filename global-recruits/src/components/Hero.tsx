import Button from "./common/Button";
import MailingListSubscribe from "./common/MailingListSubscribe";

export default function Hero() {
    return (
        <section className="gradient h-screen font-custom text-white shadow shadow-2xl">
            <div className="container h-full flex items-center justify-center flex-wrap m-auto">
                <div className="w-full h-2/3 mx-8 border-b-2 sm:mx-0 sm:w-1/2 lg:w-2/3 sm:h-fit sm:border-r-2 sm:border-b-0 flex flex-col items-center justify-center text-center">
                    <img className="w-1/2 sm:w-3/12 my-2" src="logo.png" />
                    <span className="text-4xl font-bold">GLOBAL RECRUITS</span>
                    <div className="text-xl mt-2 mb-4">
                        Achieve your Dreams
                        <br />
                        Become a College Athlete
                    </div>
                    <Button text="FIND OUT MORE" fontSizeClass="lg" />
                </div>
                <div className="w-full h-1/3 sm:w-1/2 lg:w-1/3 sm:h-fit flex flex-col items-center justify-center text-center m-auto">
                    <span className="text-3xl font-bold my-3">STAY IN THE LOOP</span>
                    {/* <div className="text-xl my-3">
                        Subscribe to our Mailing List 
                        <br />
                        for Exclusive Content!
                    </div> */}
                    <MailingListSubscribe />
                    <div className="mt-3 sm:w-2/3 flex items-center justify-center">
                        <img className="w-1/12" src="exclamation.png" />
                        <div className="px-2 text-sm text-left">
                            Please enter a valid email address
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}