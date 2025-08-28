import { render } from './util';

describe('evaluate', () => {
	describe('block scope', () => {
		it('Should not leave a new line in place', async () => {
			const result = render('{{{ const hey = "hey"; }}}');

			expect(result).toBe(``);
		});

		it('Should be able to use more than one', async () => {
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

		it('Should not render a new line when next to text', async () => {
			const result = render(`\
				{{{ const hey = 'hey'; }}}
				hey
			`);

			expect(result).toBe(`\
				hey
			`);
		});

		it('Should be able to use variables defined in evaluation', async () => {
			const result = render(`\
				{{{ const name = 'lino'; }}}
				{{= name }}
			`);

			expect(result).toBe(`\
				lino
			`);
		});

		it('Should be able remove spaces after brackets', async () => {
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
