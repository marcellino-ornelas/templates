(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[7986],{641:(e,t,n)=>{"use strict";n.d(t,{c:()=>d});var a=n(96540),r=n(41919),i=n.n(r),o=n(63221),l=n(762);const s="template_i7AN",u="noResult_yKxs",c="result_zWjO",p="noTemplate_JA2s";i().templateSettings.strip=!1,i().templateSettings.varname="tps";const d=e=>{let{templateName:t="Dot Template",resultName:n="Result",children:r,tps:i={},defs:d={},result:f=!0,displayTemplate:m=!0,templateMeta:g="",resultMeta:b="",lang:y="text"}=e;const v=r.props.children.props.children,h=(0,l.n)({templateString:v,tps:i,defs:d}),w=[s],S=[c];return m||S.push(p),f||w.push(u),a.createElement("div",null,m&&a.createElement(o.A,{className:w.join(" "),showLineNumbers:!0,title:t,language:y,metastring:g},v),f&&a.createElement(o.A,{title:n,className:S.join(" "),showLineNumbers:!0,language:y,metastring:b},`${h}`))}},19365:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var a=n(96540),r=n(20053);const i={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.A)(i.tabItem,o),hidden:n},t)}},11470:(e,t,n)=>{"use strict";n.d(t,{A:()=>S});var a=n(58168),r=n(96540),i=n(20053),o=n(23104),l=n(56347),s=n(57485),u=n(31682),c=n(89466);function p(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function f(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const a=(0,l.W6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s.aZ)(i),(0,r.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(a.location.search);t.set(i,e),a.replace({...a.location,search:t.toString()})}),[i,a])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,i=d(e),[o,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!f({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:i}))),[s,u]=m({queryString:n,groupId:a}),[p,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,i]=(0,c.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:a}),b=(()=>{const e=s??p;return f({value:e,tabValues:i})?e:null})();(0,r.useLayoutEffect)((()=>{b&&l(b)}),[b]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!f({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),g(e)}),[u,g,i]),tabValues:i}}var b=n(92303);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){let{className:t,block:n,selectedValue:l,selectValue:s,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,o.a_)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),a=u[n].value;a!==l&&(p(t),s(a))},f=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.A)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>c.push(e),onKeyDown:f,onClick:d},o,{className:(0,i.A)("tabs__item",y.tabItem,o?.className,{"tabs__item--active":l===t})}),n??t)})))}function h(e){let{lazy:t,children:n,selectedValue:a}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function w(e){const t=g(e);return r.createElement("div",{className:(0,i.A)("tabs-container",y.tabList)},r.createElement(v,(0,a.A)({},e,t)),r.createElement(h,(0,a.A)({},e,t)))}function S(e){const t=(0,b.A)();return r.createElement(w,(0,a.A)({key:String(t)},e))}},762:(e,t,n)=>{"use strict";n.d(t,{n:()=>l});var a=n(96540),r=n(7291),i=n(5565);r.A.templateSettings.strip=!1,r.A.templateSettings.varname="tps";const o={name:"App",answers:{},utils:i,u:i,a:{}},l=e=>{let{templateString:t,tps:n={},defs:i={}}=e;const[l,s]=(0,a.useState)(null);return(0,a.useEffect)((()=>{let e;try{const a=r.A.template(t,null,i);console.log({...o,a:n.answers,...n}),e=a({...o,a:n.answers,...n})}catch(a){e=`Error: ${a.message}`}s(e)}),[t,n]),l}},51433:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var a=n(96540);const r={name:"App",utils:n(5565)},i={React:a,...a,tps:r}},7291:(e,t)=>{"use strict";var n={},a={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,evaluateBlock:/^[^\S\r\n]*?\{\{\{([\s\S]+?(\}?)+)\}\}\}[^\S\r\n]*\n?/gm,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineBlock:/^[^\S\r\n]*?\{\{\{##\s*([\w\.$]+)\s*(\:|=)\n?([\s\S]+?)\n?#\}\}\}[^\S\r\n]*\n?/gm,defineParams:/^\s*([\w$]+):([\s\S]+)/,defineBlockParams:/^\s*([\w$]+):\n?([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,conditionalBlock:/^[^\S\r\n]*?\{\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}\}[^\S\r\n]*\n?/gm,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,iterateBlock:/[^\S\r\n]*?\{\{\{~\s*(?:\}\}\}[^\S\r\n]*\n?|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\}\}[^\S\r\n]*\n?)/gm,varname:"tps",strip:!1,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,log:!0};n.dot=a,a.encodeHTMLSource=function(e){var t={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},n=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(n,(function(e){return t[e]||e})):""}};var r={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},i=/$^/;function o(e,t,n){return("string"==typeof t?t:t.toString()).replace(e.defineBlock||i,(function(t,a,r,i){return 0===a.indexOf("def.")&&(a=a.substring(4)),a in n||(":"===r?(e.defineBlockParams&&i.replace(e.defineBlockParams,(function(e,t,r){n[a]={arg:t,text:r}})),a in n||(n[a]=i)):new Function("def","def['"+a+"']="+i)(n)),""})).replace(e.define||i,(function(t,a,r,i){return 0===a.indexOf("def.")&&(a=a.substring(4)),a in n||(":"===r?(e.defineParams&&i.replace(e.defineParams,(function(e,t,r){n[a]={arg:t,text:r}})),a in n||(n[a]=i)):new Function("def","def['"+a+"']="+i)(n)),""})).replace(e.use||i,(function(t,a){e.useParams&&(a=a.replace(e.useParams,(function(e,t,a,r){if(n[a]&&n[a].arg&&r){var i=(a+":"+r).replace(/'|\\/g,"_");return n.__exp=n.__exp||{},n.__exp[i]=n[a].text.replace(new RegExp("(^|[^\\w$])"+n[a].arg+"([^\\w$])","g"),"$1"+r+"$2"),t+"def.__exp['"+i+"']"}})));var r=new Function("def","return "+a)(n);return r?o(e,r,n):r}))}function l(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}a.template=function(e,t,s){var u,c,p=(t=t||a.templateSettings).append?r.append:r.split,d=0,f=t.use||t.define?o(t,e,s||{}):e;f=("var out='"+(t.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(t.interpolate||i,(function(e,t){return p.start+l(t)+p.end})).replace(t.encode||i,(function(e,t){return u=!0,p.startencode+l(t)+p.end})).replace(t.conditionalBlock||i,(function(e,t,n){return t?n?"';}else if("+l(n)+"){out+='":"';}else{out+='":n?"';if("+l(n)+"){out+='":"';}out+='"})).replace(t.conditional||i,(function(e,t,n){return t?n?"';}else if("+l(n)+"){out+='":"';}else{out+='":n?"';if("+l(n)+"){out+='":"';}out+='"})).replace(t.iterateBlock||i,(function(e,t,n,a){return t?(d+=1,c=a||"i"+d,t=l(t),"';var arr"+d+"="+t+";if(arr"+d+"){var "+n+","+c+"=-1,l"+d+"=arr"+d+".length-1;while("+c+"<l"+d+"){"+n+"=arr"+d+"["+c+"+=1];out+='"):"';} } out+='"})).replace(t.iterate||i,(function(e,t,n,a){return t?(d+=1,c=a||"i"+d,t=l(t),"';var arr"+d+"="+t+";if(arr"+d+"){var "+n+","+c+"=-1,l"+d+"=arr"+d+".length-1;while("+c+"<l"+d+"){"+n+"=arr"+d+"["+c+"+=1];out+='"):"';} } out+='"})).replace(t.evaluateBlock||i,(function(e,t){return"';"+l(t)+"out+='"})).replace(t.evaluate||i,(function(e,t){return"';"+l(t)+"out+='"}))+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),u&&(t.selfcontained||!n||n._encodeHTML||(n._encodeHTML=a.encodeHTMLSource(t.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+a.encodeHTMLSource.toString()+"("+(t.doNotSkipEncoded||"")+"));"+f);try{return new Function(t.varname,f)}catch(m){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),m}},a.compile=function(e,t){return a.template(e,null,t)},t.A=a},5565:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.transform=t.ordinalize=t.foreignKey=t.classify=t.tableize=t.demodulize=t.titleize=t.dasherize=t.capitalize=t.humanize=t.underscore=t.camelize=t.inflect=t.singularize=t.pluralize=t.snakeCase=t.sentenceCase=t.pathCase=t.pascalCase=t.paramCase=t.noCase=t.headerCase=t.dotCase=t.constantCase=t.capitalCase=t.camelCase=void 0;var a=n(89605);Object.defineProperty(t,"camelCase",{enumerable:!0,get:function(){return a.camelCase}}),Object.defineProperty(t,"capitalCase",{enumerable:!0,get:function(){return a.capitalCase}}),Object.defineProperty(t,"constantCase",{enumerable:!0,get:function(){return a.constantCase}}),Object.defineProperty(t,"dotCase",{enumerable:!0,get:function(){return a.dotCase}}),Object.defineProperty(t,"headerCase",{enumerable:!0,get:function(){return a.headerCase}}),Object.defineProperty(t,"noCase",{enumerable:!0,get:function(){return a.noCase}}),Object.defineProperty(t,"paramCase",{enumerable:!0,get:function(){return a.paramCase}}),Object.defineProperty(t,"pascalCase",{enumerable:!0,get:function(){return a.pascalCase}}),Object.defineProperty(t,"pathCase",{enumerable:!0,get:function(){return a.pathCase}}),Object.defineProperty(t,"sentenceCase",{enumerable:!0,get:function(){return a.sentenceCase}}),Object.defineProperty(t,"snakeCase",{enumerable:!0,get:function(){return a.snakeCase}});var r=n(93471);Object.defineProperty(t,"pluralize",{enumerable:!0,get:function(){return r.pluralize}}),Object.defineProperty(t,"singularize",{enumerable:!0,get:function(){return r.singularize}}),Object.defineProperty(t,"inflect",{enumerable:!0,get:function(){return r.inflect}}),Object.defineProperty(t,"camelize",{enumerable:!0,get:function(){return r.camelize}}),Object.defineProperty(t,"underscore",{enumerable:!0,get:function(){return r.underscore}}),Object.defineProperty(t,"humanize",{enumerable:!0,get:function(){return r.humanize}}),Object.defineProperty(t,"capitalize",{enumerable:!0,get:function(){return r.capitalize}}),Object.defineProperty(t,"dasherize",{enumerable:!0,get:function(){return r.dasherize}}),Object.defineProperty(t,"titleize",{enumerable:!0,get:function(){return r.titleize}}),Object.defineProperty(t,"demodulize",{enumerable:!0,get:function(){return r.demodulize}}),Object.defineProperty(t,"tableize",{enumerable:!0,get:function(){return r.tableize}}),Object.defineProperty(t,"classify",{enumerable:!0,get:function(){return r.classify}}),Object.defineProperty(t,"foreignKey",{enumerable:!0,get:function(){return r.foreignKey}}),Object.defineProperty(t,"ordinalize",{enumerable:!0,get:function(){return r.ordinalize}}),Object.defineProperty(t,"transform",{enumerable:!0,get:function(){return r.transform}})},29477:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>u,default:()=>g,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var a=n(58168),r=(n(96540),n(15680)),i=n(641),o=n(11470),l=n(19365);const s={pagination_next:"api/template-engine/conditionals",pagination_prev:"api/template-engine/evaluation",sidebar_position:2},u="Interpolation",c={unversionedId:"api/template-engine/interpolation",id:"api/template-engine/interpolation",title:"Interpolation",description:"Usage",source:"@site/docs/api/template-engine/interpolation.mdx",sourceDirName:"api/template-engine",slug:"/api/template-engine/interpolation",permalink:"/templates/docs/api/template-engine/interpolation",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/template-engine/interpolation.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{pagination_next:"api/template-engine/conditionals",pagination_prev:"api/template-engine/evaluation",sidebar_position:2},sidebar:"api",previous:{title:"Evaluation",permalink:"/templates/docs/api/template-engine/evaluation"},next:{title:"Conditionals",permalink:"/templates/docs/api/template-engine/conditionals"}},p={},d=[{value:"Usage",id:"usage",level:2},{value:"Examples",id:"examples",level:2},{value:"Displaying content",id:"displaying-content",level:3},{value:"Displaying complex expression",id:"displaying-complex-expression",level:3},{value:"Instance file using template data",id:"instance-file-using-template-data",level:3}],f={toc:d},m="wrapper";function g(e){let{components:t,...n}=e;return(0,r.yg)(m,(0,a.A)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"interpolation"},"Interpolation"),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)(o.A,{mdxType:"Tabs"},(0,r.yg)(l.A,{value:"inline",label:"Inline",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},"{{= <expression> }}\n")))),(0,r.yg)("h2",{id:"examples"},"Examples"),(0,r.yg)("h3",{id:"displaying-content"},"Displaying content"),(0,r.yg)(o.A,{mdxType:"Tabs"},(0,r.yg)(l.A,{value:"inline",label:"Inline",mdxType:"TabItem"},(0,r.yg)(i.c,{lang:"tsx",templateMeta:"{4}",mdxType:"Dot"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},'{{{\n    const name = "marcellino ornelas";\n}}}\n{{= name}}\n'))))),(0,r.yg)("h3",{id:"displaying-complex-expression"},"Displaying complex expression"),(0,r.yg)("p",null,"Any valid javascript expression can be used in between the brackets."),(0,r.yg)(o.A,{mdxType:"Tabs"},(0,r.yg)(l.A,{value:"inline",label:"Inline",mdxType:"TabItem"},(0,r.yg)(i.c,{lang:"tsx",templateMeta:"{4}",mdxType:"Dot"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},'{{{\n    const name = "marcellino ornelas";\n}}}\n{{= name.startsWith("m") ? `${name[0].toUpperCase()}${name.slice(1)}` : name }}\n'))))),(0,r.yg)("h3",{id:"instance-file-using-template-data"},"Instance file using template data"),(0,r.yg)("p",null,"You can render data passed into templates into your instances files which then\ncan be used in the instance file itself."),(0,r.yg)("p",null,"Instance files can take advantage of using template data by rendering the data\nin a language compatible way."),(0,r.yg)(o.A,{mdxType:"Tabs"},(0,r.yg)(l.A,{value:"inline",label:"Inline",mdxType:"TabItem"},(0,r.yg)("p",null,"Take this template that is rendering different types of data types into a ",(0,r.yg)("inlineCode",{parentName:"p"},".js"),"\nfile. After a instance is created, we can then invoke the js file and it will\nproduce results that were defined in the template."),(0,r.yg)(i.c,{lang:"tsx",mdxType:"Dot"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-text"},'{{{\n    const name = "Marcellino ornelas";\n    const age = 24;\n    const userInfo = {\n        name,\n        age,\n    };\n    const users = [userInfo];\n}}}\n{{{/* Strings should be wrapped in qoutes of choice */}}}\nconst name = "{{= name}}";\n{{{/* Numbers can be rendered to the output */}}}\nconst age = {{= age}};\n{{{\n    /**\n     * You can use JSON.stringify to display objects or arrays\n     * or you can build your own custom function to do something similar\n     */\n}}}\nconst userInfo = {{= JSON.stringify(userInfo, undefined, 2)}};\nconst users = {{= JSON.stringify(users, undefined, 2)}};\n\nconsole.log(name, age, userInfo, users);\n'))),(0,r.yg)("p",null,"Invoking this file with ",(0,r.yg)("inlineCode",{parentName:"p"},"node")," will now produce the following:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"> node path/to/file.js\nMarcellino ornelas 24 { name: 'Marcellino ornelas', age: 24 } [ { name: 'Marcellino ornelas', age: 24 } ]\n")))))}g.isMDXComponent=!0},41919:(e,t,n)=>{var a;!function(){"use strict";var r,i={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};i.encodeHTMLSource=function(e){var t={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},n=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(n,(function(e){return t[e]||e})):""}},r=function(){return this||(0,eval)("this")}(),e.exports?e.exports=i:void 0===(a=function(){return i}.call(t,n,t,e))||(e.exports=a);var o={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},l=/$^/;function s(e,t,n){return("string"==typeof t?t:t.toString()).replace(e.define||l,(function(t,a,r,i){return 0===a.indexOf("def.")&&(a=a.substring(4)),a in n||(":"===r?(e.defineParams&&i.replace(e.defineParams,(function(e,t,r){n[a]={arg:t,text:r}})),a in n||(n[a]=i)):new Function("def","def['"+a+"']="+i)(n)),""})).replace(e.use||l,(function(t,a){e.useParams&&(a=a.replace(e.useParams,(function(e,t,a,r){if(n[a]&&n[a].arg&&r){var i=(a+":"+r).replace(/'|\\/g,"_");return n.__exp=n.__exp||{},n.__exp[i]=n[a].text.replace(new RegExp("(^|[^\\w$])"+n[a].arg+"([^\\w$])","g"),"$1"+r+"$2"),t+"def.__exp['"+i+"']"}})));var r=new Function("def","return "+a)(n);return r?s(e,r,n):r}))}function u(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}i.template=function(e,t,n){var a,c,p=(t=t||i.templateSettings).append?o.append:o.split,d=0,f=t.use||t.define?s(t,e,n||{}):e;f=("var out='"+(t.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(t.interpolate||l,(function(e,t){return p.start+u(t)+p.end})).replace(t.encode||l,(function(e,t){return a=!0,p.startencode+u(t)+p.end})).replace(t.conditional||l,(function(e,t,n){return t?n?"';}else if("+u(n)+"){out+='":"';}else{out+='":n?"';if("+u(n)+"){out+='":"';}out+='"})).replace(t.iterate||l,(function(e,t,n,a){return t?(d+=1,c=a||"i"+d,t=u(t),"';var arr"+d+"="+t+";if(arr"+d+"){var "+n+","+c+"=-1,l"+d+"=arr"+d+".length-1;while("+c+"<l"+d+"){"+n+"=arr"+d+"["+c+"+=1];out+='"):"';} } out+='"})).replace(t.evaluate||l,(function(e,t){return"';"+u(t)+"out+='"}))+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),a&&(t.selfcontained||!r||r._encodeHTML||(r._encodeHTML=i.encodeHTMLSource(t.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+i.encodeHTMLSource.toString()+"("+(t.doNotSkipEncoded||"")+"));"+f);try{return new Function(t.varname,f)}catch(m){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),m}},i.compile=function(e,t){return i.template(e,null,t)}}()}}]);