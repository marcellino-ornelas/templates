/* eslint-disable jest/expect-expect */
import doT from '@tps/templates/template-engine';
import { render } from './util';

describe('defines', () => {
	describe('without parameters', () => {
		it('should render define', () => {
			testDef('{{##def.tmp:<div>{{!tps.foo}}</div>#}}{{#def.tmp}}');
		});

		it('should render define if it is passed to doT.compile', () => {
			testDef('{{#def.tmp}}', { tmp: '<div>{{!tps.foo}}</div>' });
		});
	});

	describe('with parameters', () => {
		it('should render define', () => {
			testDef(
				'{{##def.tmp:foo:<div>{{!foo}}</div>#}}{{ var bar = tps.foo; }}{{# def.tmp:bar }}',
			);
		});
	});

	describe('block syntax', () => {
		it('should be able to use block syntax', () => {
			const result = render(`\
{{{##def.name:
lino
#}}}

{{#def.name}}

`);

			expect(result).toBe(`\

lino

`);
		});

		it('should not leave a new line behind', () => {
			const result = render(`\
hey
{{{##def.name:
lino
#}}}
{{#def.name}}
`);

			expect(result).toBe(`\
hey
lino
`);
		});

		it('should be able to use on one line', () => {
			const result = render(`\
{{{##def.name:lino#}}}
{{#def.name}}`);

			expect(result).toBe(`lino`);
		});

		it('should catch new line right before the end', () => {
			const result = render(`\
{{{##def.name:lino
#}}}
{{#def.name}}`);

			expect(result).toBe(`lino`);
		});

		it('should catch any white space on front and end', () => {
			const result = render(`\
   {{{##def.name:
lino
#}}}   
{{#def.name}}`);

			expect(result).toBe(`lino`);
		});

		it('should be able to use function syntax', () => {
			const result = render(`\
{{{##def.name = () => {
	return "lino";
}#}}}
{{#def.name()}}`);

			expect(result).toBe(`lino`);
		});

		it('should be able to use a block if statement that has one line inline', () => {
			const result = render(`hey there {{#def.name}}, how are you doing?`);

			/**
			 * The current issue is that in the def file the new line after lino
			 * is staying in the generated instance
			 *
			 * Also the block bracket {{{}}} is causing the space between "there" and "lino" to be removed
			 */
			expect(result).toBe(`hey there lino, how are you doing?`);
		});

		it('should be able to use a block if statement in a def thats passed to compile that has one line inline', () => {
			const defs = {
				name: `\
{{{? true }}}
lino-
{{{??}}}
unknown
{{{?}}}
`,
			};
			const result = render(
				`hey there {{#def.name}}, how are you doing?`,
				undefined,
				defs,
			);

			/**
			 * The current issue is that in the def file the new line after lino
			 * is staying in the generated instance
			 *
			 * Also the block bracket {{{}}} is causing the space between "there" and "lino" to be removed
			 */
			expect(result).toBe(`hey there lino, how are you doing?`);
		});
	});

	function testDef(tmpl, defines) {
		const fn = doT.compile(tmpl, defines);
		expect(fn({ foo: 'http' })).toBe('<div>http</div>');
		expect(fn({ foo: 'http://abc.com' })).toBe(
			'<div>http:&#47;&#47;abc.com</div>',
		);
		expect(fn({})).toBe('<div></div>');
	}
});
