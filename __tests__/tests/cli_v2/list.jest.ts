import yargs from 'yargs/yargs';
import list, { BANNED_TEMPLATES } from '@tps/cli/commands/list';
import {
	mkTemplate,
	globalInit,
	mkGlobalTemplate,
} from '@test/utilities/templates';
import { reset, vol } from '@test/utilities/vol';
import { MockedConsole, mockConsoleLog } from '@test/utilities/mocks';
import { CWD } from '@tps/utilities/constants';
import path from 'path';
import Templates from '@tps/templates';

jest.mock('fs');

describe('Command Line: list', () => {
	let log: MockedConsole;

	beforeEach(() => {
		log = mockConsoleLog();
		reset();

		// TODO: remove when we remove legacy tpsrc test
		vol.rmSync(path.join(CWD, '.tps/.tpsrc'));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be able to list out local templates', async () => {
		const parser = yargs().command(list);

		await parser.parseAsync('list');

		expect(log.get()).toContain('testing');
	});

	it('should ignore local templates if option provided', async () => {
		const parser = yargs().command(list);

		await parser.parseAsync(['list', '--no-local']);

		expect(log.get()).not.toContain('testing');
	});

	it('should ignore local templates if no local templates', async () => {
		const localTemplates = vol.readdirSync(Templates.getLocalTpsPath());

		localTemplates.forEach((template) => {
			vol.rmSync(path.join(Templates.getLocalTpsPath(), template), {
				force: true,
				recursive: true,
			});
		});

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);

		expect(log.get()).not.toContain('Local:');
		expect(log.get()).not.toContain('testing');
	});

	it('should be able to list out global templates', async () => {
		globalInit();

		mkGlobalTemplate('testing-global');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('testing-global');
	});

	it('should ignore global templates if option provided', async () => {
		globalInit();

		mkGlobalTemplate('testing-global');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-global']);

		expect(log.get()).not.toContain('testing-global');
	});

	it('should ignore global templates if no global templates', async () => {
		const parser = yargs().command(list);

		await parser.parseAsync(['list']);

		expect(log.get()).not.toContain('Global:');
	});

	it('should be able to list out default templates', async () => {
		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('react-component');
	});

	it('should not contain banned default templates', async () => {
		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		const logs = log.get();

		BANNED_TEMPLATES.forEach((template) => {
			expect(logs).not.toContain(template);
		});
	});

	it('should ignore default templates if option provided', async () => {
		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-default']);

		expect(log.get()).not.toContain('react-component');
	});
});
