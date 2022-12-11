import Button from "../../components/common/Button";

export default function Profile(props: any) {
    return (
        <>
            Hello, {props.user?.attributes?.name} 

            <br />
            <Button text="Sign Out" onClick={props.signOut} />
        </>
    )
}