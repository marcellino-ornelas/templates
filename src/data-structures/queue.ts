import { Stack } from './stack';

export class Queue<TData> {
	public inbox: Stack<TData>;

	public outbox: Stack<TData>;

	constructor() {
		this.inbox = new Stack();
		this.outbox = new Stack();
	}

	enqueue(...args: TData[]) {
		args.forEach((item) => {
			this.inbox.push(item);
		});
	}

	dequeue(): TData | null {
		if (this.outbox.size() === 0) {
			while (this.inbox.size() !== 0) {
				// cannot be null because size is not zero
				this.outbox.push(this.inbox.pop() as TData);
			}
		}
		return this.outbox.pop();
	}

	size(): number {
		return this.inbox.size() + this.outbox.size();
	}

	peek(): TData | null {
		return this.outbox.next() || this.inbox.next();
	}

	log(filter): void {
		const cb = filter || ((c) => c);
		const queue = this.inbox
			.stack()
			.reverse()
			.concat(this.outbox.stack())
			.map(cb);
		console.log('queue: ', queue);
	}
}
