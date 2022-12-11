export default function LoadingPage() {
    return (
        <div className="gradient-noimg">
            <section className="h-screen font-custom text-black mx-4 sm:mx-0">
                <div className="w-full md:w-1/4 m-auto h-full flex flex-col items-center justify-center text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-16 w-16 mb-4"></div>
                    <p className="text-3xl font-bold my-3">Loading ...</p>
                    <p className="w-1/2 text-xl">This may take a few seconds, please don't close this page</p>
                </div>
            </section>
        </div>
    );
}