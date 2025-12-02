import SafeLink from "@/components/Core/SafeLink";
import Header from "@/sections/Headings";

const MenuSubPages = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const { menu } = data;
	return (
		<Header
			data={data}
			layoutType={layoutType}
			elementType={elementType}
			spaceAfter={spaceAfter}
			spaceBefore={spaceBefore}
		>
			<ul>
				{menu.map(({ title, link, active, children }, index) => {
					return (
						<li key={title + index} className={active ? "sidemenu-active" : ""}>
							<SafeLink href={typeof link === "string" ? link : (link || "#")} title={title}>
								<span>{title}</span>
							</SafeLink>
							{children && (
								<ul>
									{children.length && children.map(({ title, link, active }, index) => {
										return (
											<li key={title + index} className={active ? "sidemenu-active" : ""}>
												<SafeLink href={typeof link === "string" ? link : (link || "#")} title={title}>
													<span>{title}</span>
												</SafeLink>
											</li>
										)
									})}
								</ul>
							)}
						</li>
					)
				})}
			</ul>
		</Header>

	)
};
export default MenuSubPages;