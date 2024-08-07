{{{? tps.answers.export === 'named'}}}
{{{? tps.answers.indexExportPattern === 'shorthand' }}}
export * from './{{= tps.name}}';
{{{??}}}
{{#def.componentImport}}

export { {{#def.componentName}} };
{{{?}}}
{{{??}}}
{{{? tps.answers.indexExportPattern === 'shorthand' }}}
export { default } from './{{= tps.name}}';
{{{??}}}
{{#def.componentImport}}

export default {{#def.componentName}};
{{{?}}}
{{{?}}}