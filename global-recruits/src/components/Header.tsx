import { useLayoutEffect, useState } from "react";

export default function Header() {
    const [invertHeaderColors, setInvertHeaderColors] = useState(false);
    const [displayNavMenu, setDisplayNavMenu] = useState(false);

    useLayoutEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            setInvertHeaderColors(scrollPos > 10);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <nav className={"fixed w-full top-0 text-white py-4 px-4 " + ((invertHeaderColors || displayNavMenu) && "gradient")}>
            <div className="flex justify-end pr-4 lg:hidden" onClick={() => setDisplayNavMenu(!displayNavMenu)}>
                <button className="focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={"w-full flex-grow lg:flex lg:items-center p-4 lg:p-0 text-center container mx-auto " + (!displayNavMenu && "hidden")}>
                <ul className="list-reset lg:flex justify-end flex-1 items-center text-xl lg:text-2xl">
                    {true ?
                        <>
                            <li className="mr-3">
                                <a className="inline-block no-underline hover:text-gray-200 hover:underline py-2 px-8" href="#!">About</a>
                            </li>
                            <li className="mr-3">
                                <a className="inline-block no-underline hover:text-gray-200 hover:underline py-2 px-8" href="#!">FAQ</a>
                            </li>
                            <li className="mr-3">
                                <a className="inline-block hover:text-gray-200 hover:underline py-2 px-8" href="#!">Team</a>
                            </li>
                        </>
                        : null
                    }
                </ul>
                <button
                    className={"mx-auto lg:mx-0 hover:underline text-base lg:text-xl font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out bg-white text-black"}>Buy Now
                </button>
            </div>
        </nav>
    );
}