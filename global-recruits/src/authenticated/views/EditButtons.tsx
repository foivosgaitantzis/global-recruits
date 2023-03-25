import Button from "../../shared/components/Button";

interface ProfileEditButtonProps {
    submitName: string,
    cancelName: string,
    onCancelClick: () => void,
    onSubmitClick: () => void
}

export default function ProfileEditButton(props: ProfileEditButtonProps) {
    return (
        <div className="mt-8">
            <Button fontSizeClass="lg" text={props.cancelName} onClick={props.onCancelClick} color="white" className="mx-2" />
            <Button fontSizeClass="lg" text={props.submitName} onClick={props.onSubmitClick} className="mx-2" />
        </div>
    );
}