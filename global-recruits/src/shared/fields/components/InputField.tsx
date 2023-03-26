import { ChangeEvent } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface InputFieldProps {
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    stateKey: string,
    label?: string,
    errorMessage?: string,
    placeholder?: string,
    className?: string
    minLength?: number,
    maxLength?: number,
    required?: boolean
}

export default function InputField(props: InputFieldProps) {
    const placeHolderText = props.placeholder ??
        (props.label ? "Your " + props.label : "")
    const renderErrorMessage = () => {
        if (props.errorMessage) {
            return (
                <div className="py-2 flex items-center">
                    <AiFillCloseCircle size="24" />
                    <div className="px-2 text-sm text-left">
                        {props.errorMessage}
                    </div>
                </div>
            );
        }
    }

    const renderLabel = () => {
        if (props.label) {
            return <>
                {props.label} {props.required && <span className="text-red-500">*</span>}
            </> 
        } else {
            return <br />
        }
    }
    
    return (
        <label className={"w-full block text-left " + props.className}>
            {renderLabel()}
            <input data-statekey={props.stateKey} value={props.value} minLength={props.minLength} maxLength={props.maxLength} onChange={props.onChange} placeholder={placeHolderText}
                className={"w-full block bg-gray-100 rounded-lg text-sm text-[#4e2217] leading-none border p-3 focus:outline-none focus:border-[#4e2217] " + (props.errorMessage && " border-red-300")}
            />
            {renderErrorMessage()}
        </label>
    );
}