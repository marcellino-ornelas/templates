import doT from '@tps/templates/template-engine';

export const test = (templates, data, result) => {
  (Array.isArray(templates) ? templates : [templates]).forEach((tmpl) => {
    const fn = doT.template(tmpl);
    expect(fn(data)).toBe(result);
  });
};

export const render = (template, data) => {
  return doT.template(template)(data);
};
