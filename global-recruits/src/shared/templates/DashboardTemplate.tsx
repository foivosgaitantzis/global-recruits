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
        <div className="h-full min-h-screen flex font-custom relative">
            <div className={"h-screen gradient-theme sticky top-0 border-r border-gray-350 transition-all transition-slowest ease " + (sidebarOpen ? "w-1/3 sm:w-1/8 md:w-1/6" : "w-0 lg:w-1/6")}>
                <div className="h-full overflow-y-auto overflow-x-hidden">
                    <div className="h-full py-4 xl:py-8 px-4 2xl:px-8 ">
                        <Sidebar />
                    </div>
                </div>
            </div>
            <div className="w-10 h-10 gradient-theme-inverse sticky top-0 shrink-0 lg:hidden">
                <button className="w-full h-full flex justify-center items-center border-b border-r border-t border-gray-350" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <GiHamburgerMenu className="w-4/6 h-4/6" />
                </button>
            </div>
            <div className="grow m-4 transition-all transition-slowest ease">
                {props.children}
            </div>
        </div>
    );
}