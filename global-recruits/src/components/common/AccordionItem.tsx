import { useRef } from "react";

export default function AccordionItem(props: any) {
    const handleSetIndex = (index: any) => (props.activeIndex !== index) ? props.setActiveIndex(index) : props.setActiveIndex(0);
    const ref: any = useRef(null);

    return (
        <div className="w-full text-left">
            <button onClick={() => handleSetIndex(props.index)} className='gradient-text text-white flex w-full justify-between p-4 rounded hover:underline font-bold text-lg rounded-full shadow'>
                <div className='flex'>
                    <div className='font-bold'>{props.title}</div>
                </div>
                <div className="flex items-center justify-center my-auto ml-2">
                    {
                        (props.activeIndex === props.index)
                            ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                    }
                </div>
            </button>
            <div className="w-full transition-all duration-500 linear overflow-hidden my-4 px-4 text-lg " style={{ maxHeight: props.activeIndex === props.index ? ref.current.clientHeight + "px" : "0" }}>
                <div ref={ref}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}