import { AiFillCloseCircle } from "react-icons/ai"

interface SelectFieldProps {
    items: string[],
    value?: string,
    label?: string
    className?: string,
    errorMessage?: string,
    setValue: (value: string) => void
}

export default function SelectField(props: SelectFieldProps) {
    return (
        <label className={"w-full block text-left px-5 " + props.className}>
            {props.label}
            <select value={props.value ?? ""} onChange={(event) => props.setValue(event.target.value)} className="w-full block border-r-8 border-transparent bg-gray-100 rounded-lg text-sm text-[#4e2217] leading-none p-3 focus:outline-none" placeholder={"Your " + props.label}>
                <option value={""}>Please Select</option>
                {Object.entries(props.items).map(([key, value]) => {
                    return <option key={key} value={value}>{value}</option>
                })}
            </select>
            <div className={"py-2 flex items-center " + (!props.errorMessage && 'hidden')}>
                <AiFillCloseCircle size="24" />
                <div className="px-2 text-sm text-left">
                    {props.errorMessage}
                </div>
            </div>
        </label>
    )
}