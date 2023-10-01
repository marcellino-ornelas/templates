import doT from '@tps/templates/template-engine';

export const test = (templates, data, result) => {
  templates.forEach((tmpl) => {
    const fn = doT.template(tmpl);
    expect(fn(data)).toBe(result);
  });
};
