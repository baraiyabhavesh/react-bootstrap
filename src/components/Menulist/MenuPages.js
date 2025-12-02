import Header from "@/sections/Headings";
import ListGroup from "@/sections/ListGroup";

const MenuPages = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const { menu } = data;

	return (
		<Header
			data={data}
			layoutType={layoutType}
			elementType={elementType}
			spaceAfter={spaceAfter}
			spaceBefore={spaceBefore}
		>
			<ListGroup menu={menu} />
		</Header>
	)
};
export default MenuPages;