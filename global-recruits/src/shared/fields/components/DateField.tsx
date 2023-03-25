import { ChangeEvent, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { DateTime } from "luxon";

interface DateFieldProps {
    value: string,
    onChange: (value: string) => void,
    label?: string,
    errorMessage?: string,
    placeholder?: string,
    className?: string
}

export default function DateField(props: DateFieldProps) {
    const date = DateTime.fromISO(props.value);
    const isoDate = date.toISODate()
    const [dateValues, setDateValues] = useState({
        DD: isoDate ? date.day.toString() : "",
        MM: isoDate ? date.month.toString() : "",
        YYYY: isoDate ? date.year.toString() : "",
    });

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

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        var numberRegex = /^-?\d*\.?\d*$/;
        const newState = { ...dateValues, [event.currentTarget.placeholder]: event.currentTarget.value };
        if (numberRegex.test(event.currentTarget.value)) {
            setDateValues(newState);
            const date = DateTime.fromISO(`${newState.YYYY}-${('0' + newState.MM).slice(-2)}-${('0' + newState.DD).slice(-2)}`);
            props.onChange(date.toISODate());
        }
    }

    return (
        <label className={"w-full block text-left " + props.className}>
            {props.label}
            <div className="w-full flex flex-row justify-center items-center">
                <label className="w-full block text-left">
                    <input placeholder="DD" value={dateValues.DD} onChange={handleDateChange} maxLength={2}
                        className="w-full block bg-gray-100 rounded-lg text-sm text-[#4e2217] leading-none p-3 focus:outline-none focus:border-gray-500" />
                </label>
                <span className="mx-4">/</span>
                <label className="w-full block text-left">
                    <input placeholder="MM" value={dateValues.MM} onChange={handleDateChange} maxLength={2}
                        className="w-full block bg-gray-100 rounded-lg text-sm text-[#4e2217] leading-none p-3 focus:outline-none focus:border-gray-500" />
                </label>
                <span className="mx-4">/</span>
                <label className="w-full block text-left">
                    <input placeholder="YYYY" value={dateValues.YYYY} onChange={handleDateChange} maxLength={4}
                        className="w-full block bg-gray-100 rounded-lg text-sm text-[#4e2217] leading-none p-3 focus:outline-none focus:border-gray-500" />
                </label>
            </div>
            {renderErrorMessage()}
        </label>
    );
}