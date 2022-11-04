export default function VideoPage() {
    return (
        <>
            <video id="videoPlayer" width="50%" controls muted autoPlay>
                <source src="https://globalrecruitsrga090.blob.core.windows.net/global-recruits-content/sampleVideo.mp4?sp=r&st=2022-11-03T14:55:12Z&se=2022-11-03T16:00:12Z&spr=https&sv=2021-06-08&sr=b&sig=8%2FIQ5ajwIgawxxNU%2FaULoO%2B45r8j6eKWvU7Hyp7mjG0%3D" type="video/mp4" />
            </video>
        </>
    );
}