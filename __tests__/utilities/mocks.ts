interface MockedConsole {
	original: typeof console.log;
	log: jest.SpyInstance;
	get: () => string;
	reset: () => void;
	revert: () => void;
}

export const mockConsoleLog = (): MockedConsole => {
	let logs = '';

	const original = console.log;

	const log = jest.spyOn(console, 'log').mockImplementation((...args) => {
		// eslint-disable-next-line prefer-template
		logs += args.map((a) => a.toString()).join(' ') + '\n';
	});

	return {
		original,
		log,
		get() {
			return logs;
		},
		reset() {
			logs = '';
		},
		revert() {
			log.mockRestore();
		},
	};
};
