'use client'
import Header from "@/sections/Headings";
import SafeLink from "@/components/Core/SafeLink";
import Image from "next/image";
import PDF from "@/assets/images/icons/pdf.webp";
import JPG from "@/assets/images/icons/jpg.webp";
import MP3 from "@/assets/images/icons/mp3.webp";
import MP4 from "@/assets/images/icons/mp4.png";
import Responsive from "@/assets/images/icons/responsive.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Uploads = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
	const { media, displayFileSizeInformation, displayDescription, displayInformation } = data || {};
	
	// Ensure media is an array
	const mediaArray = Array.isArray(media) ? media : [];
	
	// Helper to extract filename from URL or properties
	const getFilename = (item) => {
		if (item?.properties?.filename) return item.properties.filename;
		if (item?.filename) return item.filename;
		if (item?.publicUrl) {
			const urlParts = item.publicUrl.split('/');
			const filename = urlParts[urlParts.length - 1];
			if (filename && filename.includes('.')) return filename;
		}
		return '';
	};
	
	// Helper to get extension icon
	const getExtensionIcon = (extension) => {
		if (extension === "pdf") return PDF.src;
		if (extension === "jpg" || extension === "jpeg") return JPG.src;
		if (extension === "mp3") return MP3.src;
		if (extension === "mp4") return "";
		if (extension === "svg") return "";
		return "";
	};
	
	return (
		<Header data={data} layoutType={layoutType} elementType={elementType} spaceBefore={spaceBefore} spaceAfter={spaceAfter}>
			<ul className={`ce-${elementType}`}>
				{mediaArray.map((item, index) => {
					const publicUrl = item?.publicUrl || item?.path || item?.url || "";
					const properties = item?.properties || item || {};
					const extension = properties.extension || properties.mimeType?.split('/')[1] || publicUrl.split('.').pop()?.toLowerCase() || "";
					const filename = getFilename(item);
					
					return (
						<li key={index}>
							{displayInformation === "2" && publicUrl && (
								<SafeLink href={publicUrl} target="_blank">
									{extension === "svg" && <LazyLoadImage alt={properties.alternative || filename} src={publicUrl} width={64} height={64}/>}
									{extension === "mp4" && <video width={150} controls><source src={publicUrl} type="video/mp4"/></video>}
									{extension === "mp3" && <audio controls><source src={publicUrl} type="audio/mpeg" /></audio>}
									{(extension === "jpg" || extension === "jpeg") && <LazyLoadImage alt={properties.alternative || filename} src={publicUrl} width={150} height={120}/>}
									{extension === "pdf" && <LazyLoadImage alt={properties.alternative || filename} src={publicUrl} width={150} height={85}/>}
								</SafeLink>
							)}
							{displayInformation === "1" && (() => {
								const iconSrc = getExtensionIcon(extension);
								// Use transparent 1x1 pixel for empty src to avoid broken image icon
								const src = iconSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
								return <img src={src} alt={extension} style={!iconSrc ? { display: 'none' } : {}} />;
							})()}
							<div>
								<SafeLink href={publicUrl} target="_blank">
									<span className="ce-uploads-fileName">{filename}</span>
								</SafeLink>
								{displayDescription === "1" && properties.description && <span className="ce-uploads-description">{properties.description}</span>}
								{displayFileSizeInformation === "1" && properties.size && <span className="ce-uploads-filesize">{properties.size}</span>}
							</div>
						</li>
					)
				})}
			</ul>
		</Header>
	)
};
export default Uploads;