import React, { useEffect, useState } from 'react';
import type { SettingsFile } from '@site/types/settingsFile';
// import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './templateOptions.module.css';

interface Props {
  template: string;
  type: 'json' | 'js';
}

export const TemplateOptions = ({ template, type = 'json' }: Props) => {
  const [settingsFile, setSettingsFile] = useState<SettingsFile>(null);
  //   const d = usePluginData('templates-plugin');

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
              <td>{prompt.message}</td>
              <td>{`--${prompt.name}`}</td>
              <td>
                {prompt?.aliases?.map((alias) =>
                  alias.length === 1 ? `-${alias}` : `--${alias}`
                )}
              </td>
              <td>{prompt?.default?.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateOptions;
