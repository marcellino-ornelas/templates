import { test, render } from './util';

describe('iteration', () => {
	describe('without index', () => {
		it('should repeat string N times', () => {
			test(
				[
					'{{~tps.arr:x}}*{{~}}',
					'{{~ tps.arr:x }}*{{~}}',
					'{{~ tps.arr: x }}*{{~}}',
					'{{~ tps.arr :x }}*{{~}}',
				],
				{ arr: Array(3) },
				'***'
			);
		});

		it('should concatenate items', () => {
			test(['{{~tps.arr:x}}{{=x}}{{~}}'], { arr: [1, 2, 3] }, '123');
		});
	});

	describe('with index', () => {
		it('should repeat string N times', () => {
			test(
				['{{~tps.arr:x:i}}*{{~}}', '{{~ tps.arr : x : i }}*{{~}}'],
				{ arr: Array(3) },
				'***'
			);
		});

		it('should concatenate indices', () => {
			test(['{{~tps.arr:x:i}}{{=i}}{{~}}'], { arr: Array(3) }, '012');
		});

		it('should concatenate indices and items', () => {
			test(
				['{{~tps.arr:x:i}}{{?i}}, {{?}}{{=i}}:{{=x}}{{~}}'],
				{ arr: [10, 20, 30] },
				'0:10, 1:20, 2:30'
			);
		});
	});

	describe('block syntax', () => {
		it('should be able to use block syntax', () => {
			const result = render(`\
{{{~[1,2,3,4] :value:index}}}
{{= value}}
{{{~}}}
`);

			expect(result).toBe(`\
1
2
3
4
`);
		});

		it('should be able to use block syntax indented', () => {
			const result = render(`\
				{{{~[1,2,3,4] :value:index}}}
				{{= value}}
				{{{~}}}
			`);

			expect(result).toBe(`\
				1
				2
				3
				4
			`);
		});

		// Current behavior. Not ideal but want to preserve functionality
		it('should not be able to render block inline and preserve tabs', () => {
			const result = render(`\
				{{{~[1,2,3,4] :value:index}}}{{= value}}{{{~}}}
			`);

			expect(result).toBe(`\
1234
			`);
		});
	});
});
