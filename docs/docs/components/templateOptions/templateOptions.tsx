import React, { useCallback } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import type {
	SettingsFile,
	SettingsFilePrompt,
} from 'templates-mo/src/types/settings';
import styles from './templateOptions.module.css';

interface TemplateSettings {
	name: string;
	settings: SettingsFile;
}

interface TemplatesLibrariesPluginData {
	templates: Record<string, TemplateSettings>;
}

const getChoices = (prompt: SettingsFilePrompt): string[] => {
	return (prompt?.choices || []).map((choice) => {
		return typeof choice === 'string' ? choice : choice?.value;
	});
};

interface Props {
	template: string;
}

export const TemplateOptions = ({ template }: Props) => {
	const { templates } = usePluginData(
		'templates-libraries-plugin',
	) as TemplatesLibrariesPluginData;

	console.log(templates);

	const { settings } = templates[template];

	const getDefault = useCallback((defaultValue) => {
		switch (typeof defaultValue) {
			case 'string':
			case 'number':
				return defaultValue;

			case 'boolean':
			case 'object':
				if (defaultValue === null) return '';

				return JSON.stringify(defaultValue);
			default:
				return '';
		}
	}, []);

	return (
		<div className={styles.tableContainer}>
			<table>
				<thead>
					<tr>
						<th>name</th>
						<th>description</th>
						<th>option</th>
						<th>alias</th>
						<th>default</th>
						<th>hidden</th>
					</tr>
				</thead>
				<tbody>
					{settings?.prompts?.map((prompt) => (
						<tr key={prompt.name}>
							<td>{prompt.name}</td>
							<td>
								{prompt.description || prompt.message}
								<br />
								<span style={{ color: 'grey' }}>
									{!!prompt?.choices?.length &&
										`(${getChoices(prompt).join(', ')})`}
								</span>
							</td>
							<td style={{ whiteSpace: 'nowrap' }}>{`--${prompt.name}`}</td>
							<td style={{ whiteSpace: 'nowrap' }}>
								{prompt?.aliases
									?.map((alias) =>
										alias.length === 1 ? `-${alias}` : `--${alias}`,
									)
									.join(', ')}
							</td>
							<td>{getDefault(prompt.default ?? null)}</td>
							<td>{(prompt.hidden ?? false).toString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TemplateOptions;
