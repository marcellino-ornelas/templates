{{{
	const isDefaultExport = tps.answers.export === "default";
	const isFunctionStyle = tps.answers.functionStyle === "function";
}}}
import React, { useEffect, useState } from 'react';
{{{? tps.answers.css}}}
import {{? tps.answers.cssExtension.startsWith("module.")}}styles from {{?}}'./{{= tps.name}}.{{= tps.answers.cssExtension}}';
{{{?}}}
{{{? tps.answers.typescript}}}

interface Props {
	// props
}
{{{?}}}

{{{? isFunctionStyle }}}
{{#def.export}}function {{#def.componentName}}({}{{? tps.answers.typescript}}: Props{{?}}) {
{{{??}}}
{{#def.export}}const {{#def.componentName}} = ({}{{? tps.answers.typescript}}: Props{{?}}) => {
{{{?}}}
	return (
		<{{= tps.answers.component }}>
			{{#def.componentName}} component
		</{{= tps.answers.component }}>
	);
};
{{{? isDefaultExport && !tps.answers.inlineDefaultExport }}}

export default {{#def.componentName}};
{{{?}}}