/* eslint-disable react/no-children-prop */
'use client'
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import renderComponent from "@/utils/RenderComponents";

const TwoColumns = ({ data, spaceAfter, spaceBefore, layoutType, elementType, id }) => {
	// Validate items exist and is an array
	if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
		return null;
	}

	return (
		<Container>
			<Row className={`frame ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`} id={id}>
				{
					data.items
						.filter(item => item && item.config) // Filter out null/undefined items or items without config
						.sort((a, b) => a.config.colPos - b.config.colPos)
						.map((item, index) => {
						return (
							<Col sm={6} key={index}>
								{renderComponent(item)}
							</Col>
						)
					})
				}
			</Row>
		</Container>
	);
};

export default TwoColumns;
