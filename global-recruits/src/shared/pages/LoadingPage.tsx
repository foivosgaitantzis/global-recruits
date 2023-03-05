export default function LoadingPage() {
    return (
        <div className="bg-white">
            <section className="h-screen font-custom text-[#4e2217] mx-4 sm:mx-0">
                <div className="w-full md:w-1/4 m-auto h-full flex flex-col items-center justify-center text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-16 w-16 mb-4"></div>
                </div>
            </section>
        </div>
    );
}