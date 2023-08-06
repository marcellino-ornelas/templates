import React, { useContext, useEffect, useLayoutEffect } from 'react';
import * as utils from 'templates-mo/lib/templates/utils';
import CodeBlock from '@docusaurus/theme-live-codeblock/lib/theme/CodeBlock';
import { Example } from '@site/docs/components/example';
import Heading from '@theme/Heading';
import * as infection from 'inflection';

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
  const example = overrideExample[name]?.example || 'example text';

  const code =
    overrideExample?.[name]?.render?.(name, example) ||
    `tps.utils.${name}("${example}")`;

  return `const result = ${code};

render(result);`;
};

const infectionLink = (name) => {
  const override = overrideExample[name];
  let params = override?.params || ['str'];

  const anchor = params.join('-');

  return `https://github.com/dreamerslab/node.inflection#inflection${infection.underscore(
    name
  )}-${anchor}-`;
};

const changeCaseLink = (name: string) => {
  return `https://github.com/blakeembrey/change-case#${name.toLowerCase()}`;
};

const isInfection = (name: string) => {
  return name in infection;
};

export const TemplatesContextUtils = () => {
  const names = React.useMemo(() => {
    return Object.keys(utils);
  }, [utils]);

  useEffect(() => {
    const utils = document.querySelector(".table-of-contents a[href='#utils']");

    if (utils) {
      const li = utils.parentElement;
      const ul = document.createElement('ul');

      names.forEach((name) => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.setAttribute('href', `#${name}`);
        a.innerText = name;

        li.appendChild(a);
        ul.appendChild(li);
      });

      li.appendChild(ul);
    }
  }, []);

  return (
    <div>
      {names.map((name) => (
        <div>
          <Heading id={name} as="h2">
            {name}
          </Heading>
          <p>
            <a
              target="_blank"
              className="button button--primary"
              href={
                isInfection(name) ? infectionLink(name) : changeCaseLink(name)
              }
            >
              docs
            </a>
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
