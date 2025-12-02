'use client'
/* eslint-disable react/no-children-prop */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import renderComponent from "@/utils/RenderComponents";

const FourColumns = ({ data, spaceAfter, spaceBefore, layoutType, elementType, id }) => {
	// Validate items exist and is an array
	if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
		return null;
	}

	return (
		<Row className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`} id={id}>
			{data.items
				.filter(item => item && item.config) // Filter out null/undefined items or items without config
				.sort((a, b) => a.config.colPos - b.config.colPos)
				.map((item, index) => {
				return (
					<Col md={3} sm={6} key={index}>
						{renderComponent(item)}
					</Col>
				)
			})}

		</Row>
	);
};

export default FourColumns;
