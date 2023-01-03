import { ReactNode } from "react";
import RoleBadge from "../RoleBadge";

export interface NavButton {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,
    name: string,
    icon: ReactNode,
    role?: string
}

export default function NavButton(props: NavButton) {
    return (
        <button className="my-2 xl:my-4 p-3 flex flex-col xl:flex-row items-center justify-center md:justify-start w-full mx-auto hover:bg-white rounded-lg" onClick={props.onClick}>
            <span className="px-2">{props.icon}</span>
            <div className="px-2 text-center xl:text-left text-xs lg:text-sm xl:text-lg flex flex-col 2xl:flex-row justify-center items-center xl:items-start 2xl:items-center">
                <span>{props.name}</span>
                {props.role && <span className="2xl:px-3"><RoleBadge name="BASIC" /></span>}
            </div>
        </button>
    );
}