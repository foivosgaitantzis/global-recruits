interface RoleBadgeProperties {
    name: string
}

export default function RoleBadge(props: RoleBadgeProperties) {
    return (
        <div className="bg-[#4e2217] border border-white text-white w-fit my-1 py-1 px-2 text-xs 2xl:text-sm rounded-lg mx-auto 2xl:mx-0">
            {props.name}
        </div>
    );
}