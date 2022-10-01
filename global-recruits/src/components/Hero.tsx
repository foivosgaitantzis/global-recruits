import Button from "./common/Button";
import MailingListSubscribe from "./common/MailingListSubscribe";

export default function Hero() {
    return (
        <section className="gradient h-screen font-custom text-white">
            <div className="container pt-12 h-full flex items-center justify-center flex-wrap m-auto">
                <div className="w-full h-2/3 mx-8 border-b-2 sm:mx-0 sm:w-1/2 lg:w-2/3 sm:h-fit sm:border-r-2 sm:border-b-0 flex flex-col items-center justify-center text-center">
                    <img className="w-1/2 sm:w-2/6" src="logo.png" />
                    <span className="text-4xl text-[#89CFF1] font-bold my-2">GLOBAL RECRUITS</span>
                    <div className="text-2xl mb-8">
                        Achieve your Dreams
                        <br />
                        Become a College Athlete
                    </div>
                    <Button text="FIND OUT MORE" fontSizeClass="xl" />
                </div>
                <div className="w-full h-1/3 sm:w-1/2 lg:w-1/3 sm:h-fit flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold">Stay in the Loop</span>
                    <div className="text-lg font-bold my-3">
                        Subscribe to our Mailing List 
                        <br />
                        for Exclusive Content!
                    </div>
                    <MailingListSubscribe />
                </div>
            </div>
        </section>
    );
}