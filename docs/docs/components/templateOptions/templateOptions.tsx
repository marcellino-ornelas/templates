import React, { useEffect, useMemo, useState } from 'react';
import type {
	SettingsFile,
	SettingsFilePrompt,
	AnswersHash,
} from 'templates-mo/src/types/settings';
import styles from './templateOptions.module.css';

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

	const answers: AnswersHash = useMemo(() => {
		return settingsFile?.prompts?.reduce((answersAcc, prompt) => {
			return {
				...answersAcc,
				[prompt.name]:
					typeof prompt.default === 'function'
						? prompt.default(answersAcc)
						: prompt.default,
			};
		}, {});
	}, [settingsFile]);

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
					{settingsFile?.prompts?.map((prompt) => (
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
							<td>{(answers[prompt.name] ?? '').toString()}</td>
							<td>{(prompt.hidden ?? false).toString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TemplateOptions;
