import React from 'react';
import doT from 'dot';
import CodeBlock from '@theme/CodeBlock';
import { useDot } from '@site/src/hooks/useDot';
import { Tps } from '@site/types/templates';
import styles from './dot.module.css';

doT.templateSettings.strip = false;
doT.templateSettings.varname = 'tps';

interface Props {
	templateName?: string;
	resultName?: string;
	children: React.ReactNode;
	templateMeta: string;
	resultMeta: string;
	result: boolean;
	displayTemplate: boolean;
	lang: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tps?: Partial<Tps>;
	defs?: Record<string, string>;
}

export const Dot = ({
	templateName = 'Dot Template',
	resultName = 'Result',
	children,
	tps = {},
	defs = {},
	result = true,
	displayTemplate = true,
	templateMeta = '',
	resultMeta = '',
	lang = 'text',
}: Props) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const templateString = (children as any).props.children.props.children;

	const output = useDot({
		templateString,
		tps,
		defs,
	});

	const templateClasses = [styles.template];
	const resultClasses = [styles.result];

	// When no template is being displayed, we need to fix top `border-radius`
	if (!displayTemplate) {
		resultClasses.push(styles.noTemplate);
	}

	// When no template is being displayed, we need to fix top `border-radius`
	if (!result) {
		templateClasses.push(styles.noResult);
	}

	return (
		<div>
			{displayTemplate && (
				<CodeBlock
					className={templateClasses.join(' ')}
					showLineNumbers
					title={templateName}
					language={lang}
					metastring={templateMeta}
				>
					{templateString}
				</CodeBlock>
			)}

			{result && (
				<CodeBlock
					title={resultName}
					className={resultClasses.join(' ')}
					showLineNumbers
					language={lang}
					metastring={resultMeta}
				>
					{`${output}`}
				</CodeBlock>
			)}
		</div>
	);
};
