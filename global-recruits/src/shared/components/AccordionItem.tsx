import { useRef } from "react";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs"

export default function AccordionItem(props: any) {
    const handleSetIndex = (index: any) => (props.activeIndex !== index) ? props.setActiveIndex(index) : props.setActiveIndex(0);
    const ref: any = useRef(null);

    return (
        <div className="w-full sm:w-3/4 text-left">
            <button onClick={() => handleSetIndex(props.index)} className='gradient-theme flex w-full justify-between p-4 rounded hover:underline font-bold text-md 2xl:text-lg rounded-xl '>
                <div className='flex px-4'>
                    <div className='font-bold'>{props.title}</div>
                </div>
                <div className="flex items-center justify-center my-auto px-4">
                    {
                        (props.activeIndex === props.index)
                            ? <BsFillCaretUpFill  />
                            : <BsFillCaretDownFill  />
                    }
                </div>
            </button>
            <div className="w-full transition-all duration-500 linear overflow-hidden my-4 px-8 text-md 2xl:text-lg " style={{ maxHeight: props.activeIndex === props.index ? ref.current.clientHeight + "px" : "0" }}>
                <div ref={ref}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}