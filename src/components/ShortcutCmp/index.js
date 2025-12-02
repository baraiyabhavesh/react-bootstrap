import React from "react";
import { findValuesObject } from "@/utils/ContentType";
import { componentMapping } from "@/utils/ContentType";

const ShortcutCmp = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const { shortcut } = data;

	// Validate shortcut exists and is an array
	if (!shortcut || !Array.isArray(shortcut) || shortcut.length === 0) {
		return null;
	}

	return (
		<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-before-${spaceAfter}`}`}>
			{shortcut
				.filter(item => item && item.type && componentMapping[item.type]) // Only render valid items
				.map((data, index) => {
				let contentType = data.type;
				let contentData = findValuesObject(data.content, "pi_flexform_content");
				const marBottom = data.appearance?.spaceAfter;
				const marTop = data.appearance?.spaceBefore;
				const layout = data.appearance?.layout;
				const Component = componentMapping[contentType];
				if (Component) {
					return (
						<Component
							key={data.id || index}
							data={contentData && contentData.length ? contentData[0] : data.content}
							spaceAfter={marBottom}
							spaceBefore={marTop}
							layoutType={layout}
							elementType={contentType}
							posibleGrid={""}
						/>
					)
				}
				return null;
			}).filter(Boolean)}
		</div>
	)
};
export default ShortcutCmp;