import Playground from '@test/utilities/playground_legacy';
import { TESTING_DIR } from '@test/utilities/constants';
import { createTemplate, checkFilesForTemplate } from '@test/support/cli';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
	beforeAll(async () => playground.create());

	afterAll(() => playground.destroy());

	beforeEach(async () => playground.createBox('create_prompt'));

	// eslint-disable-next-line jest/expect-expect
	it.each([['less'], ['css']])(
		'should be able answer prompts from command line arguments',
		(cssType) =>
			createTemplate(playground.box(), 'testing-prompt-types-select', 'App', {
				css: cssType,
			}).then(() => {
				checkFilesForTemplate(playground.box(), 'App', [`index.${cssType}`]);
			}),
	);
});
