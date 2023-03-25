import { ChangeEvent, useEffect, useState } from "react"
import Button from "../../components/Button";
import { Buffer } from "buffer";
import { RiImageFill } from "react-icons/ri"

interface ProfileImageUploaderProps {
    image?: File,
    onChange: (file: File | undefined) => void
}

async function toBuffer(file: File) {
    const arrayBuffer = await file?.arrayBuffer();
    return Buffer.from(arrayBuffer as any, "base64")
}

export default function ProfileImageUploader(props: ProfileImageUploaderProps) {
    const [profilePic, setProfilePic] = useState<Buffer | undefined>();

    useEffect(() => {
        const file = props.image;
        if (file) {
            toBuffer(file).then((buffer) => setProfilePic(buffer));
        } else {
            setProfilePic(undefined);
        }
    }, [props.image]);

    const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.files?.[0]);
    }

    const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = event.target as HTMLInputElement
        element.value = '';
    }

    const onDeleteClick = () => {
        props.onChange(undefined);
    }

    const renderProfilePicPreview = () => {
        if (profilePic) {
            return <img className="w-full h-full object-cover object-center" src={"data:;base64," + profilePic.toString('base64')} />
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
                {profilePic && <Button text="Remove" className="my-1" onClick={onDeleteClick} />}
                <label className="my-1 hover:underline hover:cursor-pointer font-bold rounded-xl py-3 px-5 shadow focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out ">
                    Select Profile Picture
                    <input type="file" accept="image/*" onChange={onFileSelected} onClick={onInputClick} className="hidden" />
                </label>
            </div>
        </>
    )
}