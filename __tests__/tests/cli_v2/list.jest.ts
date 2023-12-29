// import fs from 'fs';
import yargs from 'yargs/yargs';
import Templates from '@tps/templates';
import list from '@tps/cli/commands/list';
import { mkTemplate, init, globalInit } from '@test/utilities/templates';
import { reset, vol } from '@test/utilities/vol';
import { mockConsoleLog } from '@test/utilities/mocks';
import { CWD } from '@tps/utilities/constants';
import path from 'path';

jest.mock('fs');

// const vol = createFs();

describe('Command Line: list', () => {
	let log;

	beforeEach(() => {
		log = mockConsoleLog();
		reset();

		// TODO: remove when we remove legacy tpsrc test
		vol.rmSync(path.join(CWD, '.tps/.tpsrc'));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be able to list out all templates', async () => {
		jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

		await init();

		const parser = yargs().command(list);

		await parser.parseAsync('list');

		expect(log.get()).toContain('testing');
	});

	it('should be able to list out global templates', async () => {
		jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);

		globalInit();

		mkTemplate('testing-global', undefined, true);

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('testing-global');
	});

	it('should be able to list out default templates', async () => {
		/**
		 * Currently its impossible to test default packages because its
		 * the same folder as your local packages. This happens because these
		 * test are ran in the templates main folder
		 *
		 * To test default packages we turn off local packages so even tho its
		 * the same folder as local we wont local packages
		 */
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		await init();

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('react-component');

		expect(log.get()).not.toContain('init');
	});
});
