import Image from "next/image";

const LazzyImage = ({ path, alternative, height, width, title, className, effectUrl }) => {
	return (
		<>
			{effectUrl !== "undefined" && effectUrl ? (
				<Image
					src={path}
					blurDataURL={effectUrl}
					placeholder="blur"
					alt={alternative}
					height={height}
					width={width}
					title={title}
					className={className}
				/>
			) : (
				<Image
					src={path}
					alt={alternative}
					height={height}
					width={width}
					title={title}
					className={className}
				/>
			)}
		</>
	)
};
export default LazzyImage;