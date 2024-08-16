/*
 * Modules
 */
import { mkPrompt, mkTemplate } from '@test/utilities/templates';
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
import path from 'path';

jest.mock('fs');

describe('Index', () => {
	beforeEach(() => {
		// jest.resetAllMocks();
		reset();
	});

	it('should be able to use a template with no prompts', async () => {
		const templateName = 'index';

		mkTemplate(templateName, undefined, {
			'./settings.json': JSON.stringify({}),
		});

		const tps = new Templates(templateName);

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});

	it('should be able to use a template with empty prompts', async () => {
		const templateName = 'index';

		mkTemplate(templateName, undefined, {
			'./settings.json': JSON.stringify({
				prompts: [],
			}),
		});

		const tps = new Templates(templateName);

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});
});
