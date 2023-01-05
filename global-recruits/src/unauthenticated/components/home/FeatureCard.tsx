import { GiOpenBook, GiTrophy } from 'react-icons/gi';
import { MdGroups } from 'react-icons/md';

export default function FeatureCard(props: { icon: "book" | "group" | "trophy", header: string, children: string, }) {
    return (
        <div className="block mx-auto">
            <div className="w-10 mx-auto mb-4">
                {props.icon === "book"
                    ? <GiOpenBook size="40" />
                    : props.icon === "group"
                        ? <MdGroups size="40" />
                        : props.icon === "trophy"
                            ? <GiTrophy size="40" />
                            : null
                }
            </div>
            <div className="text-md 2xl:text-lg text-left">
                <span className="font-bold">{props.header}</span>
                <br />
                {props.children}
            </div>
        </div>
    );
}