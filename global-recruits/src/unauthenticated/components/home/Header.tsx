import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes } from "../../../authenticated/routes";
import Button from "../../../shared/components/Button";
import scrollToDiv from "../../../shared/helpers/scrollToDiv";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header(props: any) {
    const navigate = useNavigate();
    const [displayNavMenu, setDisplayNavMenu] = useState(false);

    return (
        <nav className={"w-full top-0 text-[#4e2217] absolute " + ((displayNavMenu) && " border-b border-black bg-white")}>
            <div className={"" + (displayNavMenu && "gradient ")}>
                <div className="py-4 px-8">
                    <div className="flex lg:hidden" onClick={() => setDisplayNavMenu(!displayNavMenu)}>
                        <button className="focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            <GiHamburgerMenu size="40" />
                        </button>
                    </div>
                    <div className={"w-full flex-grow lg:flex lg:items-center p-4 lg:p-0 text-center mx-auto container " + (!displayNavMenu && "hidden ")}>
                        <ul className="list-reset lg:flex justify-end flex-1 items-center text-lg 2xl:text-xl font-bold">
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
                            <Button text="DASHBOARD" fontSizeClass="md 2xl:text-lg" onClick={() => navigate(`${AuthenticatedRoutes.defaultPath}`)} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <hr className={(!displayNavMenu && "border-0") + " lg:border-t border-black"} /> */}
        </nav>
    );
}