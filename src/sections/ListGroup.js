import SafeLink from "@/components/Core/SafeLink";

const ListGroup = ({ menu }) => {
    return (
        <ul>
            {menu && menu.length && menu.map(({ title, link, children }, index) => {
                return (
                    <li key={title + index}>
                        <SafeLink href={typeof link === "string" ? link : (link || "#")} title={title}>
                            <span>
                                {title}
                            </span>
                        </SafeLink>
                        {children && children.length && (
                            <ul>
                                {children.map(({ title, children, link }, index) => (
                                    <li key={title + index}>
                                        <SafeLink href={typeof link === "string" ? link : (link || "#")} title={title}>
                                            <span>
                                                {title}
                                            </span>
                                        </SafeLink>
                                        <ul>
											{children && children.length && children.map(({ title, link, children }, index) => (
												<li key={title + index}>
													<SafeLink href={typeof link === "string" ? link : (link || "#")} title={title}>
														<span>{title}</span>
													</SafeLink>
												</li>
											))}
										</ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )
            })}
        </ul>
    )
};
export default ListGroup;