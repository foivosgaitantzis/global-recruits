export default function MailingListSubscribe() {
    return (
        <div className="flex items-center items-stretch justify-center w-full">
            <input className="bg-gray-100 rounded-lg rounded-r-none text-sm text-black leading-none p-3 w-1/2 focus:outline-none focus:border-gray-500" type="email" placeholder="Your Email" />
            <button className="bg-black text-white font-medium text-sm hover:underline leading-none rounded-lg rounded-l-none py-3 px-2 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out">JOIN NOW</button>
        </div>
    );
}