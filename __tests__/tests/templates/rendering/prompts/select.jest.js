import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';

import inquirer from 'inquirer';

jest.mock('inquirer');
jest.mock('fs');

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Prompts Process: when using select prompts', () => {
	beforeAll(async () => playground.create());

	afterAll(() => playground.destroy());

	let tps;
	beforeEach(async () => {
		// add no default to this test to only test packages
		tps = await Templates.get('testing-prompt-types-select', {
			defaultPackage: false,
		});

		return playground.createBox('render_process_prompts');
	});

	it.each([
		['css', 'index.css'],
		['less', 'index.less'],
	])(
		'should render a template with values passed into prompt',
		(answer, expected) => {
			const destPath = playground.pathTo('App');
			// eslint-disable-next-line no-import-assign
			inquirer.prompt = jest.fn().mockResolvedValue({ cssType: answer });

			return tps.render(playground.box(), 'App').then(() => {
				// eslint-disable-next-line no-underscore-dangle
				expect(tps._prompts.answers.cssType).toBe(answer);
				expect(tps.packages).toHaveProperty(answer);
				expect(destPath).toHaveAllFilesAndDirectories([expected]);
			});
		},
	);

	it('should render a template when answering prompt with alias', async () => {
		tps.verbose = true;
		const destPath = playground.pathTo('App');

		tps.setAnswers({ c: 'less' });

		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.needsAnswers()).toBeFalsy();

		return tps.render(playground.box(), 'App').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(['index.less']);
			expect(tps.packages).toHaveProperty('less');
		});
	});
});
