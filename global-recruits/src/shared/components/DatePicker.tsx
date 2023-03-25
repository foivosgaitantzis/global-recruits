import { ChangeEvent, useState } from "react";

interface DatePickerState {
    DD: string,
    MM: string,
    YY: string
}

export default function DatePicker(props: any) {
    const [dateValues, setDateValues] = useState({
        DD: "",
        MM: "",
        YYYY: ""
    });

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        var numberRegex = /^-?\d*\.?\d*$/;
        if (numberRegex.test(e.currentTarget.value)) {
            console.log(e.currentTarget.placeholder)
            setDateValues({ ...dateValues, [e.currentTarget.placeholder]: e.currentTarget.value })
        }
    }



    return (
        <div className={props.className}>
            Date of Birth
            <div className="w-full flex flex-row justify-center items-center">
                {/*
                <InputField placeholder="DD" label="Day" maxLength={2} className="my-2" value={dateValues.DD} setValue={(value: string, event: ChangeEvent<HTMLInputElement>) => handleDateChange(event)} />
                <p className="pt-6">/</p>
                <InputField placeholder="MM" label="Month" maxLength={2} className="my-2" value={dateValues.MM} setValue={(value: string, event: ChangeEvent<HTMLInputElement>) => handleDateChange(event)} />
                <p className="pt-7">/</p>
                <InputField placeholder="YYYY" label="Year" maxLength={4} className="my-2" value={dateValues.YYYY} setValue={(value: string, event: ChangeEvent<HTMLInputElement>) => handleDateChange(event)} />
    */}
            </div>
        </div>

    )
}