import { useStateContext } from "../../state/AppStateProvider";
import RoleBadge from "../RoleBadge";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogOut, FiBookOpen, FiSettings } from "react-icons/fi"
import { TfiBasketball } from "react-icons/tfi";
import { BiStore } from "react-icons/bi";
import NavButton from "./NavButton";
import { Auth } from "aws-amplify";
import { AuthenticatedRoutes } from "../../../authenticated/routes";
import { UnauthenticatedRoutes } from "../../../unauthenticated/routes";

export default function Sidebar() {
    const user = useStateContext().user;
    return (
        <div className="h-full flex flex-col justify-between justify-center">
            <div className="justify-center hidden lg:flex flex-col 2xl:flex-row">
                <img src="/logo.png" className="mx-auto 2xl:mx-0 w-16 h-16 hidden md:block" />
                <div className="flex flex-col mx-6 text-center 2xl:text-left">
                    <span className="font-bold text-md py-1 2xl:py-0">Welcome, {user?.attributes.name}</span>
                    <span className="text-sm text-ellipsis overflow-hidden py-1 2xl:py-0">{user?.attributes.email}</span>
                    <RoleBadge name="BASIC" />
                </div>
            </div>
            <div className="grow flex flex-col justify-start lg:justify-center shrink-0 py-0 lg:py-2 2xl:py-0 min-w-fit">
                <NavButton name="Dashboard" icon={<AiOutlineHome size="20" className="shrink-0" />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/`} />
                <NavButton name="My Courses" icon={<FiBookOpen size="20" className="shrink-0"  />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/${AuthenticatedRoutes.courses}`} />
                <NavButton name="My Recruitment" icon={<TfiBasketball size="20" className="shrink-0" />} role="BASIC" navigateTo={`/${AuthenticatedRoutes.defaultPath}/asdf1`} />
                <NavButton name="Store" icon={<BiStore size="20" className="shrink-0" />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/asdf2`} />
                <NavButton name="Settings" icon={<FiSettings size="20" className="shrink-0" />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/asdf3`} />
            </div>
            <div className="pt-2 flex flex-col">
                <NavButton name="Log out" icon={<FiLogOut size="20" className="shrink-0" />} navigateTo={`${UnauthenticatedRoutes.logout}`} />
            </div>
        </div>
    );
}