import React from "react";
import { findValuesObject } from "./ContentType";
import { componentMapping } from "./ContentType"


const renderComponent = ({ contentElements }) => {
	if (!contentElements) {
		return false;
	}

	return (
		<>
			{contentElements.map((data, index) => {
				let contentType = data.type;
				let contentData = findValuesObject(data.content, "pi_flexform_content");
				const marBottom = data.appearance.spaceAfter;
				const marTop = data.appearance.spaceBefore;
				const layout = data.appearance.layout;
				const frameClass = data.appearance.frameClass;
				const Component = componentMapping[contentType];
				if (Component) {
					return (
						<Component
							key={data.id}
							data={contentData && contentData.length ? contentData[0] : data.content}
							spaceAfter={marBottom}
							spaceBefore={marTop}
							layoutType={layout}
							elementType={contentType}
							frameClass={frameClass}
							posibleGrid={""}
						/>
					)
				}
				return null;
			})}
		</>
	)
};
export default renderComponent;