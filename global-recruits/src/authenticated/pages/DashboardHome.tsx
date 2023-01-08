import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import XMLToReact from "xml-to-react";
import RoleBadge from "../../shared/components/RoleBadge";
import SectionTitle from "../../shared/components/SectionTitle";

const xml = "<page><Home><Title>Test API XML Loading</Title><Badge name='Test Worked!' /><Title>Test API XML Loading</Title><Title>Test API XML Loading</Title></Home></page>"

const xmlToReact = new XMLToReact({
    Home: (props: any) => ({ type: 'div', props }),
    Title: (props: any) => ({ type: SectionTitle, props }),
    Badge: (props: any) => ({ type: RoleBadge, props })
});



export default function DashboardHome() {
    const [state, setState] = useState<any>(undefined);

    useEffect(() => {
        var DOMParser = new (require('xmldom')).DOMParser;
        var document = DOMParser.parseFromString(xml);

        var nodesByName = document.getElementsByTagName('Home');

        var Serializer = new (require('xmldom')).XMLSerializer;

        const fivos = Serializer.serializeToString(nodesByName[0])



        console.log(fivos)
        const reactTree = xmlToReact.convert(fivos);

        setState(reactTree);
      
    }, []);

    return (
        <>
            <br />
            <div id="app-container">
                {state}
            </div>
            Welcome to the Dashboard Home Page!
            <br />
            Welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
            <br />
            welcome welcome welcome welcome welcome
        </>
    );
}