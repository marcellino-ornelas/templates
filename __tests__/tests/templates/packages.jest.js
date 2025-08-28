import Templates from '@test/templates';

jest.mock('fs');

/**
 * Templates Packages
 */
describe('[Templates] Packages:', () => {
	let tps;

<<<<<<< HEAD
	beforeEach(() => {
		tps = await Templates.get('testing');
||||||| 511cf2e
	beforeEach(() => {
		tps = new Templates('testing');
=======
	beforeEach(async () => {
		tps = await Templates.get('testing');
>>>>>>> cbe053ccca2a44959855e2a09c65b8792e707c55
	});

	it('should be able to compile default package', async () => {
		expect(tps.packages).toHaveProperty('default');
	});

<<<<<<< HEAD
	it('should not load default package if turn off', async () => {
		const tpsNoDefault = await Templates.get('testing', { defaultPackage: false });
||||||| 511cf2e
	it('should not load default package if turn off', () => {
		const tpsNoDefault = new Templates('testing', { defaultPackage: false });
=======
	it('should not load default package if turn off', async () => {
		const tpsNoDefault = await Templates.get('testing', {
			defaultPackage: false,
		});
>>>>>>> cbe053ccca2a44959855e2a09c65b8792e707c55

		expect(tpsNoDefault.opts.default).toBeFalsy();
		expect(tpsNoDefault.packages).not.toHaveProperty('default');
	});

<<<<<<< HEAD
	it('should be able to compile a package', async () => {
		await tps.loadPackages('main');
||||||| 511cf2e
	it('should be able to compile a package', () => {
		tps.loadPackages('main');
=======
	it('should be able to compile a package', async () => {
		tps.loadPackages('main');
>>>>>>> cbe053ccca2a44959855e2a09c65b8792e707c55
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

<<<<<<< HEAD
	it('should not let you load a package if already loaded', async () => {
		await tps.loadPackage('main');
||||||| 511cf2e
	it('should not let you load a package if already loaded', () => {
		tps.loadPackage('main');
=======
	it('should not let you load a package if already loaded', async () => {
		tps.loadPackage('main');
>>>>>>> cbe053ccca2a44959855e2a09c65b8792e707c55

		expect(() => {
			await tps.loadPackage('main');
		}).toThrow();
	});
});
