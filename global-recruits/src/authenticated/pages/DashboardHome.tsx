import LoadingPage from "../../shared/pages/LoadingPage";



export default function DashboardHome() {
	/*useEffect(() => {
		if (BlobStorageUrl) {
			axios.get(BlobStorageUrl + "/courses/BASKETBALL-0/course.xml?" + SASToken).then((response: any) => {
				if (response?.data) {
					const fivos = extractXMLChildren(response.data, 'page', 2);
					const attribute = extractXMLAttribute(response.data, 'section', 'name');
					console.log(attribute);

					const reactTree = convertXMLToReactNodes(fivos!);
					setContent(reactTree);
				}
			});

		}

	}, []);*/

	return (
		<div>
			Welcome to the Dashboard Home
		</div>
	);
}