import Header from "./Headings";
import ListGroup from "./ListGroup";

const Sitemap = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const { menu } = data;
	return (
		<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
			<Header
				data={data}
				layoutType={layoutType}
				elementType={elementType}
				spaceAfter={spaceAfter}
				spaceBefore={spaceBefore}
			>
				<ListGroup menu={menu} />
			</Header>
		</div>
	)
};
export default Sitemap;