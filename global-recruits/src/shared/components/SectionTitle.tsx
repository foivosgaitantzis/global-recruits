export default function SectionTitle(props: any) {
    return (
        <div className="mb-8 w-fit mx-auto flex flex-col">
            <h2 className="text-4xl 2xl:text-5xl font-bold text-center text-[#4e2217]">
                {props.children}
            </h2>
            <div className="mt-4">
                <div className="h-1 w-full rounded-t gradient"></div>
            </div>
        </div>
    );
}