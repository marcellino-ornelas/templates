"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[751],{15680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>d});var r=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(n),g=a,d=m["".concat(i,".").concat(g)]||m[g]||u[g]||l;return n?r.createElement(d,s(s({ref:t},c),{},{components:n})):r.createElement(d,s({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,s=new Array(l);s[0]=g;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[m]="string"==typeof e?e:a,s[1]=o;for(var p=2;p<l;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},83167:(e,t,n)=>{n.d(t,{R:()=>l});var r=n(96540),a=n(41622);const l=e=>{let{children:t,open:n=!1,title:l=""}=e;const s=l?`Example: ${l}`:"Example";return r.createElement(a.A,{summary:s,open:n},r.createElement("div",null,t))}},41622:(e,t,n)=>{n.d(t,{A:()=>d});var r=n(58168),a=n(96540),l=n(20053),s=n(92303),o=n(41422);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function p(e){return!!e&&("SUMMARY"===e.tagName||p(e.parentElement))}function c(e,t){return!!e&&(e===t||c(e.parentElement,t))}function m(e){let{summary:t,children:n,...m}=e;const u=(0,s.A)(),g=(0,a.useRef)(null),{collapsed:d,setCollapsed:y}=(0,o.u)({initialState:!m.open}),[f,h]=(0,a.useState)(m.open),v=a.isValidElement(t)?t:a.createElement("summary",null,t??"Details");return a.createElement("details",(0,r.A)({},m,{ref:g,open:f,"data-collapsed":d,className:(0,l.A)(i.details,u&&i.isBrowser,m.className),onMouseDown:e=>{p(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;p(t)&&c(t,g.current)&&(e.preventDefault(),d?(y(!1),h(!0)):y(!0))}}),v,a.createElement(o.N,{lazy:!1,collapsed:d,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{y(e),h(!e)}},a.createElement("div",{className:i.collapsibleContent},n)))}const u={details:"details_b_Ee"},g="alert alert--info";function d(e){let{...t}=e;return a.createElement(m,(0,r.A)({},t,{className:(0,l.A)(g,u.details,t.className)}))}},30280:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var r=n(58168),a=(n(96540),n(15680)),l=n(83167);const s={},o="Template Configuration",i={unversionedId:"api/tpsrc/template",id:"api/tpsrc/template",title:"Template Configuration",description:"Answers",source:"@site/docs/api/tpsrc/template.mdx",sourceDirName:"api/tpsrc",slug:"/api/tpsrc/template",permalink:"/templates/docs/api/tpsrc/template",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/tpsrc/template.mdx",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Templates Configuration",permalink:"/templates/docs/api/tpsrc/"},next:{title:"Settings File",permalink:"/templates/docs/api/settings/"}},p={},c=[{value:"Answers",id:"answers",level:2},{value:"Options",id:"options",level:2}],m={toc:c},u="wrapper";function g(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"template-configuration"},"Template Configuration"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"interface TemplateConfig {\n    answers: TemplateConfigAnswers;\n    opts: TemplateConfigOptions;\n}\n")),(0,a.yg)("h2",{id:"answers"},"Answers"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"interface TemplateConfigAnswers {\n    [name: string]: any;\n}\n")),(0,a.yg)("p",null,"Object containing answers to prompts."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "some-template": {\n        // highlight-start\n        "answers": {\n            "<prompt-name>": "<prompt-value>"\n        }\n        // highlight-end\n    }\n}\n')),(0,a.yg)(l.R,{mdxType:"Example"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "react-component": {\n        // highlight-start\n        "answers": {\n            "css": true\n        }\n        // highlight-end\n    }\n}\n'))),(0,a.yg)("h2",{id:"options"},"Options"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"interface TemplateConfigOptions {\n    [name: string]: any;\n}\n")),(0,a.yg)("p",null,"Object containing options for templates. See\n",(0,a.yg)("a",{parentName:"p",href:"../template#options"},"Template Option API")," for template options."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "some-template": {\n        // highlight-start\n        "opts": {\n            "<option-name>": "<option-value>"\n        }\n        // highlight-end\n    }\n}\n')),(0,a.yg)(l.R,{mdxType:"Example"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "react-component": {\n        // highlight-start\n        "opts": {\n            "wipe": true\n        }\n        // highlight-end\n    }\n}\n'))))}g.isMDXComponent=!0}}]);