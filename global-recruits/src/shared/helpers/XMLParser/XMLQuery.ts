const CustomXMLParser = new DOMParser();
const CustomXMLSerializer = new XMLSerializer();

/**
 * Custom Function that Filters XML Children to String
 * @param xml The XML as a Long String
 * @param rootNode The Root Node to Find Children Under ex. "page"
 * @param stopAt Which Number of Root Node to Stop At ex. page[stopAt]
 * @returns The Filtered XML as a Long String
 */
export function extractXMLChildren(xml: string, rootNode: string, stopAt?: number): string | undefined {
    const index = stopAt ? (stopAt - 1) : 0;
    const document = CustomXMLParser.parseFromString(xml, "application/xml");
    const filteredDocument = document.getElementsByTagName(rootNode);

    if (filteredDocument.length > index) {
        return CustomXMLSerializer.serializeToString(filteredDocument[index]);
    }
} 


/**
 * Custom Function that Extracts XML Attributes from Nodes
 * @param xml The XML as a Long String
 * @param rootNode The Root Node to Find Attributes Under ex. "page"
 * @param attribute The Attribute to Extract
 * @param stopAt Which number of Root Node to Stop At ex. page[stopAt]
 * @returns The Attribute Value of the XML Node
 */
export function extractXMLAttribute(xml: string, rootNode: string, attribute: string, stopAt?: number) {
    const index = stopAt ? (stopAt - 1) : 0;
    const document = CustomXMLParser.parseFromString(xml, "application/xml");
    const filteredDocument = document.getElementsByTagName(rootNode);
    
    if (filteredDocument.length > index) {
        const element = filteredDocument[index];
        return element.getAttribute(attribute);
    }
}