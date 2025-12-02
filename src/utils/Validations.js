export const validateEmail = (name, value) => {
	let error;
	if (!value) {
		error = `${name} is required`;
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		error = "Invalid email address";
	}
	return error;
};

export const validateText = (name, value) => {
	let error;
	if (!value) {
		error = `${name} is required`;
	}
	return error;
};

export const validateNumber = (name, value) => {
	let error;
	if (!value) {
		error = `${name} is required`;
	} else if (isNaN(value)) {
		error = `${name} must be a numeric value`;
	}
	return error;
};