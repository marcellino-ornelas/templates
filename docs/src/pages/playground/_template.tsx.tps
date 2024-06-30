import React, { useEffect, useState } from 'react';
{{{? tps.answers.css}}}
import {{? tps.answers.cssType.startsWith("module.")}}styles from {{?}}"./{{= tps.name}}.{{= tps.answers.cssType}}";
{{{?}}}
{{{? tps.answers.typescript}}}

interface Props {
	// props
}
{{{?}}}

export const {{= tps.utils.pascalCase(tps.name)}} = ({}{{? tps.answers.typescript}}: Props{{?}}) => {
	return (
		<div>
			{/* ... */}
		</div>
	);
};
