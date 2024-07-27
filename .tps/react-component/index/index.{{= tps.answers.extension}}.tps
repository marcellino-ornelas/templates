{{{? tps.answers.export === 'named'}}}
{{{? tps.answers.indexExportPattern === 'shorthand' }}}
export * from './{{= tps.name}}';
{{{??}}}
import { {{#def.componentName}} } from './{{= tps.name}}';
export { {{#def.componentName}} };
{{{?}}}
{{{??}}}
{{{? tps.answers.indexExportPattern === 'shorthand' }}}
export { default } from './{{= tps.name}}';
{{{??}}}
import {{#def.componentName}} from './{{= tps.name}}';
export default {{#def.componentName}};
{{{?}}}
{{{?}}}