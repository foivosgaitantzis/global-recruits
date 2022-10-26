import FAQs from "../components/HomePage/FAQs";
import Features from "../components/HomePage/Features";
import FilipposGkogkos from "../components/HomePage/FilipposGkogkos";
import Footer from "../components/HomePage/Footer";
import Header from "../components/HomePage/Header";
import Hero from "../components/HomePage/Hero";
import Products from "../components/HomePage/Products";

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