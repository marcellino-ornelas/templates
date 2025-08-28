import Templates from '@test/templates';

jest.mock('fs');

/**
 * Templates Packages
 */
describe('[Templates] Packages:', () => {
	let tps;

	beforeEach(() => {
		tps = await Templates.get('testing');
	});

	it('should be able to compile default package', async () => {
		expect(tps.packages).toHaveProperty('default');
	});

	it('should not load default package if turn off', async () => {
		const tpsNoDefault = await Templates.get('testing', { defaultPackage: false });

		expect(tpsNoDefault.opts.default).toBeFalsy();
		expect(tpsNoDefault.packages).not.toHaveProperty('default');
	});

	it('should be able to compile a package', async () => {
		await tps.loadPackages('main');
		expect(tps.packages).toHaveProperty('main');
	});

	it('should be able to compile many packages', async () => {
		const pkgs = ['store', 'main'];
		await tps.loadPackages(pkgs);

		pkgs.forEach((pkg) => {
			expect(tps.packages).toHaveProperty(pkg);
		});
	});
	it("should throw an error when packages aren't passed in", async () => {
		const errArgs = ['', {}, null, true, false];

		errArgs.forEach((errArg) => {
			expect(() => {
				await tps.loadPackages(errArg);
			}).toThrow();
		});
	});

	it("should throw an error when packages aren't real", async () => {
		expect(() => {
			await tps.loadPackages(['fake-package']);
		}).toThrow();
	});

	it('should not let you load a package if already loaded', async () => {
		await tps.loadPackage('main');

		expect(() => {
			await tps.loadPackage('main');
		}).toThrow();
	});
});
