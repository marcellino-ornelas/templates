/*
 * Modules
 */
import { mkTemplate } from '@test/utilities/templates';
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';

jest.mock('fs');

describe('Index', () => {
	beforeEach(() => {
		// jest.resetAllMocks();
		reset();
	});

	it('should be able to use a template with no prompts', async () => {
		const tps = mkTemplate('index', undefined, {
			'./settings.json': JSON.stringify({}),
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});

	it('should be able to use a template with empty prompts', async () => {
		const tps = mkTemplate('index', undefined, {
			'./settings.json': JSON.stringify({
				prompts: [],
			}),
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});
});
