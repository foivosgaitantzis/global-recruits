export default function SectionTitle(props: any) {
    return (
        <div className="mb-8">
            <h2 className="text-4xl 2xl:text-5xl font-bold text-center text-gray-800">
                {props.children}
            </h2>
            <div className="mt-4">
                <div className="h-1 mx-auto w-1/2 sm:w-1/4 2xl:w-1/3 my-0 py-0 rounded-t gradient-text"></div>
            </div>
        </div>
    );
}