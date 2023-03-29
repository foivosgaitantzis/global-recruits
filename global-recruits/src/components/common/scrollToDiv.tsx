const HEADER_Y_OFFSET = 60;

export default function scrollToDiv(divId: string) {
    const element = document.getElementById(divId);
    if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - HEADER_Y_OFFSET;
        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    }
}