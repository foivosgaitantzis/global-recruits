import { ChangeEvent, FormEvent, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface TextAreaProps {
    value: string,
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    stateKey: string,
    label?: string,
    errorMessage?: string,
    placeholder?: string,
    className?: string
    minLength?: number,
    maxLength?: number,
    required?: boolean,
    wordLimit?: number
}

export default function TextArea(props: TextAreaProps) {
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

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        var len = event.currentTarget.value.split(/[\s]+/);
        if (props.wordLimit && (len.length > props.wordLimit)) {
            return false;
        } else {
            return props.onChange(event);
        }
    }

    const autoGrowTextArea = (event: FormEvent<HTMLTextAreaElement>) => {
        event.currentTarget.style.height = "192px";
        event.currentTarget.style.height = (event.currentTarget.scrollHeight) + "px";
    }

    return (
        <label className={"w-full block text-left " + props.className}>
            {renderLabel()}
            <textarea data-statekey={props.stateKey} value={props.value} minLength={props.minLength} maxLength={props.maxLength} onChange={onChange} placeholder={placeHolderText}
                className={"w-full block h-48 overflow-hidden resize-none bg-gray-100 rounded-lg text-sm text-[#4e2217] leading-none border p-3 focus:outline-none focus:border-[#4e2217] " + (props.errorMessage && " border-red-300")}
                onInput={autoGrowTextArea}
            />
            {renderErrorMessage()}
        </label>
    );
}