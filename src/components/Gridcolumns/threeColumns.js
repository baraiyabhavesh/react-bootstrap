'use client'
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import renderComponent from "@/utils/RenderComponents";

const ThreeColumns = ({ data, spaceAfter, spaceBefore,id }) => {
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
							<React.Fragment key={index}>
								<Col md={4} sm={12} key={index}>
									{renderComponent(item)}
								</Col>
							</React.Fragment>
						)
					})
				}
			</Row>
		</Container>
	);
};

export default ThreeColumns;
