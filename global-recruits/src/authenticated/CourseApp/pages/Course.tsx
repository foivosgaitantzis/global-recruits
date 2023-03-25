import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extractXMLChildren } from "../../../shared/helpers/XMLParser/XMLQuery";
import { convertXMLToReactNodes } from "../../../shared/helpers/XMLParser/XMLToReact";
import LoadingPage from "../../../shared/pages/LoadingPage";
import { useStateContext } from "../../../shared/state/AppStateProvider";


// TODO: Will need New Code to Load which Section & Page to go to!
export default function Course() {
    let { courseCode } = useParams();

    const courseContent = useStateContext().courseContent?.[courseCode ?? ""]?.XMLContent;

    const [content, setContent] = useState<any>(undefined);

    useEffect(() => {
        if (courseContent) {
            const Page1 = extractXMLChildren(courseContent, 'page', 1);

            const reactTree = convertXMLToReactNodes(Page1!);
            setContent(reactTree);
        }
    }, []);

    return (
        content
            ? content
            : <LoadingPage />
    );
}