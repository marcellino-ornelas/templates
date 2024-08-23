import React, { useEffect, useMemo, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import type {
	SettingsFile,
	SettingsFilePrompt,
	AnswersHash,
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
	type: 'json' | 'js';
}

export const TemplateOptions = ({ template, type = 'json' }: Props) => {
	// const [settingsFile, setSettingsFile] = useState<SettingsFile>(null);

	const { templates }: TemplatesLibrariesPluginData = usePluginData(
		'templates-libraries-plugin',
	);

	const { settings } = templates[template];

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
							<td>{prompt.default.toString()}</td>
							<td>{(prompt.hidden ?? false).toString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TemplateOptions;
