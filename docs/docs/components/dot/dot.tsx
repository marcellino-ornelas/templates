import React from 'react';
import doT from 'dot';
import CodeBlock from '@theme/CodeBlock';
import * as utils from 'templates-mo/lib/templates/utils';
import { Tps } from '@site/types/templates';
import styles from './dot.module.css';

doT.templateSettings.strip = false;
doT.templateSettings.varname = 'tps';

interface Props {
  templateName?: string;
  children: React.ReactNode;
  templateMeta: string;
  resultMeta: string;
  result: boolean;
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tps: Partial<Tps>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type templateFn = (obj: Tps) => string;

const DEFAULT_TPS: Tps = {
  name: 'App',
  answers: {},
  utils,
  u: utils,
};

export const Dot = ({
  templateName = 'Dot Template',
  children,
  tps = {},
  result = true,
  templateMeta = '',
  resultMeta = '',
  lang = 'text',
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const templateString = (children as any).props.children.props.children;

  let output;

  if (result) {
    try {
      const dotTemplate: templateFn = doT.template(templateString);
      output = dotTemplate({ ...DEFAULT_TPS, ...tps });
    } catch (e) {
      output = `Error: ${e.message}`;
    }
  }

  return (
    <div>
      <CodeBlock
        className={styles.template}
        showLineNumbers
        title={templateName}
        language={lang}
        metastring={templateMeta}
      >
        {templateString}
      </CodeBlock>

      {result && (
        <CodeBlock
          title="Result"
          className={styles.result}
          language={lang}
          metastring={resultMeta}
        >
          {`${output}`}
        </CodeBlock>
      )}
    </div>
  );
};
