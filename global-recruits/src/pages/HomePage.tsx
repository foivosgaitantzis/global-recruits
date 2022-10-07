import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import FAQs from "../components/FAQs";
import Features from "../components/Features";
import FilipposGkogkos from "../components/FilipposGkogkos";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "../components/Products";

export default function HomePage() {
    return (
        <div className="font-custom">
            <Header />
            <Hero />
            <Features />
            <Products />
            <FilipposGkogkos />
            <FAQs />
            <Footer />
        </div>
    );
}