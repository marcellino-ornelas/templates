import { useEffect, useState } from 'react';
import doT from 'dot';
import * as utils from 'templates-mo/lib/templates/utils';

doT.templateSettings.strip = false;
doT.templateSettings.varname = 'tps';

interface Props {
  templateName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tps?: Record<string, any>;
}

type templateFn = (obj: Record<string, any>) => string;

export const useDot = ({ templateString, tps = {} }) => {
  const [output, setOutput] = useState<string>(null);

  useEffect(() => {
    let result;
    try {
      const dotTemplate: templateFn = doT.template(templateString);
      result = dotTemplate({ ...tps, utils, u: utils });
    } catch (e) {
      result = `Error: ${e.message}`;
    }

    setOutput(result);
  }, [templateString, tps]);

  return output;
};
