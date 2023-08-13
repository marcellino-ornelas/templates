import React from 'react';
import doT from 'dot';
import CodeBlock from '@theme/CodeBlock';
import * as utils from 'templates-mo/lib/templates/utils';
import { useDot } from '@site/src/hooks/useDot';
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
  tps?: Partial<Tps>;
}

// type templateFn = (obj: Tps) => string;

export const Dot = ({
  templateName = 'Dot Template',
  children,
  tps = {},
  result = true,
  templateMeta = '',
  resultMeta = '',
  lang = 'text',
}: Props) => {
  const templateString = (children as any).props.children.props.children;

  const output = useDot({
    templateString,
    tps,
  });

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
