/* eslint-disable jest/expect-expect */
import doT from '@tps/templates/template-engine';
import { render } from './util';

describe('defines', () => {
	describe('without parameters', () => {
		it('should render define', async () => {
			testDef('{{##def.tmp:<div>{{!tps.foo}}</div>#}}{{#def.tmp}}');
		});

		it('should render define if it is passed to doT.compile', async () => {
			testDef('{{#def.tmp}}', { tmp: '<div>{{!tps.foo}}</div>' });
		});
	});

	describe('with parameters', () => {
		it('should render define', async () => {
			testDef(
				'{{##def.tmp:foo:<div>{{!foo}}</div>#}}{{ var bar = tps.foo; }}{{# def.tmp:bar }}',
			);
		});
	});

	describe('block syntax', () => {
		it('should be able to use block syntax', async () => {
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

		it('should not leave a new line behind', async () => {
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

		it('should be able to use on one line', async () => {
			const result = render(`\
{{{##def.name:lino#}}}
{{#def.name}}`);

			expect(result).toBe(`lino`);
		});

		it('should be able to use args', async () => {
			const result = render(`\
{{{##def.name:userName:
{{= userName }}
#}}}
{{#def.name:"lino"}}`);

			expect(result).toBe(`lino`);
		});

		it('should catch new line right before the end', async () => {
			const result = render(`\
{{{##def.name:lino
#}}}
{{#def.name}}`);

			expect(result).toBe(`lino`);
		});

		it('should catch any white space on front and end', async () => {
			const result = render(`\
   {{{##def.name:
lino
#}}}   
{{#def.name}}`);

			expect(result).toBe(`lino`);
		});

		it('should be able to use function syntax', async () => {
			const result = render(`\
{{{##def.name = () => {
	return "lino";
}#}}}
{{#def.name()}}`);

			expect(result).toBe(`lino`);
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
