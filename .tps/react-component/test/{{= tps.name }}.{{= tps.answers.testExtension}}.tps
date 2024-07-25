import React from 'react';
{{{? tps.answers.reactTestingLibrary}}}
import { render, screen } from '@testing-library/react';
{{{?tps.answers.jestDomImport }}}
import '@testing-library/jest-dom';
{{{?}}}
{{{?}}}
{{#def.componentImport}}

describe('{{#def.componentName}}', () => {
	it('should render the component', () => {
		{{{? tps.answers.reactTestingLibrary}}}
		render(<{{#def.componentName}} />);

		expect(screen.getByText('{{#def.componentName}} component')).toBeInTheDocument();
		{{{??}}}
		<{{#def.componentName}} />
		{{{?}}}
	});
});
