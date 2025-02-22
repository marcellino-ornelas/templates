import path from 'path';
import { Build } from '@tps/templates/build';
import { Template } from '@tps/templates/template';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
import { mkTemplate } from '@test/utilities/templates';

jest.mock('fs');

const BUILD_PATH = path.join(CWD, 'App');

const templateName = 'testing_build';

describe('Build', () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		reset();

		mkTemplate(templateName);
	});

	describe('maybeWipe', () => {
		it('should be false when directory doesnt exist', async () => {
			const template = await Template.get(templateName);

			const build = new Build(BUILD_PATH, template, {
				wipe: true,
			});

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();
		});

		it('should be true when directory exist and was wiped', async () => {
			vol.mkdirSync(BUILD_PATH);

			const template = await Template.get(templateName);

			const build = new Build(BUILD_PATH, template, {
				wipe: true,
			});

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeTruthy();

			expect(spy).toBeCalled();
		});

		it('should be false when building in the destination directory', async () => {
			const template = await Template.get(templateName);

			const build = new Build(CWD, template, { wipe: true, buildInDest: true });

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();
		});

		it('should be false when not building a new folder', async () => {
			const hackyForceFunction = jest.fn();
			vol.mkdirSync(BUILD_PATH);

			const template = await Template.get(templateName);

			const build = new Build(BUILD_PATH, template, {
				wipe: true,
				buildNewFolder: false,
			});

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe(hackyForceFunction);

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();

			expect(hackyForceFunction).toBeCalled();
		});
	});
});
