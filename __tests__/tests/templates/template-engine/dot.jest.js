/* eslint-disable no-underscore-dangle */
import doT from '@tps/templates/template-engine';
import { test } from './util';

describe('doT', () => {
	const basictemplate = '<div>{{!tps.foo}}</div>';
	const basiccompiled = doT.template(basictemplate);

	describe('.name', () => {
		it('should have a name', async () => {
			expect(doT.name).toBe('doT');
		});
	});

	describe('#template()', () => {
		it('should return a function', async () => {
			expect(typeof basiccompiled).toBe('function');
		});
	});

	describe('#()', () => {
		it('should render the template', async () => {
			expect(basiccompiled({ foo: 'http' })).toBe('<div>http</div>');
			expect(basiccompiled({ foo: 'http://abc.com' })).toBe(
				'<div>http:&#47;&#47;abc.com</div>',
			);
			expect(basiccompiled({})).toBe('<div></div>');
		});
	});

	describe('encoding with doNotSkipEncoded=false', () => {
		it('should not replace &', async () => {
			global._encodeHTML = undefined;
			doT.templateSettings.doNotSkipEncoded = false;
			const fn = doT.template('<div>{{!tps.foo}}</div>');
			expect(fn({ foo: '&amp;' })).toBe('<div>&amp;</div>');
		});
	});

	describe('interpolate 2 numbers', () => {
		it('should print numbers next to each other', async () => {
			test(
				[
					'{{=tps.one}}{{=tps.two}}',
					'{{= tps.one}}{{= tps.two}}',
					'{{= tps.one }}{{= tps.two }}',
				],
				{ one: 1, two: 2 },
				'12',
			);
		});
	});

	describe('evaluate JavaScript', () => {
		it('should print numbers next to each other', async () => {
			test(
				['{{ tps.one = 1; tps.two = 2; }}{{= tps.one }}{{= tps.two }}'],
				{},
				'12',
			);
		});
	});

	describe('encoding with doNotSkipEncoded=true', () => {
		it('should replace &', async () => {
			global._encodeHTML = undefined;
			doT.templateSettings.doNotSkipEncoded = true;
			expect(doT.template('<div>{{!tps.foo}}</div>')({ foo: '&amp;' })).toBe(
				'<div>&#38;amp;</div>',
			);
			expect(doT.template('{{!tps.a}}')({ a: '& < > / \' "' })).toBe(
				'&#38; &#60; &#62; &#47; &#39; &#34;',
			);
			expect(doT.template('{{!"& < > / \' \\""}}')()).toBe(
				'&#38; &#60; &#62; &#47; &#39; &#34;',
			);
		});
	});

	describe('invalid JS in templates', () => {
		it('should throw exception', async () => {
			expect(() => doT.template('<div>{{= foo + }}</div>')).toThrow();
		});
	});
});
