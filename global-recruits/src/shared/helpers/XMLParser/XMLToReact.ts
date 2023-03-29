import XMLToReact from "xml-to-react";
import SectionTitle from "../../components/SectionTitle";

const XMLToReactConverter = new XMLToReact({
    page: () => ({ type: 'div' }),
    title: () => ({ type: SectionTitle }),
    list: () => ({ type: 'ul', props: {
        className: "list-disc"
    } }),
    numberlist: () => ({ type: 'ul', props: {
        className: 'list-decimal'
    }}),
    item: () => ({ type: 'li' }),
    bold: () => ({ type: 'span', props: {
        className: "font-bold"
    }}),
    italic: () => ({ type: 'span', props: {
        className: "italic"
    }}),
    underline: () => ({ type: 'span', props: {
        className: "underline"
    }}),
    divider: () => ({ type: 'hr', props: { 
        className: "w-full border-black"
    }}),
    br: () => ({ type: 'br' })
})

/**
 * Utility Function that Uses Converter to Convert XML Into React Nodes
 * @param xml The XML to Convert as a Long String
 * @returns A React Node of Components 
 */
export function convertXMLToReactNodes(xml: string): any {
    return XMLToReactConverter.convert(xml);
}