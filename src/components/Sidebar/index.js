'use client'
import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import SafeLink from "@/components/Core/SafeLink";

const SideBar = ({ pageData, sidebar }) => {
	const { sidebarMenus, sidebarMenusDetails } = useContext(GlobalContext);

	const renderSidbarMenus = () => {
		return (
			<ul>
				{
					pageData && pageData.map(({ link, title, active, children }, index) => (
						<li key={title + index} className={active ? "sidemenu-active" : ""}>
							<SafeLink href={typeof link === "string" ? link : (link || "#")} title={title}>
								<span>{title}</span>
							</SafeLink>
							{children && (
								<ul>
									{children.map(({ title, link, active }, index) => (
										<li key={title + index} className={active ? "sidemenu-active" : ""}>
											<SafeLink href={typeof link === "string" ? link : (link || "#")} title={title}>
												<span>{title}</span>
											</SafeLink>
										</li>
									))}
								</ul>
							)}
						</li>
					))
				}
			</ul>
		)
	};

	return (
		<>

			{sidebar === "subnavigation_left" ? (
				<>{renderSidbarMenus()}</>


			) : (
				<div className="frame frame-default frame-type-menu_subpages frame-layout-0">
					{renderSidbarMenus()}
				</div>
			)}

		</>
	)
};
export default SideBar;