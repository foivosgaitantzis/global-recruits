import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import RoleBadge from "../RoleBadge";

export interface NavButton {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,
    navigateTo: string,
    name: string,
    icon: ReactNode,
    role?: string
}

export default function NavButton(props: NavButton) {
    return (
        <NavLink className={({ isActive }) => (isActive && "bg-white ") + " hover:bg-white rounded-lg my-2 2xl:my-3"} end to={props.navigateTo}>
            <div className="p-3 flex flex-col xl:flex-row items-center justify-center md:justify-start w-full">
                <span className="px-2">{props.icon}</span>
                <div className="px-2 text-center xl:text-left text-xs lg:text-sm 2xl:text-lg flex flex-col 2xl:flex-row justify-center items-center xl:items-start 2xl:items-center">
                    <span>{props.name}</span>
                    {props.role && <span className="2xl:px-3"><RoleBadge name="BASIC" /></span>}
                </div>
            </div>
        </NavLink>
    );
}