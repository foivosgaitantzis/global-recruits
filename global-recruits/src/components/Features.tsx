import FeatureCard from "./common/FeatureCard";

export default function Features() {
    return (
        <section id="features" className="mt-16 container mx-auto px-12 md:px-4">
            <div className="text-2xl text-center font-bold">"Global Recruits is a worldwide community of student-athletes learning from current and former college athletes who are experts in the recruiting process."</div>
            <div className="grid md:grid-cols-3 md:gap-x-16 lg:gap-x-36">
                <FeatureCard header="Perfect your Recruiting Profile." icon="book">Get access to self-paced learning material that will make you stand out to college coaches. Learn how to connect effectively with coaches, create highlight videos, raise your SAT scores & more.</FeatureCard>
                <FeatureCard header="Join an exlucive Discord Community." icon="group">Direct Contact to Division 1 athletes who are equipped to answer all your questions! Network with ambitious athletes chasing their athletic Collegiate Dreams.</FeatureCard>
                <FeatureCard header="Receive a Personalized Experience Tailored to You." icon="trophy">Receive 1-on-1 mentoring from Division 1 Athletes, personalized skill & weight lifting workouts, live Q&A sessions with college coaches & professional athletes & many more.</FeatureCard>
            </div>
        </section>
    );
}