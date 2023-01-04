import { ReactNode, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { GiHamburgerMenu } from 'react-icons/gi'

interface DashboardTemplateProperties {
    loadMember?: boolean,
    children: ReactNode
}

export default function DashboardTemplate(props: DashboardTemplateProperties) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    return (
        <div className="h-full min-h-screen w-full flex m-0 font-custom relative">
            <div className={"transition-all transition-slowest ease m-0 gradient-theme h-full border-r border-gray-350 fixed " + (sidebarOpen ? "w-1/3 sm:w-1/8 md:w-1/6" : "w-0")}>
                <div className="absolute right-[-40px] top-0 h-full min-h-fit bg-white lg:hidden">
                    <button className="w-10 h-10 gradient-theme-inverse m-auto flex justify-center items-center border-b border-r border-t border-gray-350" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <GiHamburgerMenu className="w-3/4 h-3/4" />
                    </button>
                </div>
                <div className="h-full min-h-fit overflow-y-auto overflow-x-hidden">
                    <div className="h-full min-h-fit py-4 xl:py-8 px-4 2xl:px-8">
                    <Sidebar />
                    </div>
                </div>
            </div>
            <div className={"transition-all transition-slowest ease h-full ml-auto pl-10 lg:pl-0 " + (sidebarOpen ? "w-2/3 sm:w-7/8 md:w-5/6" : "w-full")}>
                <div className="m-4">
                    {props.children}
                </div>
            </div>
        </div>
    );
}