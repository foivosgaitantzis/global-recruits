export default function Button(props: any) {
    return (
        <button
            className={"hover:underline font-bold rounded-full py-4 px-8 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out text-" + props.fontSizeClass + (props.invertColors ? " gradient text-white" : " bg-white text-black" )}
            onClick={props.onClick}>
                {props.text}
        </button>
    );
}