/* eslint-disable @typescript-eslint/no-explicit-any */
import * as is from 'is';
import path from 'path';
import { CWD } from './constants';
import { findUp } from './fileSystem';

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

// /**
//  * Capitalize the first character in the string
//  * @param   {string} name - name to capitalize
//  * @returns {string} - name with a capital first letter
//  */
// utils.capitalize = function capitalize(name) {
//   if (!name) {
//     throw new Error('Capitalize only accepts a non-empty string as a argument');
//   }

//   let firstCharCapitalized = name[0].toUpperCase();

//   // check to see if its already a capital letter
//   return firstCharCapitalized === name[0]
//     ? name
//     : firstCharCapitalized + name.slice(1);
// };

// /**
//  * Convert a filename into a valid filename. Replaces all bad characters with `-`
//  * @param   {string} fileName - Name of file
//  * @returns {string} - valid file name
//  */
// utils.normalizeFileName = function normalizeReactComponentName(fileName) {
//   return !validFilename(fileName)
//     ? filenamify(fileName, { replacement: '-' })
//     : fileName;
// };

/**
 * Get path to npm package.
 *
 * require.resole is a path to the package.json "main" property. This functions
 * get the path to the actual module directory
 */
export const getNpmPackagePath = (name): string | null => {
	return findUp(`node_modules/${name}`, CWD) ?? null;
};

export const isNpmPackage = (name): boolean => {
	return !!getNpmPackagePath(name);
};
