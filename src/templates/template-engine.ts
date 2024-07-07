/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-escape */
/* eslint-disable no-new-func */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable func-names */
// Enspired by [doT](https://github.com/olado/doT)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _globals: any = {};

// current solution: ^[^\S\r\n]*\{ ... \}[^\S\r\n]*\n?
// current solution: {{{  }}}
// new front solution: (?:(?=.*?\n)[^\S\r\n]|$^) ?????
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doT: any = {
	name: 'doT',
	version: '1.1.1',
	templateSettings: {
		evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
		evaluateBlock: /^[^\S\r\n]*?\{\{\{([\s\S]+?(\}?)+)\}\}\}[^\S\r\n]*\n?/gm,
		interpolate: /\{\{=([\s\S]+?)\}\}/g,
		encode: /\{\{!([\s\S]+?)\}\}/g,
		use: /\{\{#([\s\S]+?)\}\}/g,
		useParams:
			/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
		define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
		defineBlock:
			/^[^\S\r\n]*?\{\{\{##\s*([\w\.$]+)\s*(\:|=)\n?([\s\S]+?)\n?#\}\}\}[^\S\r\n]*\n?/gm,
		defineParams: /^\s*([\w$]+):([\s\S]+)/,
		defineBlockParams: /^\s*([\w$]+):\n?([\s\S]+)/,
		conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
		conditionalBlock:
			/^[^\S\r\n]*?\{\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}\}[^\S\r\n]*\n?/gm,
		iterate:
			/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
		iterateBlock:
			/[^\S\r\n]*?\{\{\{~\s*(?:\}\}\}[^\S\r\n]*\n?|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\}\}[^\S\r\n]*\n?)/gm,
		varname: 'tps',
		strip: false,
		append: true,
		selfcontained: false,
		doNotSkipEncoded: false,
	},
	template: undefined,
	//   compile: undefined,
	log: true,
};

_globals.dot = doT;

doT.encodeHTMLSource = function (doNotSkipEncoded) {
	const encodeHTMLRules = {
		'&': '&#38;',
		'<': '&#60;',
		'>': '&#62;',
		'"': '&#34;',
		"'": '&#39;',
		'/': '&#47;',
	};
	const matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
	return function (code) {
		return code
			? code.toString().replace(matchHTML, (m) => {
					return encodeHTMLRules[m] || m;
				})
			: '';
	};
};

const startend = {
	append: { start: "'+(", end: ")+'", startencode: "'+encodeHTML(" },
	split: {
		start: "';out+=(",
		end: ");out+='",
		startencode: "';out+=encodeHTML(",
	},
};
const skip = /$^/;

function resolveDefs(c, block, def) {
	return (typeof block === 'string' ? block : block.toString())
		.replace(c.defineBlock || skip, (m, code, assign, value) => {
			if (code.indexOf('def.') === 0) {
				// eslint-disable-next-line no-param-reassign
				code = code.substring(4);
			}
			if (!(code in def)) {
				if (assign === ':') {
					if (c.defineBlockParams)
						value.replace(c.defineBlockParams, (m, param, v) => {
							def[code] = { arg: param, text: v };
						});
					if (!(code in def)) def[code] = value;
				} else {
					new Function('def', "def['" + code + "']=" + value)(def);
				}
			}
			return '';
		})
		.replace(c.define || skip, (m, code, assign, value) => {
			if (code.indexOf('def.') === 0) {
				// eslint-disable-next-line no-param-reassign
				code = code.substring(4);
			}
			if (!(code in def)) {
				if (assign === ':') {
					if (c.defineParams)
						value.replace(c.defineParams, (m, param, v) => {
							def[code] = { arg: param, text: v };
						});
					if (!(code in def)) def[code] = value;
				} else {
					new Function('def', "def['" + code + "']=" + value)(def);
				}
			}
			return '';
		})
		.replace(c.use || skip, (m, code) => {
			if (c.useParams)
				code = code.replace(c.useParams, (m, s, d, param) => {
					if (def[d] && def[d].arg && param) {
						const rw = (d + ':' + param).replace(/'|\\/g, '_');
						def.__exp = def.__exp || {};
						def.__exp[rw] = def[d].text.replace(
							new RegExp('(^|[^\\w$])' + def[d].arg + '([^\\w$])', 'g'),
							'$1' + param + '$2',
						);
						return s + "def.__exp['" + rw + "']";
					}
				});
			const v = new Function('def', 'return ' + code)(def);
			return v ? resolveDefs(c, v, def) : v;
		});
}

function unescape(code) {
	return code.replace(/\\('|\\)/g, '$1').replace(/[\r\t\n]/g, ' ');
}

doT.template = function (tmpl, c, def) {
	c = c || doT.templateSettings;
	const cse = c.append ? startend.append : startend.split;
	let needhtmlencode;
	let sid = 0;
	let indv;
	let str = c.use || c.define ? resolveDefs(c, tmpl, def || {}) : tmpl;

	str = (
		"var out='" +
		(c.strip
			? str
					.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, ' ')
					.replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, '')
			: str
		)
			.replace(/'|\\/g, '\\$&')
			.replace(c.interpolate || skip, (m, code) => {
				return cse.start + unescape(code) + cse.end;
			})
			.replace(c.encode || skip, (m, code) => {
				needhtmlencode = true;
				return cse.startencode + unescape(code) + cse.end;
			})
			.replace(c.conditionalBlock || skip, (m, elsecase, code) => {
				return elsecase
					? code
						? "';}else if(" + unescape(code) + "){out+='"
						: "';}else{out+='"
					: code
						? "';if(" + unescape(code) + "){out+='"
						: "';}out+='";
			})
			.replace(c.conditional || skip, (m, elsecase, code) => {
				return elsecase
					? code
						? "';}else if(" + unescape(code) + "){out+='"
						: "';}else{out+='"
					: code
						? "';if(" + unescape(code) + "){out+='"
						: "';}out+='";
			})
			.replace(c.iterateBlock || skip, (m, iterate, vname, iname) => {
				if (!iterate) return "';} } out+='";
				sid += 1;
				indv = iname || 'i' + sid;
				iterate = unescape(iterate);
				return (
					"';var arr" +
					sid +
					'=' +
					iterate +
					';if(arr' +
					sid +
					'){var ' +
					vname +
					',' +
					indv +
					'=-1,l' +
					sid +
					'=arr' +
					sid +
					'.length-1;while(' +
					indv +
					'<l' +
					sid +
					'){' +
					vname +
					'=arr' +
					sid +
					'[' +
					indv +
					"+=1];out+='"
				);
			})
			.replace(c.iterate || skip, (m, iterate, vname, iname) => {
				if (!iterate) return "';} } out+='";
				sid += 1;
				indv = iname || 'i' + sid;
				iterate = unescape(iterate);
				return (
					"';var arr" +
					sid +
					'=' +
					iterate +
					';if(arr' +
					sid +
					'){var ' +
					vname +
					',' +
					indv +
					'=-1,l' +
					sid +
					'=arr' +
					sid +
					'.length-1;while(' +
					indv +
					'<l' +
					sid +
					'){' +
					vname +
					'=arr' +
					sid +
					'[' +
					indv +
					"+=1];out+='"
				);
			})
			.replace(c.evaluateBlock || skip, (m, code) => {
				return "';" + unescape(code) + "out+='";
			})
			.replace(c.evaluate || skip, (m, code) => {
				return "';" + unescape(code) + "out+='";
			}) +
		"';return out;"
	)
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/(\s|;|\}|^|\{)out\+='';/g, '$1')
		.replace(/\+''/g, '');
	// eslint-disable-next-line spaced-comment
	//.replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

	if (needhtmlencode) {
		if (!c.selfcontained && _globals && !_globals._encodeHTML) {
			_globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
		}

		str =
			"var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" +
			doT.encodeHTMLSource.toString() +
			'(' +
			(c.doNotSkipEncoded || '') +
			'));' +
			str;
	}
	try {
		return new Function(c.varname, str);
	} catch (e) {
		/* istanbul ignore else */
		if (typeof console !== 'undefined')
			console.log('Could not create a template function: ' + str);
		throw e;
	}
};

doT.compile = function (tmpl, def) {
	return doT.template(tmpl, null, def);
};

export default doT;
