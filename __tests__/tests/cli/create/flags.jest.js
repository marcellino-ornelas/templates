/* eslint-disable jest/expect-expect */
/*
 * Modules
 */
import Playground from '@test/utilities/playground_legacy';
import { TESTING_DIR } from '@test/utilities/constants';
import {
	createTemplate,
	mockTemplateFileExistsError,
	checkFilesForTemplate,
	checkFilesContentForTemplate,
} from '@test/support/cli';
/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

/**
 * @docs api/cli/commands/create.md#flags
 */
describe('[cli] Create:', () => {
	beforeAll(async () => playground.create());
	afterAll(() => playground.destroy());

	beforeEach(async () => playground.createBox('cli_create_flags'));

	/**
	 * @docs api/cli/commands/create.md#force-a-template-to-be-created
	 */
	it('should be able to use --force flag', async () => {
		mockTemplateFileExistsError(playground.box(), 'app', './index.js');

		await expect(
			createTemplate(playground.box(), 'testing', 'app', null, { fail: true }),
		).rejects.toContain('FileExistError');

		await createTemplate(playground.box(), 'testing', 'app', {
			force: true,
		});
		// we should check the file contents here
		checkFilesContentForTemplate(
			playground.box(),
			'app',
			'./index.js',
			"console.log('hey');",
		);
	});

	/**
	 * @docs
	 *  api/cli/commands/create.md#add-additional-packages
	 *  guide/getting-started/packages.md#including-more-packages
	 *
	 */
	it('should be able to use -p flag to all additional packages', async () => {
		await createTemplate(playground.box(), 'testing', 'app', {
			packages: ['extras', 'extras2'],
		});
		checkFilesForTemplate(playground.box(), 'app', [
			'./extras2.js',
			'./extras.js',
		]);
	});

	/**
	 * @docs api/cli/commands/create.md#default
	 */
	it('should be able to use -d flag to use all default prompt answers', async () => {
		await createTemplate(
			playground.box(),
			'testing-prompt-types-select',
			'app',
			{
				d: true,
			},
		);
		checkFilesForTemplate(playground.box(), 'app', ['./index.css']);
	});

	/**
	 * @docs api/cli/commands/create.md#wipe-a-template
	 */
	describe('wipe', () => {
		it('should be able to override a file', async () => {
			mockTemplateFileExistsError(playground.box(), 'app', './index.js');

			await createTemplate(playground.box(), 'testing', 'app', {
				wipe: true,
			});
			// we should check the file contents here
			checkFilesContentForTemplate(
				playground.box(),
				'app',
				'./index.js',
				"console.log('hey');",
			);
		});
	});

	/**
	 * @docs api/cli/commands/create.md#create-a-template-without-a-new-folder
	 */
	describe('should be able to use --no-newFolder flag', () => {
		const flags = {
			newFolder: false,
		};

		it('with one buildPath', async () =>
			createTemplate(
				playground.box(),
				'testing-opt-new-flag',
				'app',
				flags,
			).then(() => {
				checkFilesForTemplate(playground.box(), 'app', null, flags);
			}));

		it('with multiple buildPaths', async () =>
			createTemplate(
				playground.box(),
				'testing-opt-new-flag',
				['app', 'nav'],
				flags,
			).then(() => {
				checkFilesForTemplate(playground.box(), ['app', 'nav'], null, flags);
			}));

		it.todo('should error out if no build Path is specified');
	});

	it.todo('should be able to use --name flag?');
});
