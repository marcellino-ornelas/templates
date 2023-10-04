import { render } from './util';

describe('evaluate', () => {
	describe('block scope', () => {
		it('Should not leave a new line in place', () => {
			const result = render('{{{ const hey = "hey"; }}}');

			expect(result).toBe(``);
		});

		it('Should be able to use more than one', () => {
			const result = render(`\
				{{{ const name = 'lino'; }}}
				{{{ const name2 = 'cassie'; }}}
				{{= name }}
				{{= name2 }}
			`);

			expect(result).toBe(`\
				lino
				cassie
			`);
		});

		it('Should not render a new line when next to text', () => {
			const result = render(`\
				{{{ const hey = 'hey'; }}}
				hey
			`);

			expect(result).toBe(`\
				hey
			`);
		});

		it('Should be able to use variables defined in evaluation', () => {
			const result = render(`\
				{{{ const name = 'lino'; }}}
				{{= name }}
			`);

			expect(result).toBe(`\
				lino
			`);
		});

		it('Should be able remove spaces after brackets', () => {
			const result = render(`\
				{{{ const name = 'lino'; }}}  	
				{{= name }}
			`);

			expect(result).toBe(`\
				lino
			`);
		});
	});
});
