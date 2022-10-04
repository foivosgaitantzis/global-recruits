import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Features from "../components/Features";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "../components/Products";

export default function HomePage() {
    const [content, setContent] = useState("");
    useEffect(() => {
        /*axios.get(process.env.REACT_APP_API_BASE_URL + '/HelloWorld?name=GlobalRecruits')
            .then((response: AxiosResponse) => setContent(response.data))
            .catch((error: Error) => console.info("Issue Fetching Data: " + error.message));*/
    }, [])
    return (
        <div className="font-custom">
            <Header />
            <Hero />
            <Features />
            <Products />
            <br /> 
            <br />
            <br />
            <br />
        </div>
    );
}