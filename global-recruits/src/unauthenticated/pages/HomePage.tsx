import { useState } from "react";
import FAQs from "../components/home/FAQs";
import Features from "../components/home/Features";
import FilipposGkogkos from "../components/home/FilipposGkogkos";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Subscriptions from "../components/home/Subscriptions";

export default function HomePage() {
    return (
        <div className="font-custom">
            <Header />
            <Hero />
            <Features />
            <Subscriptions />
            <FilipposGkogkos />
            <FAQs />
            <Footer />
        </div>
    );
}