import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function HomePage() {
    const [content, setContent] = useState("");
    useEffect(() => {
        axios.get('https://api.globalrecruits.net/api/HelloWorld?name=GlobalRecruits')
            .then((response: AxiosResponse) => setContent(response.data))
            .catch((error: Error) => console.info("Issue Fetching Data: " + error.message));
    }, [])
    return (
        <>
            <Header />
            <Hero />
            Hello there!
            <br />
            {content}
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
            Hello there!
            <br />
        </>
    );
}