/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';
import * as path from 'path';

jest.mock('fs');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Rendering dynamic:', () => {
	let tps;

	beforeAll(() => playground.create());
	afterAll(() => playground.destroy());

	beforeEach(() => {
		tps = new Templates('testing-dynamic');
		// For tests that dont care about answer
		tps.setAnswers({
			one: 'bad',
		});
		return playground.createBox('rendering_dynamic');
	});

	describe('File names', () => {
		beforeEach(() => {
			tps = new Templates('testing-dynamic-file-name');
		});

		it('should allow tps.name in file name', async () => {
			const dynamicFile = playground.pathTo('App/App.txt');

			// Done need this answer in test but need to answer
			tps.setAnswers({
				one: '',
			});

			await tps.render(playground.box(), ['App']);

			expect(dynamicFile).toBeFile();
		});

		it('should allow tps.answers in file names', async () => {
			const answer = 'hey';
			const dynamicFile = playground.pathTo(`App/answers-${answer}.txt`);

			tps.setAnswers({
				one: answer,
			});

			await tps.render(playground.box(), ['App']);

			expect(dynamicFile).toBeFile();
		});

		it('should allow tps.a in file names', async () => {
			const answer = 'hey';
			const dynamicFile = playground.pathTo(`App/short-answers-${answer}.txt`);

			tps.setAnswers({
				one: answer,
			});

			await tps.render(playground.box(), ['App']);

			expect(dynamicFile).toBeFile();
		});
	});

	describe('content', () => {
		/**
		 * @docs guide/getting-started/dynamic-files.md#name
		 */
		it("should set 'tps.name' to the new template being created", () => {
			const destPath = path.join(playground.box(), 'App');
			const indexFile = path.join(destPath, 'index.txt');
			return tps.render(playground.box(), ['App']).then(() => {
				expect(destPath).toBeDirectory();
				expect(indexFile).toHaveFileContents('name: App');
			});
		});

		/**
		 * @docs guide/getting-started/dynamic-files.md#name
		 */
		it("should set 'tps.name' to the new template being created when using extended path", () => {
			const destPath = path.join(playground.box(), 'App/Nav');
			const indexFile = path.join(destPath, 'index.txt');
			return tps.render(playground.box(), ['App/Nav']).then(() => {
				expect(destPath).toBeDirectory();
				expect(indexFile).toHaveFileContents('name: Nav');
			});
		});

		/**
		 * @docs guide/getting-started/dynamic-files.md#name
		 */
		it("should set 'tps.name' to the new template being created when using multiple build paths", () => {
			const destPaths = [
				[path.join(playground.box(), 'App'), 'name: App'],
				[path.join(playground.box(), 'Nav'), 'name: Nav'],
				[path.join(playground.box(), 'Nav/NavList'), 'name: NavList'],
			];

			return tps
				.render(playground.box(), ['App', 'Nav', 'Nav/NavList'])
				.then(() => {
					destPaths.forEach(([dest, contents]) => {
						expect(dest).toBeDirectory();
						expect(path.join(dest, 'index.txt')).toHaveFileContents(contents);
					});
				});
		});

		/**
		 * @docs guide/getting-started/dynamic-files.md#templates
		 */
		it("should set 'tps.template' to the template being used as the blueprint", () => {
			const dest = path.join(playground.box(), 'App');

			return tps.render(playground.box(), 'App').then(() => {
				expect(dest).toBeDirectory();
				expect(path.join(dest, 'index.txt')).toHaveFileContents(
					'template: testing-dynamic',
				);
			});
		});

		it("should set 'tps.answers'", async () => {
			tps.setAnswers({
				one: 'hey',
			});

			await tps.render(playground.box(), 'App');

			expect(playground.pathTo('App/index.txt')).toHaveFileContents(
				'tps.answers.one: hey',
			);
		});

		it("should set 'tps.a'", async () => {
			tps.setAnswers({
				one: 'hey',
			});

			await tps.render(playground.box(), 'App');

			expect(playground.pathTo('App/index.txt')).toHaveFileContents(
				'tps.a.one: hey',
			);
		});

		it("should set 'tps.utils'", async () => {
			tps.setAnswers({
				one: 'hey',
			});

			await tps.render(playground.box(), 'App');

			expect(playground.pathTo('App/index.txt')).toHaveFileContents(
				'tps.utils: hey',
			);
		});

		it("should set 'tps.u'", async () => {
			tps.setAnswers({
				one: 'hey',
			});

			await tps.render(playground.box(), 'App');

			expect(playground.pathTo('App/index.txt')).toHaveFileContents(
				'tps.u: hey',
			);
		});
	});
});
