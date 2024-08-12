import fs from 'fs';
import * as findFileUp from 'find-up';
import path from 'path';
import { CosmiconfigResult, PublicExplorerSync } from 'cosmiconfig';

/**
 * Check to see if the `path` is a valid directory
 */
export function isDir(filePath: string): boolean {
	let dir;
	try {
		dir = fs.lstatSync(filePath);
	} catch (e) {
		return false;
	}
	return dir.isDirectory();
}

/**
 * Check to see if the `path` is a valid directory
 */
export async function isDirAsync(filePath: string): Promise<boolean> {
	try {
		const dir = await fs.promises.lstat(filePath);
		return dir.isDirectory();
	} catch (e) {
		return false;
	}
}

/**
 * Check to see if the `path` is a valid file
 */
export function isFile(filePath: string): boolean {
	let file;
	try {
		file = fs.lstatSync(filePath);
	} catch (e) {
		return false;
	}
	return file.isFile();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function json(jsonFile: string): any {
	try {
		const jsonContents = fs.readFileSync(jsonFile).toString();
		return JSON.parse(jsonContents);
	} catch (err) {
		return {};
	}
}

export function findUp(folder: string, cwd: string = process.cwd()) {
	return findFileUp.sync(folder, {
		cwd,
	});
}

function countDirectories(filePath: string): number {
	return filePath.split(path.sep).length - 1;
}

export function cosmiconfigAllExampleSync(
	searchPath: string,
	explorer: PublicExplorerSync,
	searchPlaces: string[],
): CosmiconfigResult[] {
	const results = [];
	const sortedSearchPlaces = searchPlaces.sort((a, b) => {
		return countDirectories(b) - countDirectories(a);
	});

	function getNext(currentPath): CosmiconfigResult | null {
		const currentResult = explorer.search(currentPath);

		// if no result found, end search
		if (!currentResult) {
			return;
		}

		// add current result to end of array
		results.push(currentResult);

		const dir = sortedSearchPlaces.reduce((acc, next) => {
			return acc.replace(next, '');
		}, currentResult.filepath);

		const nextPath = path.dirname(dir);

		// eslint-disable-next-line consistent-return
		return getNext(nextPath);
	}

	getNext(searchPath);

	return results;
}
