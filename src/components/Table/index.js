import Header from "@/sections/Headings";

const Table = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const { bodytext, tableClass } = data;
	
	// Validate bodytext exists and is an array
	if (!bodytext || !Array.isArray(bodytext) || bodytext.length === 0) {
		return null;
	}
	
	// Validate first row exists for headers
	if (!bodytext[0] || !Array.isArray(bodytext[0]) || bodytext[0].length === 0) {
		return null;
	}
	
	return (
		<Header data={data} layoutType={layoutType} elementType={elementType} spaceBefore={spaceBefore} spaceAfter={spaceAfter}>
			<div className="table-responsive">
				<table className={`table ${tableClass ? tableClass !== "borderless" ? `table-bordered table-${tableClass}` : `table-${tableClass}` : ""}`}>
					<thead>
						<tr>
							{bodytext[0].map((heading, index) => {
								if (heading === undefined || heading === null) return null;
								return (
									<th key={heading + index}>{heading}</th>
								)
							}).filter(Boolean)}
						</tr>
					</thead>
					<tbody>
						{bodytext.slice(1).map((item, index) => {
							if (!item || !Array.isArray(item) || item.length === 0) return null;
							return (
								<tr key={index}>
									{item.map((data, index) => {
										if (data === undefined || data === null) return null;
										return (
											<td key={index}>{data}</td>
										)
									}).filter(Boolean)}
								</tr>
							)
						}).filter(Boolean)}
					</tbody>
				</table>

			</div>
		</Header>
	)
};
export default Table;