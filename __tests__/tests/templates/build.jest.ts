import { Build } from '@tps/templates/build';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
import path from 'path';

jest.mock('fs');

const BUILD_PATH = path.join(CWD, 'App');

describe('Build', () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		reset();
	});

	describe('maybeWipe', () => {
		it('should be false when directory doesnt exist', async () => {
			const build = new Build(BUILD_PATH, { wipe: true });

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();
		});

		it('should be true when directory exist and was wiped', async () => {
			vol.mkdirSync(BUILD_PATH);

			const build = new Build(BUILD_PATH, { wipe: true });

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeTruthy();

			expect(spy).toBeCalled();
		});

		it('should be false when building in the destination directory', async () => {
			const build = new Build(CWD, { wipe: true, buildInDest: true });

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();
		});

		it('should be false when not building a new folder', async () => {
			const hackyForceFunction = jest.fn();
			vol.mkdirSync(BUILD_PATH);

			const build = new Build(BUILD_PATH, {
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

	// it('should ....', async () => {
	// 	const templateName = 'build';

	// 	mkTemplate(templateName);

	// 	const tps = new Templates(templateName);

	// 	await tps.render(CWD, 'App');

	// 	// @ts-expect-error no types for extending jest functions
	// 	expect(path.join(CWD, 'App')).toBeDirectory();
	// });
});
