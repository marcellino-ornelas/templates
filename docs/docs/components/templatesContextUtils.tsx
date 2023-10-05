import React, { useEffect } from 'react';
import * as utils from 'templates-mo/lib/templates/utils';
import CodeBlock from '@docusaurus/theme-live-codeblock/lib/theme/CodeBlock';
import { Example } from '@site/docs/components/example';
import Heading from '@theme/Heading';
import * as infection from 'inflection';

const INFLECTION_URL = 'https://github.com/dreamerslab/node.inflection';
const CHANGE_CASE_URL = 'https://github.com/blakeembrey/change-case';

const overrideExample = {
	pluralize: {
		params: ['str', 'plural'],
		example: 'example',
	},
	singularize: {
		params: ['str', 'singular'],
		example: 'examples',
	},
	inflect: {
		params: ['str', 'count', 'singular', 'plural'],
		example: 'person',
		render: (name, example) => {
			return `tps.utils.${name}("${example}", 2))`;
		},
	},
	camelize: {
		params: ['str', 'low_first_letter'],
		example: 'message_properties',
	},
	underscore: {
		params: ['str', 'all_upper_case'],
		example: 'MessageProperties',
	},
	humanize: {
		params: ['str', 'low_first_letter'],
		example: 'message_properties',
	},
	demodulize: {
		example: 'Message::Bus::Properties',
	},
	tableize: {
		example: 'MessageBusProperty',
	},
	classify: {
		example: 'nav',
	},
	foreignKey: {
		params: ['str', 'drop_id_ubar'],
		example: 'MessageBusProperty',
	},
	ordinalize: {
		example: '1 example',
	},
	transform: {
		params: ['str', 'arr'],
		render: (name, example) => {
			return `tps.utils.${name}("${example}", [ 'pluralize', 'capitalize', 'dasherize' ])`;
		},
	},
};

const example = (name: string) => {
	const exampleText = overrideExample[name]?.example || 'example text';

	const code =
		overrideExample?.[name]?.render?.(name, exampleText) ||
		`tps.utils.${name}("${exampleText}")`;

	return `const result = ${code};

render(result);`;
};

const infectionLink = (name) => {
	const override = overrideExample[name];
	const params = override?.params || ['str'];

	const anchor = params.join('-');

	return `${INFLECTION_URL}#inflection${infection.underscore(name)}-${anchor}-`;
};

const changeCaseLink = (name: string) => {
	return `${CHANGE_CASE_URL}#${name.toLowerCase()}`;
};

const isInfection = (name: string) => {
	return name in infection;
};

export const TemplatesContextUtils = () => {
	const names = React.useMemo(() => {
		return Object.keys(utils);
	}, [utils]);

	useEffect(() => {
		const utilsEl = document.querySelector(
			".table-of-contents a[href='#utils']",
		);

		if (utilsEl) {
			const parentLi = utilsEl.parentElement;
			const ul = document.createElement('ul');

			names.forEach((name) => {
				const li = document.createElement('li');
				const a = document.createElement('a');

				a.setAttribute('href', `#${name}`);
				a.innerText = name;

				li.appendChild(a);
				ul.appendChild(li);
			});

			parentLi.appendChild(ul);
		}
	}, []);

	return (
		<div>
			{names.map((name) => (
				<div key={name}>
					<Heading id={name} as="h2">
						{name}
					</Heading>
					<p>
						<span className="badge badge--primary margin-left--xs">
							<a
								href={isInfection(name) ? INFLECTION_URL : CHANGE_CASE_URL}
								style={{ color: 'inherit' }}
							>
								{isInfection(name) ? 'inflection' : 'change-case'}
							</a>
						</span>
						<span className="badge badge--secondary margin-left--xs">
							<a
								href={
									isInfection(name) ? infectionLink(name) : changeCaseLink(name)
								}
							>
								docs
							</a>
						</span>
					</p>
					<CodeBlock language="jsx" metastring="title='Usage'">
						{`{{= tps.utils.${name}(${(
							overrideExample[name]?.params || ['str']
						).join(', ')}) }}`}
					</CodeBlock>
					<Example>
						<CodeBlock language="jsx" live noInline metastring="title='hey'">
							{example(name)}
						</CodeBlock>
					</Example>
				</div>
			))}
		</div>
	);
};
