import React, { useRef, useState } from 'react';
import Editor, { useMonaco, OnMount } from '@monaco-editor/react';
import { useDot } from '@site/src/hooks/useDot';
import { Row, Col, Input, AutoComplete } from 'antd';
import type { editor } from 'monaco-editor';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useColorMode } from '@docusaurus/theme-common';
import styles from './playground.module.css';

const DEFAULT_VALUE = `\
import React, { useEffect, useState } from 'react';{{? tps.answers.css}}
import {{? tps.answers.cssType.startsWith("module.")}}styles from {{?}}"./{{= tps.name}}.{{= tps.answers.cssType}}";{{?}}

export const {{= tps.name }} = ({}) => {
	return (
		<div>
			{/* ... */}
		</div>
	);
};
`;

const EDITOR_OPTS: editor.IStandaloneEditorConstructionOptions = {
  readOnly: false,
  minimap: { enabled: false },
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: Record<string, any>;
  name: string;
}

export const Editors = ({ answers, name }: Props) => {
  const { isDarkTheme } = useColorMode();
  const [language, setLanguage] = useState('typescript');
  const dotEditor = useRef<editor.IStandaloneCodeEditor>(null);
  const renderedEditor = useRef<editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();
  const [code, setCode] = useState(DEFAULT_VALUE);

  const lanuagesOptions = React.useMemo(() => {
    return (monaco?.languages?.getLanguages?.() ?? []).map((item) => ({
      value: item.id,
    }));
  }, [monaco]);

  const output = useDot({
    templateString: code,
    tps: {
      name,
      answers,
    },
  });

  const handleEditorChange = React.useCallback((value, event) => {
    setCode(value);
  }, []);

  const handleDotEditorDidMount: OnMount = (_editor, m) => {
    dotEditor.current = _editor;
  };

  const handleRenderedEditorDidMount: OnMount = (_editor) => {
    renderedEditor.current = _editor;
  };

  const onSelect = (data: string) => {
    setLanguage(data);
  };

  const theme = isDarkTheme ? 'vs-dark' : 'light';

  return (
    <div
      className={`${styles.editorContainer} ${
        isDarkTheme ? styles.editorContainerDark : styles.editorContainerLight
      }`}
    >
      <div className="margin-bottom--md">
        <AutoComplete
          value={language}
          options={lanuagesOptions}
          onSelect={onSelect}
        >
          <Input className={styles.editorLanguageSelect} />
        </AutoComplete>
      </div>
      <Row justify="center" align="middle" gutter={20}>
        <Col flex="auto" span={12}>
          <Editor
            options={{ ...EDITOR_OPTS }}
            height="50vh"
            theme={theme}
            defaultLanguage="txt"
            defaultValue={code}
            onChange={handleEditorChange}
            onMount={handleDotEditorDidMount}
          />
        </Col>
        <Col flex="auto" span={12}>
          <div className="">
            <Editor
              theme={theme}
              options={{
                ...EDITOR_OPTS,
                readOnly: true,
                domReadOnly: true,
              }}
              height="50vh"
              line={38}
              defaultLanguage={language}
              language={language}
              value={output}
              onMount={handleRenderedEditorDidMount}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
