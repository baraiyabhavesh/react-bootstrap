export default async function getBase64(imageUrl) {
	try {
		const data = await fetch(imageUrl);
		const blob = await data.blob();

		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				const base64data = reader.result;
				resolve(base64data);
			}

		});
	} catch (e) {
		return null;
	}
}