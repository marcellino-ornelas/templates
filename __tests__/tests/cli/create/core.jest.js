/* eslint-disable jest/expect-expect */
import Playground from '@test/utilities/playground_legacy';
import { TESTING_DIR } from '@test/utilities/constants';
import { createTemplate } from '@test/support/cli';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

/**
 * @docs api/cli/commands/create.md
 */
describe('[cli] Create:', () => {
	beforeAll(() => playground.create());

	afterAll(() => playground.destroy());

	beforeEach(async () => playground.createBox('create_core'));

	/**
	 * @docs api/cli/commands/create.md#create-a-single-template
	 */
	it('should be able to render a template', async () =>
		createTemplate(playground.box(), 'testing', ['app']));

	/**
	 * @docs api/cli/commands/create.md#create-a-single-template-with-a-path
	 */
	it('should be able to render a templates in a destination', async () =>
		createTemplate(playground.box(), 'testing', 'app/src/components'));

	/**
	 * @docs api/cli/commands/create.md#create-multiple-templates
	 */
	it('should be able to render multiple templates', async () =>
		createTemplate(playground.box(), 'testing', [
			'app',
			'bee',
			'webapp/src/components',
		]));

	/**
	 * @docs api/cli/commands/create.md#create-a-template-in-your-cwd
	 */
	it('should be able to render a template in cwd if no file paths are entered', async () =>
		createTemplate(playground.box(), 'testing'));
});
