{{{
	const isDefaultExport = tps.answers.export === "default";
	const isFunctionStyle = tps.answers.functionStyle === "function";
	const isArrowStyle = tps.answers.functionStyle === "arrow";
}}}
import React, { useEffect, useState } from 'react';
{{{? tps.answers.css}}}
import {{? tps.answers.cssExtension.startsWith("module.")}}styles from {{?}}'./{{= tps.name}}.{{= tps.answers.cssExtension}}';
{{{?}}}
{{{? tps.answers.typescript}}}

interface {{#def.propsInterfaceName}} {
	// props
}
{{{?}}}

{{{? isFunctionStyle }}}
{{#def.export}}function {{#def.componentName}}({}{{? tps.answers.typescript}}: {{#def.propsInterfaceName}}{{?}}) {
{{{??}}}
{{#def.export}}const {{#def.componentName}} = ({}{{? tps.answers.typescript}}: {{#def.propsInterfaceName}}{{?}}) => {
{{{?}}}
	return (
		<{{= tps.answers.component }}>
			{{#def.componentName}} component
		</{{= tps.answers.component }}>
	);
};
{{{? isDefaultExport && (!tps.answers.inlineDefaultExport || isArrowStyle) }}}

export default {{#def.componentName}};
{{{?}}}