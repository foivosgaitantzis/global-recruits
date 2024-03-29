import SectionTitle from "../../../shared/components/SectionTitle";
import Subscription from "./Subscription";

export default function Subscriptions() {
    return (
        <section id="products" className="bg-[#D9D9D9] bg-opacity-40">
            <div className="mt-12 lg:mt-24 py-10 container mx-auto px-12 md:px-4">
                <SectionTitle>Subscriptions</SectionTitle>
                <div className="flex flex-col sm:flex-row justify-center">
                    <Subscription type="basic" price="19.99">
                        <li>How to Write a Perfect Email</li>
                        <li>Create A College-Level Highlight Video</li>
                        <li>Academic Requirements and Guides</li>
                        <li>Growing Social Media Presence For Exposure</li>
                        <li>24/7 Live Chats Discussing All-Things Basketball</li>
                        <li>Ask Division 1 Players Anything!</li>
                    </Subscription>
                    <Subscription type="global" price="49.99">
                        <li className="font-bold">Free Access to The Basic Package</li>
                        <li>Live Q&As With College and Pro Athletes</li>
                        <li>Live Q&As With College Coaches</li>
                        <li>Personalized Basketball And Weight-Lifting Workouts</li>
                        <li>1-on-1 Mentoring From D1 Athletes</li>
                        <li>Weekly SAT/ACT Lessons To Improve Academics</li>
                    </Subscription>
                </div>
            </div>
        </section>
    );
}