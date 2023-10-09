"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[5828],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,f=m["".concat(i,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(f,s(s({ref:t},c),{},{components:n})):r.createElement(f,s({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[m]="string"==typeof e?e:a,s[1]=l;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6539:(e,t,n)=>{n.d(t,{e:()=>o});var r=n(7294),a=n(4673);const o=e=>{let{children:t,open:n=!1,title:o=""}=e;const s=o?`Example: ${o}`:"Example";return r.createElement(a.Z,{summary:s,open:n},r.createElement("div",null,t))}},4673:(e,t,n)=>{n.d(t,{Z:()=>f});var r=n(7462),a=n(7294),o=n(6010),s=n(2389),l=n(6043);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function p(e){return!!e&&("SUMMARY"===e.tagName||p(e.parentElement))}function c(e,t){return!!e&&(e===t||c(e.parentElement,t))}function m(e){let{summary:t,children:n,...m}=e;const u=(0,s.Z)(),d=(0,a.useRef)(null),{collapsed:f,setCollapsed:g}=(0,l.u)({initialState:!m.open}),[y,b]=(0,a.useState)(m.open),v=a.isValidElement(t)?t:a.createElement("summary",null,t??"Details");return a.createElement("details",(0,r.Z)({},m,{ref:d,open:y,"data-collapsed":f,className:(0,o.Z)(i.details,u&&i.isBrowser,m.className),onMouseDown:e=>{p(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;p(t)&&c(t,d.current)&&(e.preventDefault(),f?(g(!1),b(!0)):g(!0))}}),v,a.createElement(l.z,{lazy:!1,collapsed:f,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),b(!e)}},a.createElement("div",{className:i.collapsibleContent},n)))}const u={details:"details_b_Ee"},d="alert alert--info";function f(e){let{...t}=e;return a.createElement(m,(0,r.Z)({},t,{className:(0,o.Z)(d,u.details,t.className)}))}},88:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var r=n(7462),a=(n(7294),n(3905)),o=n(6539);const s={},l="Settings File",i={unversionedId:"api/settings/index",id:"api/settings/index",title:"Settings File",description:"Opts",source:"@site/docs/api/settings/index.mdx",sourceDirName:"api/settings",slug:"/api/settings/",permalink:"/templates/docs/api/settings/",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/settings/index.mdx",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Template Configuration",permalink:"/templates/docs/api/tpsrc/template"},next:{title:"Prompt configuration",permalink:"/templates/docs/api/settings/prompt"}},p={},c=[{value:"Opts",id:"opts",level:2},{value:"Prompts",id:"prompts",level:2}],m={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"settings-file"},"Settings File"),(0,a.kt)("h2",{id:"opts"},"Opts"),(0,a.kt)("span",{className:"badge badge--secondary margin-left--xs margin-bottom--lg"},"templates@v1.0.21"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"TemplateOptions;\n")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"template#options"},"Template Options"),". Useful when you want to change the\nbehavior of templates for all users."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Users can override template options by passing options to the command line or\n",(0,a.kt)("a",{parentName:"p",href:"./tpsrc"},(0,a.kt)("inlineCode",{parentName:"a"},".tps/.tpsrc"))," file")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n    "opts": {\n        /* ... template options */\n    }\n}\n')),(0,a.kt)(o.e,{mdxType:"Example"},(0,a.kt)("p",null,"If you want your template to not create a new folder by default then you can add\nthe following to your ",(0,a.kt)("inlineCode",{parentName:"p"},"settings.json")," file"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n    "opts": {\n        "newFolder": true\n    }\n}\n'))),(0,a.kt)("h2",{id:"prompts"},"Prompts"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"Prompt[];\n")),(0,a.kt)("p",null,"Prompts for your template."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n    "prompts": [\n        {\n            "name": "age",\n            "message": "How old are you?",\n            "type": "input",\n            "tpsType": "data"\n        }\n    ]\n}\n')),(0,a.kt)("p",null,"see ",(0,a.kt)("a",{parentName:"p",href:"./settings/prompt"},"Prompt API")," for prompt options"))}d.isMDXComponent=!0}}]);