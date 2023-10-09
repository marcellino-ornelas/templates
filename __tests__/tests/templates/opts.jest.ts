import Templates from '@test/templates';

jest.mock('fs');

describe('[Templates] options:', () => {
	it('should prefer options from settings file vs defaults', async () => {
		const tps = new Templates('testing-options-settings-file');

		expect(tps.opts.newFolder).toBeFalsy();
	});

	it('should prefer user options over settings file', async () => {
		const tps = new Templates('testing-options-settings-file', {
			newFolder: true,
		});

		expect(tps.opts.newFolder).toBeTruthy();
	});
});
