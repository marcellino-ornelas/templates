import { MAIN_DIR } from '@tps/utilities/constants';
import { getNpmPackagePath } from '@tps/utilities/helpers';

describe('Utilities', () => {
	describe('getNpmPackagePath', () => {
		it('should get npm package directory', () => {
			expect(getNpmPackagePath('tps-test-3rd-party-package')).toContain(
				`${MAIN_DIR}/node_modules/tps-test-3rd-party-package`,
			);
		});
	});
});
