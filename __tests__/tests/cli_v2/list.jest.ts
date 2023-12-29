import yargs from 'yargs/yargs';
import Templates from '@tps/templates';
import list, { BANNED_TEMPLATES } from '@tps/cli/commands/list';
import { mkTemplate, globalInit } from '@test/utilities/templates';
import { reset, vol } from '@test/utilities/vol';
import { mockConsoleLog } from '@test/utilities/mocks';
import { CWD } from '@tps/utilities/constants';
import path from 'path';

jest.mock('fs');

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

	it('should be able to list out all local templates', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		const parser = yargs().command(list);

		await parser.parseAsync('list');

		expect(log.get()).toContain('testing');
	});

	it('should ignore local templates if option provided', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		const parser = yargs().command(list);

		await parser.parseAsync(['list', '--no-local']);

		expect(log.get()).not.toContain('testing');
	});

	it('should ignore local templates if option provided', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(false);

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);

		expect(log.get()).not.toContain('testing');
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

	it('should ignore global templates if option provided', async () => {
		jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);

		globalInit();

		mkTemplate('testing-global', undefined, true);

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-global']);

		expect(log.get()).not.toContain('testing-global');
	});

	it('should ignore global templates if no global templates', async () => {
		// TODO: should be able to remove once this reads from filesystem
		jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

		globalInit();

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).not.toContain('testing-global');
	});

	it('should be able to list out default templates', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('react-component');
	});

	it('should not contain banned default templates', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		const logs = log.get();

		BANNED_TEMPLATES.forEach((template) => {
			expect(logs).not.toContain(template);
		});

		// // should ignore specific template directories
	});

	it('should ignore default templates if option provided', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-default']);

		expect(log.get()).not.toContain('react-component');
	});
});
