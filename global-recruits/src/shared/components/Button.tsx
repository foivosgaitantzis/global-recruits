export default function Button(props: {fontSizeClass?: string, text: string, onClick?: any, color?: "black" | "white" | "gradient", className?: string }) {
    let colorClasses = " bg-[#4e2217] text-white";
    if (props.color === "white") {
        colorClasses = " bg-white text-[#4e2217]"
    } else if (props.color === "gradient") {
        colorClasses = " gradient-theme text-[#4e2217]"
    }
    return (
        <button
            className={"hover:underline font-bold rounded-xl py-3 px-5 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out text-" + (props.fontSizeClass ?? "base") + colorClasses + " " + props.className}
            onClick={props.onClick}>
                {props.text}
        </button>
    );
}