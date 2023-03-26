import { ChangeEvent } from "react"
import { AiFillCloseCircle } from "react-icons/ai";

interface Item {
    label: string,
    value: string
}

interface SelectFieldProps {
    items: string[] | Item[],
    value: string,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    stateKey: string,
    label?: string,
    errorMessage?: string,
    placeholder?: string,
    className?: string,
    hideDefault?: boolean,
    required?: boolean
}

/**
 * A Custom Abstraction of a Select Field
 * @param props [value, onChange, stateKey, label?, errorMessage?, placeholder?, className?, hideDefault?, required]
 * @returns The Select Field
 */
export default function SelectField(props: SelectFieldProps) {
    const placeHolderText = props.placeholder ?? "Please Select";
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
            <select data-statekey={props.stateKey} value={props.value.toLocaleLowerCase()} onChange={props.onChange} placeholder={placeHolderText}
                className={"w-full block bg-gray-100 rounded-lg text-sm text-[#4e2217] leading-none border p-3 focus:outline-none focus:border-[#4e2217] border-r-transparent " + (props.errorMessage && " border-red-300")}>
                {!props.hideDefault && <option value="">Please Select</option>}
                {Object.entries(props.items).map(([key, value]) =>
                    <option key={key} value={value.value ? value.value.toLocaleLowerCase() : value.toLocaleLowerCase()}>{value.label ? value.label : value}</option>
                )}
            </select>
            {renderErrorMessage()}
        </label>
    );
}