import { useEffect, useState } from "react";
import Page from "../components/common/Page";
import FAQs from "../components/HomePage/FAQs";
import Features from "../components/HomePage/Features";
import FilipposGkogkos from "../components/HomePage/FilipposGkogkos";
import Footer from "../components/HomePage/Footer";
import Header from "../components/HomePage/Header";
import Hero from "../components/HomePage/Hero";
import Subscriptions from "../components/HomePage/Subscriptions";

export default function HomePage() {
    return (
        <Page>
            <div className="font-custom">
                <Header />
                <Hero />
                <Features />
                <Subscriptions />
                <FilipposGkogkos />
                <FAQs />
                <Footer />
            </div>
        </Page>
    );
}