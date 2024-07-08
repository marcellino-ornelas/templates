// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class CreateDebugGroup<TData = any> {
	constructor(
		public name: string,
		public queue: [string, ...TData[]][] = [],
	) {
		// Do nothing
	}

	info(...message: TData[]): void {
		this.queue.push(['info', ...message]);
	}

	error(...message: TData[]): void {
		this.queue.push(['error', ...message]);
	}

	debug(...message: TData[]): void {
		this.queue.push(['debug', ...message]);
	}

	success(...message: TData[]): void {
		this.queue.push(['success', ...message]);
	}

	warn(...message: TData[]): void {
		this.queue.push(['warn', ...message]);
	}

	log(...message: TData[]): void {
		this.queue.push(['log', ...message]);
	}
}
