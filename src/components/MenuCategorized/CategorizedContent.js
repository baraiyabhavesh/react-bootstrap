import Header from "@/sections/Headings"
import SafeLink from "@/components/Core/SafeLink";

const CategorizedContent = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
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
				<ul>
					{menu.map(({ header, header_link }, index) => {
						return (
							<li key={index}>
								<SafeLink href={typeof header_link === "string" ? header_link : (header_link || "#")} title={header}>
									<span>{header}</span>
								</SafeLink>
							</li>
						)
					})}
				</ul>
			</Header>
		</>
	)
};
export default CategorizedContent;