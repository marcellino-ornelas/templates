/* eslint-disable no-underscore-dangle */
import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';

jest.mock('inquirer');
jest.mock('fs');

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Prompts Process: when using boolean prompts', () => {
	let ignoreFile;
	beforeAll(() => playground.create());

	afterAll(() => playground.destroy());

	let tps;
	beforeEach(() => {
		// add no default to this test to only test packages
		tps = new Templates('testing-prompt-types-boolean', {
			defaultPackage: false,
		});

		return playground.createBox('render_process_prompts').then(() => {
			ignoreFile = playground.pathTo('App/ignore.js');
		});
	});

	it('should render a template when answering prompt with a default boolean answer', () => {
		tps.opts.default = true;
		tps._prompts.opts.default = true;

		expect(tps._prompts.needsAnswers()).toBeTruthy();

		return tps.render(playground.box(), 'App').then(() => {
			expect(ignoreFile).not.toBeFile();
		});
	});

	it('should render a template when answering prompt with alias', () => {
		tps.setAnswers({ i: true });

		expect(tps._prompts.needsAnswers()).toBeFalsy();

		return tps.render(playground.box(), 'App').then(() => {
			expect(ignoreFile).toBeFile();
		});
	});

	it('should render a template when answering prompt with a boolean (true)', () => {
		tps.setAnswers({ ignore: true });

		expect(tps._prompts.needsAnswers()).toBeFalsy();

		return tps.render(playground.box(), 'App').then(() => {
			expect(ignoreFile).toBeFile();
		});
	});

	it('should render a template when answering prompt with a boolean (false)', () => {
		tps.setAnswers({ ignore: false });

		expect(tps._prompts.needsAnswers()).toBeFalsy();

		return tps.render(playground.box(), 'App').then(() => {
			expect(ignoreFile).not.toBeFile();
		});
	});
});
