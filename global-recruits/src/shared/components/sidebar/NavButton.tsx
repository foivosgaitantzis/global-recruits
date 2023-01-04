import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import RoleBadge from "../RoleBadge";

export interface NavButton {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,
    navigateTo?: string,
    name: string,
    icon: ReactNode,
    role?: string
}

export default function NavButton(props: NavButton) {
    return (
        props.navigateTo && !props.onClick
            ? <NavLink className={({ isActive }) => (isActive && "bg-white ") + "my-2 2xl:my-4 p-3 flex flex-col xl:flex-row items-center justify-center md:justify-start w-full mx-auto hover:bg-white rounded-lg"} end to={props.navigateTo}>
                <span className="px-2">{props.icon}</span>
                <div className="px-2 text-center xl:text-left text-xs lg:text-sm 2xl:text-lg flex flex-col 2xl:flex-row justify-center items-center xl:items-start 2xl:items-start">
                    <span>{props.name}</span>
                    {props.role && <span className="2xl:px-3"><RoleBadge name="BASIC" /></span>}
                </div>
            </NavLink>
            :
            <button className="my-2 2xl:my-4 p-3 flex flex-col xl:flex-row items-center justify-center md:justify-start w-full mx-auto hover:bg-white rounded-lg" onClick={props.onClick}>
                <span className="px-2">{props.icon}</span>
                <div className="px-2 text-center xl:text-left text-xs lg:text-sm 2xl:text-lg flex flex-row flex-wrap justify-center xl:justify-start mx-0 min-w-0">
                    <span className="w-full overflow-hidden text-ellipsis">{props.name}</span>
                    {props.role && <span><RoleBadge name={props.role} /></span>}
                </div>
            </button>
    );
}