'use client'
import React from "react";
import { Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { normalizeContainerData, hasContainerWrappers } from "@/utils/normalizeContainerData";

const Progress = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	// Extract skills from multiple possible locations
	let skills = data?.skills;
	if (!skills && data?.pi_flexform_content?.skills) {
		skills = data.pi_flexform_content.skills;
	}
	
	// Handle container wrappers
	if (skills && hasContainerWrappers(skills)) {
		skills = normalizeContainerData(skills);
	}
	
	// Extract other data properties
	const title = data?.title || data?.heading || data?.pi_flexform_content?.title || data?.pi_flexform_content?.heading || "";
	const height = data?.height || data?.pi_flexform_content?.height;
	const progressbarvalue = data?.progressbarvalue || data?.pi_flexform_content?.progressbarvalue || "0";
	const stripes = data?.stripes || data?.pi_flexform_content?.stripes || "0";
	const animated = data?.animated || data?.pi_flexform_content?.animated || "0";
	
	// Normalize skills - handle container wrappers in individual items
	const normalizedSkills = skills ? Object.values(skills).map(item => {
		if (!item || typeof item !== "object") return null;
		
		// If item has container, extract container data
		if (item.container && typeof item.container === "object") {
			const { container, ...itemWithoutContainer } = item;
			return {
				...itemWithoutContainer,
				...container,
			};
		}
		
		return item;
	}).filter(Boolean) : [];
	
	// Validate we have skills to render
	if (!normalizedSkills || normalizedSkills.length === 0) {
		return null;
	}
	
	return (
		<>
			<div className={`content-section frame  frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
				{normalizedSkills.map((item, index) => {
					// Extract percentage from multiple possible locations
					const percentage = item.percentage || item.value || item.percent || 0;
					const itemTitle = item.title || item.name || item.label || "";
					const itemColor = item.color || item.variant || "primary";
					
					return (
						<div className="progressbar-block" key={index}>
							{itemTitle && (<h4>{itemTitle}</h4>)}
							<ProgressBar
								style={{ height: height ? `${height}px` : "16px" }}
								now={percentage}
								label={
									progressbarvalue === "1" ? `${percentage}%` : ""
								}
								variant={itemColor}
								striped={stripes === "1" ? true : false}
								animated={animated === "1" ? true : false}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Progress;
