export default function Button(props: {fontSizeClass?: string, text: string, onClick?: any, color?: "black" | "white" | "gradient" }) {
    let colorClasses = " bg-black text-white";
    if (props.color == "white") {
        colorClasses = " bg-white text-black"
    } else if (props.color == "gradient") {
        colorClasses = " gradient-text text-white"
    }
    return (
        <button
            className={"hover:underline font-bold rounded-full py-4 px-8 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out text-" + (props.fontSizeClass ?? "base") + colorClasses}
            onClick={props.onClick}>
                {props.text}
        </button>
    );
}