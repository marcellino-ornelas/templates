import yargs from 'yargs/yargs';
import list, { BANNED_TEMPLATES } from '@tps/cli/commands/list';
import {
	globalInit,
	init,
	mk3rdPartyTemplate,
	mkGlobal3rdPartyTemplate,
	mkGlobalTemplate,
	mkTemplate,
	mkTpsrc,
} from '@test/utilities/templates';
import { reset, vol } from '@test/utilities/vol';
import { MockedConsole, mockConsoleLog } from '@test/utilities/mocks';
import path from 'path';
import { CWD, USER_HOME } from '@tps/utilities/constants';
import Templates from '@tps/templates';

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

	beforeEach(async async () => {
		log = mockConsoleLog();
		reset();

		await vol.promises.mkdir(CWD, { recursive: true });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be able to list out local templates', async () => {
		await mkTemplate('test-local-template');

		const parser = yargs().command(list);

		await parser.parseAsync('list');

		expect(log.get()).toContain('test-local-template');
	});

	it('should ignore local templates if option provided', async () => {
		await mkTemplate('test-local-template');

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

		await mkGlobalTemplate('testing-global-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('testing-global-template');
	});

	it('should ignore global templates if option provided', async () => {
		globalInit();

		await mkGlobalTemplate('testing-global-template');

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

	it('should not log default templates if option provided', async () => {
		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-default']);

		expect(log.get()).not.toContain('react-component');
	});

	it('should be able to list out local 3rd party templates', async () => {
		await mk3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('testing-3rd-party-template');
	});

	it('should ignore local 3rd party templates if option provided', async () => {
		await mk3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-node-modules']);

		expect(log.get()).not.toContain('testing-3rd-party-template');
	});

	it('should ignore local 3rd party templates if no 3rd party templates', async () => {
		await vol.promises.mkdir(path.join(CWD, 'node_modules'), {
			recursive: true,
		});

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);
	});

	it('should be able to list out global 3rd party templates', async () => {
		await mkGlobal3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list']);

		expect(log.get()).toContain('testing-3rd-party-template');
	});

	it('should ignore global 3rd party templates if option provided', async () => {
		await mkGlobal3rdPartyTemplate('tps-testing-3rd-party-template');

		const parser = yargs().command(list);

		// ignore default folder, no need to do extra work
		await parser.parseAsync(['list', '--no-node-modules']);

		expect(log.get()).not.toContain('testing-3rd-party-template');
	});

	it('should ignore global 3rd party templates if no  3rd party templates', async () => {
		await vol.promises.mkdir('/usr/lib/node_modules', { recursive: true });

		const parser = yargs().command(list);

		await parser.parseAsync(['list']);
	});

	it.each([
		...Templates.tpsrcConfigNames.map((name) => {
			return {
				name,
				location: CWD,
			};
		}),
		...Templates.tpsrcConfigNames.map((name) => {
			return {
				name,
				location: USER_HOME,
			};
		}),
	])(
		'should not display any config file: $location/$name',
		async ({ name, location }) => {
			await mkTemplate('local-template');
			await mkGlobalTemplate('global-template');
			await mk3rdPartyTemplate('tps-local-3rd-party-template');
			await mkGlobal3rdPartyTemplate('tps-global-local-template');

			mkTpsrc(path.join(location, name));

			const parser = yargs().command(list);

			await parser.parseAsync(['list']);

			/**
			 * Check all possible names because list will
			 * only print out the file name and not
			 * `.tps/.tpsrc`
			 */
			Templates.tpsrcConfigNames.forEach((configName) => {
				expect(log.get()).not.toContain(configName);
			});
		},
	);
});
