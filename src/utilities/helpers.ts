/* eslint-disable @typescript-eslint/no-explicit-any */
import * as is from 'is';
import path from 'path';
import paths from 'npm-paths';
import { CWD } from './constants';

export function hasProp(obj: Record<string, any>, prop: string): boolean {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Loop through a object property. Will break out of loop if `cb` returns false
 * @param obj - object to loop through
 * @param cb - Function to call on every property
 */
export function eachObj(
	obj: Record<string, any>,
	cb: (val: any, key: string) => void | boolean,
) {
	const keys = Object.keys(obj);

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (!(is as any).undef(obj[key])) {
			const val = obj[key];
			if (cb(val, key) === false) {
				break;
			}
		}
	}
}

/**
 * Check to see if `obj` matches `matcher`
 * @param matcher
 * @param obj - object to match against `matcher`
 */
export function couldMatchObj(
	matcher: Record<string, any>,
	obj: Record<string, any>,
): boolean {
	let matched = true;

	eachObj(matcher, (val, key) => {
		switch (typeof val) {
			case 'function':
				matched = val(obj[key]);
				break;
			case 'object':
				if (val.not) {
					matched = val.not !== obj[key];
					break;
				}
			// eslint-disable-next-line no-fallthrough
			default:
				matched = val === obj[key];
		}
		// matched = val === obj[key];
		return matched;
	});

	return matched;
}

/**
 * Makes `options` inherit all properties it doesnt have from `default`
 * @param options
 * @param defaultObj - default properties that you want `options` to have
 * @returns - options with all default properties
 */
export function defaults<T extends object>(
	options: Partial<T>,
	defaultObj: T,
): T {
	const newObj: T = { ...options } as T;

	eachObj(defaultObj, (val, key) => {
		if (!hasProp(options, key) || is.undefined(options[key])) {
			newObj[key] = val;
		}
	});

	return newObj;
}

export function cliLog(str: string): void {
	const string = str
		.split(/\n/)
		.map((s) => s.trim())
		.join('\n')
		.trim();
	// eslint-disable-next-line
	console.log(string);
}

/**
 * Get all npm paths
 */
export const getNpmPaths = (cwd: string = CWD): string[] => {
	return paths(cwd);
};

/**
 * Get a list of all parent directories from a directory
 *
 * @example
 * 	getAllDirectoriesAndUp("/User/marcellinoornelas/Desktop/random")
 * 	// returns
 * 	[
 * 		"/User/marcellinoornelas/Desktop/random",
 * 		"/User/marcellinoornelas/Desktop",
 * 		"/User/marcellinoornelas",
 * 		"/User",
 * 		"/",
 * 	]
 */
export const getAllDirectoriesAndUp = (dir): string[] => {
	const parent = path.dirname(dir);

	if (dir === parent) return [dir];

	return [dir, ...getAllDirectoriesAndUp(parent)];
};

/**
 * Unflatten an array
 */
export const flatten = <T>(arr: T[][]): T[] => {
	return arr.reduce((unflattened, subArr) => {
		unflattened.push(...subArr);

		return unflattened;
	}, []);
};

export const unique = <T extends string | number>(array: T[]): T[] => {
	const tracker: Record<string, boolean> = {};
	const uniqueArray: T[] = [];

	array.forEach((item) => {
		const string = item.toString();

		if (tracker[string]) return;

		tracker[string] = true;
		uniqueArray.push(item);
	});

	return uniqueArray;
};
