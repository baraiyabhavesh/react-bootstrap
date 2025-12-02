const Div = ({data,spaceAfter, spaceBefore, layoutType, elementType}) => {
	return(
		<div className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${spaceBefore && `frame-space-before-${spaceBefore}`} ${spaceAfter && `frame-space-after-${spaceAfter}`}`}>
			{data.header && <h2>{data.header}</h2>}
			<hr className={`ce-${elementType}`}/>
		</div>
	)
};
export default Div;