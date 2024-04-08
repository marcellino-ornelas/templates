import yargs from 'yargs/yargs';
import list, { BANNED_TEMPLATES } from '@tps/cli/commands/list';
import {
	globalInit,
	init,
	mk3rdPartyTemplate,
	mkGlobal3rdPartyTemplate,
	mkGlobalTemplate,
	mkTemplate,
} from '@test/utilities/templates';
import { reset, vol } from '@test/utilities/vol';
import { MockedConsole, mockConsoleLog } from '@test/utilities/mocks';
import path from 'path';
import { CWD } from '@tps/utilities/constants';

jest.mock('fs');

jest.mock('@tps/utilities/constants', () => {
	const original = jest.requireActual('@tps/utilities/constants');
	return {
		...original,
		CWD: jest
			.requireActual('path')
			.join(original.USER_HOME, 'Desktop', 'random'),
	};
});

describe('Command Line: list', () => {
	let log: MockedConsole;

	beforeEach(async () => {
		log = mockConsoleLog();
		reset();

		await vol.promises.mkdir(CWD, { recursive: true });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be able to list out local templates', async () => {
		mkTemplate('test-local-template');

		const parser = yargs().command(list);

		await parser.parseAsync('list');

		expect(log.get()).toContain('test-local-template');
	});

	it('should ignore local templates if option provided', async () => {
		mkTemplate('test-local-template');

		const parser = yargs().command(list);

		await parser.parseAsync(['list', '--no-local']);

		expect(log.get()).not.toContain('test-local-template');
	});

	it('should ignore local templates if no local templates', async () => {
		init();

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);
	});

	it('should be able to list out global templates', async () => {
		globalInit();

		mkGlobalTemplate('testing-global-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('testing-global-template');
	});

	it('should ignore global templates if option provided', async () => {
		globalInit();

		mkGlobalTemplate('testing-global-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-global']);

		expect(log.get()).not.toContain('testing-global-template');
	});

	it('should ignore global templates if no global templates', async () => {
		globalInit();

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);
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

	it('should log default templates if option provided', async () => {
		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-default']);

		expect(log.get()).not.toContain('react-component');
	});

	it('should be able to list out local 3rd party templates', async () => {
		mk3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('tps-testing-3rd-party-template');
	});

	it('should ignore local 3rd party templates if option provided', async () => {
		mk3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-node-modules']);

		expect(log.get()).not.toContain('tps-testing-3rd-party-template');
	});

	it('should ignore local 3rd party templates if no  3rd party templates', async () => {
		await vol.promises.mkdir(path.join(CWD, 'node_modules'), {
			recursive: true,
		});

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);
	});

	it('should be able to list out global 3rd party templates', async () => {
		mkGlobal3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('tps-testing-3rd-party-template');
	});

	it('should ignore global 3rd party templates if option provided', async () => {
		mkGlobal3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-node-modules']);

		expect(log.get()).not.toContain('tps-testing-3rd-party-template');
	});

	it('should ignore global 3rd party templates if no  3rd party templates', async () => {
		await vol.promises.mkdir('/usr/lib/node_modules', { recursive: true });

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);
	});
});
