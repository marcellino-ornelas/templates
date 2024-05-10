import React from 'react';
import * as utils from '../../../../src/templates/utils';

// /templates/utils';

const tps = {
	name: 'App',
	utils,
};

// Add react-live imports you need here
const ReactLiveScope = {
	React,
	...React,
	tps,
};
export default ReactLiveScope;
