import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';

jest.mock('fs');

interface TemplateAnswers {
	annotate: boolean;
	type: 'js' | 'json';
	experimental: boolean;
}

describe('Template', () => {
	beforeEach(() => {
		reset();
	});

	it('should be able to render a new template', async () => {
		const tps = new Templates<TemplateAnswers>('new-template', {
			default: true,
		});

		await tps.render(CWD, 'example');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'example')).toBeDirectory();
	});

	describe('type', () => {
		it.each(['js', 'json'])(
			'it should render a %s settings file',
			async (type: TemplateAnswers['type']) => {
				const tps = new Templates<TemplateAnswers>('new-template', {
					default: true,
				});

				tps.setAnswers({
					type,
				});

				await tps.render(CWD, 'example');

				// @ts-expect-error no types for extending jest functions
				expect(path.join(CWD, `example/settings.${type}`)).toBeFile();
			},
		);
	});

	describe('annotate', () => {
		it('should be able to render annotations in a js file', async () => {
			const tps = new Templates<TemplateAnswers>('new-template', {
				default: true,
			});

			tps.setAnswers({
				annotate: true,
			});

			await tps.render(CWD, 'example');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).toHaveFileContents(`\
module.exports = {
	/**
`);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).toHaveFileContents(`\
	prompts: [
		/**
`);
		});

		it('should be able to not render annotations in a js file', async () => {
			const tps = new Templates<TemplateAnswers>('new-template', {
				default: true,
			});

			tps.setAnswers({
				annotate: false,
			});

			await tps.render(CWD, 'example');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).toHaveFileContents(`\
module.exports = {
	prompts: [],
`);
		});
	});

	describe('experimental', () => {
		it('should be able to render experimental features', async () => {
			const tps = new Templates<TemplateAnswers>('new-template', {
				default: true,
			});

			tps.setAnswers({
				experimental: true,
			});

			await tps.render(CWD, 'example');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).toHaveFileContents(`\
	*/
	events: {
`);
		});

		it('should be able to render experimental features without annotations', async () => {
			const tps = new Templates<TemplateAnswers>('new-template', {
				default: true,
			});

			tps.setAnswers({
				experimental: true,
				annotate: false,
			});

			await tps.render(CWD, 'example');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).toHaveFileContents(`\
// @ts-check

/** @type {import('templates-mo/lib/types/settings').SettingsFile} */
module.exports = {
`);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).toHaveFileContents(`\
	events: {
		// async onRender(tps) {},
`);
		});

		it('should be able to not render experimental features', async () => {
			const tps = new Templates<TemplateAnswers>('new-template', {
				default: true,
			});

			tps.setAnswers({
				experimental: false,
			});

			await tps.render(CWD, 'example');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).not.toHaveFileContents(`\
// @ts-check

/** @type {import('templates-mo/lib/types/settings').SettingsFile} */
`);
			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).not.toHaveFileContents(`\
	events: {
`);
		});
	});

	describe('websiteUrl.def', () => {
		it('should be able to render url', async () => {
			const tps = new Templates<TemplateAnswers>('new-template', {
				default: true,
			});

			tps.setAnswers({
				annotate: true,
			});

			await tps.render(CWD, 'example');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, `example/settings.js`)).toHaveFileContents(
				'https://marcellino-ornelas.github.io/templates/docs/main/create-new-template/prompts',
			);
		});
	});
});
