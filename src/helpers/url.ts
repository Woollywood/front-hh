export const parseParams = <T extends Record<string, unknown>>(params: T): string => {
	return Object.entries(params)
		.reduce((acc, [key, value]) => [...acc, `${key}=${value}`], [] as string[])
		.join('&');
};
