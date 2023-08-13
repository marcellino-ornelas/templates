import { useEffect, useState } from 'react';
import doT from 'dot';
import { Tps } from '@site/types/templates';
import * as utils from 'templates-mo/lib/templates/utils';

doT.templateSettings.strip = false;
doT.templateSettings.varname = 'tps';

interface Props {
  templateString?: string;
  tps?: Partial<Tps>;
}

type templateFn = (obj: Tps) => string;

const DEFAULT_TPS: Tps = {
  name: 'App',
  answers: {},
  utils,
  u: utils,
};

export const useDot = ({ templateString, tps = {} }: Props) => {
  const [output, setOutput] = useState<string>(null);

  useEffect(() => {
    let result;
    try {
      const dotTemplate: templateFn = doT.template(templateString, null);
      result = dotTemplate({ ...DEFAULT_TPS, ...tps });
    } catch (e) {
      result = `Error: ${e.message}`;
    }

    setOutput(result);
  }, [templateString, tps]);

  return output;
};
