import debug from 'debug';
import './formatters';
import CreateDebugGroup from './createDebugGroup';

export const logFunctions: string[] = [
	'info',
	'error',
	'debug',
	'success',
	'warn',
	'log',
];

interface CreateDebugOpts {
	disableLog: boolean;
}

class CreateDebug {
	static DEFAULT_OPTS: CreateDebugOpts = { disableLog: false };

	public name: string;

	public _logger: ReturnType<typeof debug>;

	public opts: CreateDebugOpts;

	public _groups: { [p: string]: CreateDebugGroup };

	public info: debug.Debugger;

	public error: debug.Debugger;

	public debug: debug.Debugger;

	public success: debug.Debugger;

	public warn: debug.Debugger;

	public log: debug.Debugger;

	constructor(name: string, opts: Partial<CreateDebugOpts> = {}) {
		this.name = name;
		this._logger = debug(this.name);
		this.opts = {
			...CreateDebug.DEFAULT_OPTS,
			...opts,
		};
		this._groups = {};

		logFunctions.forEach((type) => {
			const instanceKey = `_${type}`;
			this[instanceKey] = this._logger.extend(type);
			this[instanceKey].color = this._logger.color;
			this[type] = (...args) => {
				this._resync();
				this[instanceKey](...args);
			};
		});

		this._resync();
	}

	_resync(): void {
		const { disableLog } = this.opts;
		logFunctions.forEach((type) => {
			const instanceKey = `_${type}`;
			if (type === 'log') {
				// Log always is enabled
				this[instanceKey].enabled = !disableLog;
			} else {
				this[instanceKey].enabled = this.isEnabled();
			}
		});
	}

	isEnabled(): boolean {
		return this._logger.enabled;
	}

	enable(): this {
		this._logger.enabled = true;
		this._resync();
		return this;
	}

	group(name: string, { clear = false } = {}): CreateDebugGroup {
		if (this._groups[name] && !clear) {
			return this._groups[name];
		}

		const newGroup = new CreateDebugGroup(name);

		this._groups[name] = newGroup;

		return newGroup;
	}

	printGroup(group: CreateDebugGroup | string): void {
		let groupArray: CreateDebugGroup = null;

		if (typeof group === 'string') {
			groupArray = this._groups[group];
		} else {
			groupArray = group;
		}

		for (let i = 0; i < groupArray.queue.length; i++) {
			const [level, ...args] = groupArray.queue[i];

			this[level](...args);
		}

		this._groups[groupArray.name] = undefined;
	}
}

export default CreateDebug;
