import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes } from "../../../authenticated/routes";
import Button from "../../../shared/components/Button";
import scrollToDiv from "../../../shared/helpers/scrollToDiv";

export default function Header(props: any) {
    const navigate = useNavigate();
    const [displayNavMenu, setDisplayNavMenu] = useState(false);

    return (
        <nav className={"w-full top-0 text-black absolute " + ((displayNavMenu) && "gradient border-b border-black")}>
            <div className="py-4 px-4">
                <div className="flex lg:hidden" onClick={() => setDisplayNavMenu(!displayNavMenu)}>
                    <button className="focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out border">
                        <svg className="fill-current h-8 w-8" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className={"w-full flex-grow lg:flex lg:items-center p-4 lg:p-0 text-center container mx-auto " + (!displayNavMenu && "hidden ")}>
                    <ul className="list-reset lg:flex justify-end flex-1 items-center text-xl lg:text-xl font-bold">
                        {true ?
                            <>
                                <li className="">
                                    <a className="inline-block no-underline hover:underline py-2 px-7" href="#!" onClick={() => scrollToDiv("features")} >About</a>
                                </li>
                                <li className="">
                                    <a className="inline-block no-underline hover:underline py-2 px-7" href="#!" onClick={() => scrollToDiv("faqs")} >FAQ</a>
                                </li>
                                <li className="">
                                    <a className="inline-block hover:underline py-2 px-7" href="#!" onClick={() => scrollToDiv("products")} >Team</a>
                                </li>
                            </>
                            : null
                        }
                    </ul>
                    <div className="mt-4 lg:mt-0">
                        <Button text="Dashboard" fontSizeClass="lg" onClick={() => navigate(`${AuthenticatedRoutes.defaultPath}`)} />
                    </div>
                </div>
            </div>
            {/* <hr className={(!displayNavMenu && "border-0") + " lg:border-t border-black"} /> */}
        </nav>
    );
}