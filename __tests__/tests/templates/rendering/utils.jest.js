/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';
import { reset } from '@test/utilities/vol';

jest.mock('fs');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Utils:', () => {
	let tps;
	beforeEach(() => {
		reset();

		tps = new Templates('testing-utils');

		return playground.createBox('render_utils');
	});

	it('should be able to use change-case fn', async () => {
		const indexFile = playground.pathTo('App/index.txt');
		const appFolder = playground.pathTo('App');

		tps.setAnswers({
			message: 'change case',
			fn: 'camelCase',
		});

		return tps.render(playground.box(), 'App').then(() => {
			expect(appFolder).toBeDirectory();
			expect(indexFile).toBeFile();
			expect(indexFile).toHaveFileContents('changeCase');
		});
	});

	it('should be able to use inflection fn', async () => {
		const indexFile = playground.pathTo('App/index.txt');
		const appFolder = playground.pathTo('App');

		tps.setAnswers({
			message: 'inflection',
			fn: 'pluralize',
		});

		return tps.render(playground.box(), 'App').then(() => {
			expect(appFolder).toBeDirectory();
			expect(indexFile).toBeFile();
			expect(indexFile).toHaveFileContents('inflections');
		});
	});
});
