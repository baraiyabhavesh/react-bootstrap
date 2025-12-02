'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

const NewsThreeColumn = dynamic(() => import("./NewsThreeColumn"),
	{
		ssr: false,
	}
);
const NewsFourColumn = dynamic(() => import("./NewsFourColumn"),
	{
		ssr: false,
	}
);
const NewsFullWidth = dynamic(() => import("./NewsFullWidth"),
	{
		ssr: false,
	}
);
const NewsNoMargin = dynamic(() => import("./NewsNoMargin"),
	{
		ssr: false,
	}
);
const NewsNoMarginFullWidth = dynamic(() => import("./NewsNoMarginFullWidth"),
	{
		ssr: false,
	}
);
const LargeImageLayout = dynamic(() => import("./LargeImageLayout"),
	{
		ssr: false,
	}
);
const NewsMasonryLayout = dynamic(() => import("./NewsMasonryLayout"),
	{
		ssr: false,
	}
);
const MediumImageLayout = dynamic(() => import("./MediumImageLayout"),
	{
		ssr: false,
	}
);

const NewsListSticky = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const list = data.data.list
	const settings = data.data.settings
	const orderBy = data.data.settings.orderBy
	const sort = data.data.settings.orderDirection
	const pagination = data.data.pagination

	const [sortDirection, setSortDirection] = useState(sort);
	const [sortData, setSortData] = useState(list)
	useEffect(() => {
		handleSort()
	}, [list])
	const handleSort = () => {
		const sortedData = [...list];
		sortedData.sort((a, b) => {
			return sortDirection === 'asc' ? a[orderBy] - b[orderBy] : a[orderBy] - b[orderBy];
		});
		setSortData(sortedData);
		setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
	};
	switch (settings.templateLayout) {
		case "1":
			return (
				<Container>
					<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
						<header>
							<h2>{data.header}</h2>
						</header>
						<NewsThreeColumn data={sortData} sort={sort} orderBy={orderBy} settings={settings}/>
					</div>
				</Container>
			);
		case "2":
			return (
				<Container>
					<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
						<header>
							<h2>{data?.header}</h2>
						</header>
						<NewsFourColumn data={list} settings={settings}/>
					</div>
				</Container>
			)
		case "3":
			return (
				<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
					<header>
						<h2>{data?.header}</h2>
					</header>
					<NewsFullWidth data={list} settings={settings}/>
				</div>
			)
		case "4":
			return (
				<Container>
					<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
						<header>
							<h2>{data?.header}</h2>
						</header>
						<NewsNoMargin data={list} settings={settings}/>
					</div>
				</Container>
			)
		case "5":
			return (
				<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
					<header>
						<h2>{data?.header}</h2>
					</header>
					<NewsNoMarginFullWidth data={list} settings={settings}/>
				</div>
			)
		case "6":
			return (
				<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
					<header>
						<h2>{data?.header}</h2>
					</header>
					<LargeImageLayout data={list} pagination={pagination} settings={settings}/>
				</div>
			)
		case "8":
			return (
				<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
					<header>
						<h2>{data?.header}</h2>
					</header>
					<MediumImageLayout data={list} pagination={pagination} settings={settings}/>
				</div>
			)
		case "10":
			return (
				<Container>
					<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
						<header>
							<h2>{data?.header}</h2>
						</header>
						<NewsMasonryLayout data={list} settings={settings}/>
					</div>
				</Container>
			)
		default:
			return null;
	}
};




export default NewsListSticky;
