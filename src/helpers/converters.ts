export const convertToNum = (value: string) => {
	const number = parseInt(value);

	if (!isNaN(number) && isFinite(number)) {
		return number;
	}

	return value;
};
