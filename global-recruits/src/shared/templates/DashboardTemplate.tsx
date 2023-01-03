import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";

interface DashboardTemplateProperties {
    loadMember?: boolean,
    children: ReactNode
}

export default function DashboardTemplate(props: DashboardTemplateProperties) {
    return (
        <div className="h-full min-h-screen w-full flex m-0 font-custom">
            <div className="m-0 gradient-theme h-full w-1/3 sm:w-1/8 md:w-1/6 border-r fixed overflow-hidden">
                <div className="py-8 px-4 2xl:px-8 h-full min-h-fit overflow-y-auto overflow-x-hidden">
                    <Sidebar />
                </div>
            </div>
            <div className="h-full w-2/3 sm:w-7/8 md:w-5/6 ml-auto">
                <div className="m-4">
                    {props.children}
                </div>
            </div>
        </div>
    );
}