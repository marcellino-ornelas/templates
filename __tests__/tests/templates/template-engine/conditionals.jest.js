import { test, render } from './util';

describe('conditionals', () => {
	describe('without else', () => {
		const templates = [
			'{{?tps.one < 2}}{{=tps.one}}{{?}}{{=tps.two}}',
			'{{? tps.one < 2 }}{{= tps.one }}{{?}}{{= tps.two }}',
		];

		it('should evaluate condition and include template if valid', () => {
			test(templates, { one: 1, two: 2 }, '12');
		});

		it('should evaluate condition and do NOT include template if invalid', () => {
			test(templates, { one: 3, two: 2 }, '2');
		});
	});

	describe('with else', () => {
		const templates = [
			'{{?tps.one < 2}}{{=tps.one}}{{??}}{{=tps.two}}{{?}}',
			'{{? tps.one < 2 }}{{= tps.one }}{{??}}{{= tps.two }}{{?}}',
		];

		it('should evaluate condition and include "if" template if valid', () => {
			test(templates, { one: 1, two: 2 }, '1');
		});

		it('should evaluate condition and include "else" template if invalid', () => {
			test(templates, { one: 3, two: 2 }, '2');
		});
	});

	describe('with else if', () => {
		const templates = [
			'{{?tps.one < 2}}{{=tps.one}}{{??tps.two < 3}}{{=tps.two}}{{??}}{{=tps.three}}{{?}}',
			'{{? tps.one < 2 }}{{= tps.one }}{{?? tps.two < 3 }}{{= tps.two }}{{??}}{{= tps.three }}{{?}}',
		];

		it('should evaluate condition and include "if" template if valid', () => {
			test(templates, { one: 1, two: 2, three: 3 }, '1');
		});

		it('should evaluate condition and include "else if" template if second condition valid', () => {
			test(templates, { one: 10, two: 2, three: 3 }, '2');
		});

		it('should evaluate condition and include "else" template if invalid', () => {
			test(templates, { one: 10, two: 20, three: 3 }, '3');
		});
	});

	describe('block syntax', () => {
		it('should be able to use block syntax', () => {
			const result = render(
				`\
{{{? tps.one}}}
This is my text
{{{?}}}

hey`,
				{ one: true },
			);

			expect(result).toBe(`\
This is my text

hey`);
		});

		it('should be able to use block syntax thats indented', () => {
			const result = render(
				`\
				{{{? tps.one}}}
				This is my text
				{{{?}}}
	
				hey`,
				{ one: true },
			);

			expect(result).toBe(`\
				This is my text
	
				hey`);
		});
	});

	it('should leave no new lines behind when value is false', () => {
		const result = render(
			`\
			{{{? tps.one}}}
			This is my text
			{{{?}}}`,
			{ one: false },
		);

		expect(result).toBe('');
	});

	it('should be able to use multiple', () => {
		const result = render(
			`\
			{{{? tps.one}}}
			This is my text
			{{{?}}}
			{{{? tps.two}}}
			This is my second text
			{{{?}}}
			`,
			{ one: true, two: true },
		);

		expect(result).toBe(
			`\
			This is my text
			This is my second text
			`,
		);
	});
});
