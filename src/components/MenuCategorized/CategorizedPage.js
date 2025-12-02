import Header from "@/sections/Headings";
import ListGroup from "@/sections/ListGroup";

const CategorizedPage = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const { menu } = data;
	return (
		<>
			<Header
				data={data}
				layoutType={layoutType}
				elementType={elementType}
				spaceAfter={spaceAfter}
				spaceBefore={spaceBefore}
			>
				<ListGroup menu={menu} />
			</Header>
		</>
	)
};
export default CategorizedPage;