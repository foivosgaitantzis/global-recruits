export default function SectionTitle(props: any) {
    return (
        <div className="mb-8">
            <h2 className="text-5xl font-bold text-center text-gray-800">
                {props.children}
            </h2>
            <div className="mt-4">
                <div className="h-1 mx-auto w-64 my-0 py-0 rounded-t gradient-text"></div>
            </div>
        </div>
    );
}