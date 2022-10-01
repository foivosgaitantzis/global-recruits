export default function MailingListSubscribe() {
    return (
        <div className="flex items-center items-stretch justify-center w-full">
            <input className="bg-gray-100 rounded-lg rounded-r-none leading-none text-gray-800 p-4 w-1/2 focus:outline-none focus:border-gray-500" type="email" placeholder="Your Email" />
            <button className="hover:underline leading-none font-bold rounded-lg rounded-l-none py-4 px-2 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out bg-white text-black">SUBSCRIBE</button>
        </div>
    );
}