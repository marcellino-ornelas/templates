import React, { useEffect, useState } from 'react';
import type {
	SettingsFile,
	SettingsFilePrompt,
} from 'templates-mo/src/types/settings';
import styles from './templateOptions.module.css';

interface Props {
	template: string;
	type: 'json' | 'js';
}

export const TemplateOptions = ({ template, type = 'json' }: Props) => {
	const [settingsFile, setSettingsFile] = useState<SettingsFile>(null);

	useEffect(() => {
		(async () => {
			// eslint-disable-next-line import/no-extraneous-dependencies
			const settingsFileRaw: SettingsFile = await import(
				// eslint-disable-next-line import/extensions
				`templates-mo/.tps/${template}/settings.${type}`
			);

			setSettingsFile(settingsFileRaw);
		})();
	}, []);

	const getChoices = (prompt: SettingsFilePrompt) => {
		return (prompt?.choices || []).map((choice) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return choice?.value || choice;
		});
	};

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
					</tr>
				</thead>
				<tbody>
					{settingsFile?.prompts?.map((prompt, i) => (
						<tr key={prompt.name}>
							<td>{prompt.name}</td>
							<td>
								{prompt.message}
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
							<td>
								{typeof prompt?.default === 'function'
									? prompt?.default({})
									: prompt?.default?.toString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TemplateOptions;
