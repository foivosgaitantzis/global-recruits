interface ProgressBarProps {
    steps: any[],
    currentStep: number
}

export default function ProgressBar(props: ProgressBarProps) {
    const progressBarStyle = {
        width: `${(props.currentStep / props.steps.length) * 100}%`
    }

    return (
        <div className="w-full mb-4">
            <div className="flex items-center justify-between px-1">
                <span className="text-sm sm:text-md font-bold text-left">Step {props.currentStep} of {props.steps.length}</span>
                <span className="text-sm sm:text-md text-right"><span className="font-bold">Next:</span> {props.steps[props.currentStep].name ?? "Completion"}</span>
            </div>
            <div className="w-full h-4 bg-[#E0E5F5] rounded">
                <div style={progressBarStyle} className="bg-[#4e2217] h-4 rounded"></div>
            </div>
        </div>
    )
}