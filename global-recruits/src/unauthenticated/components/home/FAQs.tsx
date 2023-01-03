import { useState } from "react";
import AccordionItem from "../../../shared/components/AccordionItem";
import SectionTitle from "../../../shared/components/SectionTitle";

export default function FAQs() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section id="faqs" className="mt-24 container mx-auto px-12 md:px-4">
            <SectionTitle>FAQs</SectionTitle>
            <div className='flex flex-col justify-center items-center'>
                <AccordionItem title="How do I get access to the tutorials?" index={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                    When you buy the basic package, you will get an invite to join a Discord server. You will be asked to pick the sport you play, and your graduating class. Once you do that, you will get access to the tutorials and chats, which will appear on the left hand side of your screen.
                </AccordionItem>
                <AccordionItem title="What is Discord?" index={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                    Discord is a media platform that is designed to allow users to communicate easily and effectively within communities called “servers”. Join our Discord community in 2 easy steps by clicking on the Basic Package above.
                </AccordionItem>
                <AccordionItem title="I don’t have the money to buy this right now but I’m still interested in this. What can I do?" index={3} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                    Subscribe to our mailing list to receive unique information regarding upcoming updates on our platform. I will also be releasing sneak peeks into my personal workouts so that you can improve your own game. We look forward to seeing you in the community!
                </AccordionItem>
                <AccordionItem title="What ages is Global Recruits recommended for?" index={4} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                    We help athletes of all ages who want to play sports in college. If you are not sure if this is for you, contact us on any platform you desire and we will answer your questions.
                </AccordionItem>
                <AccordionItem title="Can people from outside America use this platform?" index={5} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                    I went to high school in Romania, and I teach exactly what I did to play basketball at a Division 1 school in America, with examples of my personal emails and highlight videos. This is for athletes from all over the world.
                </AccordionItem>
            </div>
        </section>
    )
}