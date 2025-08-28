/*
 * Modules
 */
import { mkTemplate } from '@test/utilities/templates';
import { CWD, MAIN_DIR } from '@tps/utilities/constants';
import { OutputProcessor, runCommand, runFormatter } from '@tps/tools';
import { reset, vol } from '@test/utilities/vol';
import path from 'path';
import { sync } from 'cross-spawn';
import {
	mkCrossSpawn,
	mkErrnoException,
	mockConsoleLog,
} from '@test/utilities/mocks';

jest.mock('cross-spawn');

jest.mock('fs');

const DEFAULT_COMMAND: OutputProcessor = {
	args: () => ['--some-flag'],
	command: 'command',
	name: 'Command1',
};

describe('Tools:', () => {
	beforeEach(() => {
		mockConsoleLog();

		jest.resetAllMocks();
		reset();
	});

	describe('runCommand', () => {
		it('should be able to run a command', async () => {
			const tps = await mkTemplate('run-comand');

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')], tps);

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({}),
			);
		});

		it('should include templates main directory .bin in PATH', async () => {
			const tps = await mkTemplate('run-comand');

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')], tps);

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({
					env: expect.objectContaining({
						PATH: expect.stringContaining(
							path.join(MAIN_DIR, 'node_modules/.bin'),
						),
					}),
				}),
			);
		});

		it('should include dest .bin in PATH', async () => {
			await vol.promises.mkdir(path.join(CWD, 'node_modules'), {
				recursive: true,
			});

			const tps = await mkTemplate('run-comand');

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')], tps);

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({
					env: expect.objectContaining({
						PATH: expect.stringContaining(path.join(CWD, 'node_modules/.bin')),
					}),
				}),
			);
		});

		it('should include node modules from parent directory from CWD in PATH', async () => {
			const tps = await mkTemplate('run-comand');

			await vol.promises.mkdir('/some/random/directory/inner', {
				recursive: true,
			});

			await vol.promises.mkdir('/some/random/directory/node_modules', {
				recursive: true,
			});

			runCommand(
				DEFAULT_COMMAND,
				'/some/random/directory/inner',
				[path.join('/some/random/directory/inner', 'app')],
				tps,
			);

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({
					env: expect.objectContaining({
						PATH: expect.stringContaining(
							path.join('/some/random/directory', 'node_modules/.bin'),
						),
					}),
				}),
			);
		});

		it('should include template directory in PATH', async () => {
			const tps = await mkTemplate('run-comand');

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')], tps);

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({
					env: expect.objectContaining({
						PATH: expect.stringContaining(
							path.join(tps.src, 'node_modules/.bin'),
						),
					}),
				}),
			);
		});

		it('should include all bins from $PATH', async () => {
			const tps = await mkTemplate('run-comand');

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')], tps);

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({
					env: expect.objectContaining({
						PATH: expect.stringContaining(process.env.PATH),
					}),
				}),
			);
		});

		it('Should be able to handle errors', async () => {
			const log = mockConsoleLog();

			jest.mocked(sync).mockReturnValue(
				mkCrossSpawn({
					error: mkErrnoException(
						'Permission denied',
						'EACCES',
						'open',
						'/path/to/file',
					),
				}),
			);

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')]);

			expect(log.get()).toContain('❌ Command1 failed');

			expect(log.get()).toContain('Error: Permission denied');

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({}),
			);
		});

		it('Should give better error message when command is not found', async () => {
			const log = mockConsoleLog();

			jest.mocked(sync).mockReturnValue(
				mkCrossSpawn({
					error: mkErrnoException('Command not found', 'ENOENT'),
				}),
			);

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')]);

			expect(log.get()).toContain('❌ Command not found: command');

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({}),
			);
		});

		it('Should be able to error status code', async () => {
			const log = mockConsoleLog();

			jest.mocked(sync).mockReturnValue(
				mkCrossSpawn({
					status: 1,
					stdout: 'some stdout',
					stderr: 'some stderr',
				}),
			);

			runCommand(DEFAULT_COMMAND, CWD, [path.join(CWD, 'app')]);

			expect(log.get()).toContain('❌ Command1 failed');

			expect(log.get()).toContain('some stdout');
			expect(log.get()).toContain('some stderr');

			expect(sync).toHaveBeenCalledWith(
				'command',
				['--some-flag'],
				expect.objectContaining({}),
			);
		});
	});

	describe('runFormatter', () => {
		it('should handle none', async () => {
			await expect(runFormatter('none', '', [])).resolves.toBeUndefined();

			expect(sync).not.toBeCalled();
		});

		it('should handle when formatter doesnt exist', async () => {
			// @ts-expect-error need to test when known value
			await expect(runFormatter('unknown', '', [])).resolves.toBeUndefined();

			expect(sync).not.toBeCalled();
		});

		it('should run correct formatter', async () => {
			await expect(
				runFormatter('prettier', '/some/path', ['buildPath']),
			).resolves.toBeUndefined();

			expect(sync).toHaveBeenCalledWith(
				'prettier',
				[
					'--ignore-unknown',
					'buildPath',
					'--write',
					'--ignore-path',
					'./.prettierignore',
				],
				expect.objectContaining({}),
			);
		});
	});
});
