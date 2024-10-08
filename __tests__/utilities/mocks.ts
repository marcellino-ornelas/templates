import { sync } from 'cross-spawn';
import type { ExecFileException, SpawnSyncReturns } from 'child_process';

export interface MockedConsole {
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

interface CrossSpawnReturn<T = Buffer> extends SpawnSyncReturns<T> {
	error?: ExecFileException;
}

const DEFAULT_CROSS_SPAWN: CrossSpawnReturn = {
	pid: 123,
	output: [Buffer.from('hey')],
	signal: null,
	status: 0,
	stdout: Buffer.from('test output'),
	stderr: Buffer.from(''),
};

export const mkCrossSpawn = (
	spawn: Partial<CrossSpawnReturn<string>>,
): CrossSpawnReturn => {
	return {
		...DEFAULT_CROSS_SPAWN,
		...spawn,
		output: (spawn?.output || DEFAULT_CROSS_SPAWN.output).map((s) =>
			Buffer.from(s),
		),
		stdout: Buffer.from(spawn?.stdout || DEFAULT_CROSS_SPAWN.stdout),
		stderr: Buffer.from(spawn?.stderr || DEFAULT_CROSS_SPAWN.stderr),
	};
};

export function mkErrnoException(
	message: string,
	code: string,
	syscall?: string,
	path?: string,
): NodeJS.ErrnoException {
	const error = new Error(message) as NodeJS.ErrnoException;
	error.code = code;
	error.errno = 1; // idk
	if (syscall) {
		error.syscall = syscall;
	}
	if (path) {
		error.path = path;
	}
	return error;
}
