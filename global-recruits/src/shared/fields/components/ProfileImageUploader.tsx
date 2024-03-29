import { ChangeEvent } from "react"
import Button from "../../components/Button";
import { RiImageFill } from "react-icons/ri"
import { ProfilePictureModel } from "../../state/models/ProfilePictureModel";
import { createPictureElement } from "../../services/loadMember";

interface ProfileImageUploaderProps {
    image?: ProfilePictureModel,
    onChange: (profilePicture: ProfilePictureModel | undefined) => void
}

/**
 * A Profile Picture Uploader
 * @param props [image, onChange]
 * @returns The Profile Picture Uploader Component
 */
export default function ProfileImageUploader(props: ProfileImageUploaderProps) {
    const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        if (file) {
            const image = await createPictureElement(file);
            props.onChange({
                file,
                image
            });
        }
    }

    const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = event.target as HTMLInputElement
        element.value = '';
    }

    const onDeleteClick = () => {
        props.onChange(undefined);
    }

    const renderProfilePicPreview = () => {
        if (props.image) {
            return props.image.image
        } else {
            return <RiImageFill className="w-full h-full object-cover object-center" />
        }
    }

    return (
        <>
            <div className="mt-4 w-48 h-48 border border-[#4e2217] m-auto">
                {renderProfilePicPreview()}
            </div>
            <div className="flex flex-col justify-center my-2 w-fit mx-auto">
                {props.image && <Button text="Remove" className="my-1" onClick={onDeleteClick} />}
                <label className="my-1 hover:underline hover:cursor-pointer font-bold rounded-xl py-3 px-5 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out ">
                    Select Profile Picture
                    <input type="file" accept="image/*" onChange={onFileSelected} onClick={onInputClick} className="hidden" />
                </label>
            </div>
        </>
    )
}