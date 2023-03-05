import { useStateContext } from "../../state/AppStateProvider";
import RoleBadge from "../RoleBadge";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogOut, FiBookOpen, FiSettings } from "react-icons/fi"
import { TfiBasketball } from "react-icons/tfi";
import { BiStore } from "react-icons/bi";
import NavButton from "./NavButton";
import { AuthenticatedRoutes } from "../../../authenticated/routes";
import { UnauthenticatedRoutes } from "../../../unauthenticated/routes";
import { UserType } from "../../state/models/UserType.enum";

export default function Sidebar() {
    const user = useStateContext().user;

    const drawSidebarComponents = (userType?: UserType) => {
        switch (userType) {
            case UserType.athlete:
                return <>
                    <NavButton name="My Profile" icon={<AiOutlineHome size="20" className="shrink-0" />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/`} />
                    <NavButton name="My Recruitment" icon={<TfiBasketball size="20" className="shrink-0" />} role="SOON" navigateTo={`#`} />
                    <NavButton name="Settings" icon={<FiSettings size="20" className="shrink-0" />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/asdf3`} />
                </>
            case UserType.staff:
                return <>
                    <NavButton name="ALL Players" icon={<TfiBasketball size="20" className="shrink-0" />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/`} />
                    <NavButton name="Settings" icon={<FiSettings size="20" className="shrink-0" />} navigateTo={`/${AuthenticatedRoutes.defaultPath}/asdf3`} />
                </>
            default: 
                return undefined;
        }
    }

    return (
        <div className="h-full flex flex-col justify-between justify-center">
            <div className="justify-center hidden lg:flex flex-col items-center">
                <img src="/logo.png" className="mx-6 w-3/4 hidden md:block" />
                <div className="flex flex-col mx-6 text-center items-center">
                    <span className="font-bold text-md py-1 2xl:py-0">Welcome, {user?.attributes.name}</span>
                    <span className="text-sm text-ellipsis overflow-hidden py-1 2xl:py-0">{user?.attributes.email}</span>
                    <RoleBadge name={String(Object.values(UserType)[Number(user?.pgUserType)]).toUpperCase()} /> 
                </div>
            </div>
            <div className="grow flex flex-col justify-start lg:justify-center shrink-0 py-0 lg:py-2 2xl:py-0 min-w-fit">
                {drawSidebarComponents(user?.pgUserType)}
            </div>
            <div className="pt-2 flex flex-col">
                <NavButton name="Log out" icon={<FiLogOut size="20" className="shrink-0" />} navigateTo={`${UnauthenticatedRoutes.logout}`} />
            </div>
        </div>
    );
}