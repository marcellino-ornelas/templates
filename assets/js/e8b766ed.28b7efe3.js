"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[4800],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,f=u["".concat(s,".").concat(d)]||u[d]||m[d]||o;return n?a.createElement(f,l(l({ref:t},c),{},{components:n})):a.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:r,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6539:(e,t,n)=>{n.d(t,{e:()=>o});var a=n(7294),r=n(4673);const o=e=>{let{children:t,open:n=!1,title:o=""}=e;const l=o?`Example: ${o}`:"Example";return a.createElement(r.Z,{summary:l,open:n},a.createElement("div",null,t))}},4673:(e,t,n)=>{n.d(t,{Z:()=>f});var a=n(7462),r=n(7294),o=n(6010),l=n(2389),i=n(6043);const s={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function p(e){return!!e&&("SUMMARY"===e.tagName||p(e.parentElement))}function c(e,t){return!!e&&(e===t||c(e.parentElement,t))}function u(e){let{summary:t,children:n,...u}=e;const m=(0,l.Z)(),d=(0,r.useRef)(null),{collapsed:f,setCollapsed:g}=(0,i.u)({initialState:!u.open}),[h,b]=(0,r.useState)(u.open),k=r.isValidElement(t)?t:r.createElement("summary",null,t??"Details");return r.createElement("details",(0,a.Z)({},u,{ref:d,open:h,"data-collapsed":f,className:(0,o.Z)(s.details,m&&s.isBrowser,u.className),onMouseDown:e=>{p(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;p(t)&&c(t,d.current)&&(e.preventDefault(),f?(g(!1),b(!0)):g(!0))}}),k,r.createElement(i.z,{lazy:!1,collapsed:f,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),b(!e)}},r.createElement("div",{className:s.collapsibleContent},n)))}const m={details:"details_b_Ee"},d="alert alert--info";function f(e){let{...t}=e;return r.createElement(u,(0,a.Z)({},t,{className:(0,o.Z)(d,m.details,t.className)}))}},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),r=n(6010);const o={tabItem:"tabItem_Ymn6"};function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o.tabItem,l),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>w});var a=n(7462),r=n(7294),o=n(6010),l=n(2466),i=n(6550),s=n(1980),p=n(7392),c=n(12);function u(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function m(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??u(n);return function(e){const t=(0,p.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,i.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=m(e),[l,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[s,p]=f({queryString:n,groupId:a}),[u,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),h=(()=>{const e=s??u;return d({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{h&&i(h)}),[h]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),p(e),g(e)}),[p,g,o]),tabValues:o}}var h=n(2389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){let{className:t,block:n,selectedValue:i,selectValue:s,tabValues:p}=e;const c=[],{blockElementScrollPositionUntilNextRender:u}=(0,l.o5)(),m=e=>{const t=e.currentTarget,n=c.indexOf(t),a=p[n].value;a!==i&&(u(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},p.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:m},l,{className:(0,o.Z)("tabs__item",b.tabItem,l?.className,{"tabs__item--active":i===t})}),n??t)})))}function y(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function v(e){const t=g(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",b.tabList)},r.createElement(k,(0,a.Z)({},e,t)),r.createElement(y,(0,a.Z)({},e,t)))}function w(e){const t=(0,h.Z)();return r.createElement(v,(0,a.Z)({key:String(t)},e))}},9007:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var a=n(7462),r=(n(7294),n(3905)),o=n(6539);n(4866),n(5162);const l={sidebar_label:"Configure"},i="Configure Templates",s={unversionedId:"main/tpsrc",id:"main/tpsrc",title:"Configure Templates",description:"Initializing Repo with Templates",source:"@site/docs/main/tpsrc.mdx",sourceDirName:"main",slug:"/main/tpsrc",permalink:"/templates/docs/main/tpsrc",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/tpsrc.mdx",tags:[],version:"current",frontMatter:{sidebar_label:"Configure"},sidebar:"docs",previous:{title:"Prompting",permalink:"/templates/docs/main/create-new-template/prompts"}},p={},c=[{value:"Initializing Repo with Templates",id:"initializing-repo-with-templates",level:2},{value:"Configuring a Template",id:"configuring-a-template",level:2},{value:"Answering Templates Prompts",id:"answering-templates-prompts",level:3},{value:"Configuring Templates",id:"configuring-templates",level:3},{value:"Make a Global Configuration File",id:"make-a-global-configuration-file",level:2}],u={toc:c},m="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"configure-templates"},"Configure Templates"),(0,r.kt)("h2",{id:"initializing-repo-with-templates"},"Initializing Repo with Templates"),(0,r.kt)("p",null,"Before delving into custom components or configuring template behavior, the\ninitial step is to Initialize your repository with templates. This\nstraightforward process will generate a .tps folder containing a .tpsrc file,\nlocated within your current working directory."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,r.kt)("p",null,"Produces:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - <cwd>\n    | - .tps/\n        | - .tpsrc\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},".tps")," folder also serves as the designated location for your custom\ntemplates. For further insights into creating custom templates, refer to our\ndetailed documentation on ",(0,r.kt)("a",{parentName:"p",href:"./create-new-template/"},"creating a new template"),"."),(0,r.kt)("p",null,"Furthermore, keep on reading these docs to gain in-depth knowledge about the\n",(0,r.kt)("inlineCode",{parentName:"p"},".tpsrc")," file."),(0,r.kt)("h2",{id:"configuring-a-template"},"Configuring a Template"),(0,r.kt)("p",null,"Tps offers a json configuration file that caters specifically to users of your\ntemplate, as opposed to the ",(0,r.kt)("a",{parentName:"p",href:"./create-new-template/settings"},"settings file"),"\nwhich is intended for template development. The configuration file is named\n",(0,r.kt)("inlineCode",{parentName:"p"},".tpsrc")," and it allows you to define predefined configurations for each\ntemplate, altering tps behavior during rendering. With the ability to have\nmultiple template configurations within this file, users gain greater control\nand flexibility when utilizing your template. This file needs to be in a ",(0,r.kt)("inlineCode",{parentName:"p"},".tps"),"\nfolder in the root of your repo."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "<template-name>": {}\n}\n')),(0,r.kt)("p",null,"When adding configurations for template replace the ",(0,r.kt)("inlineCode",{parentName:"p"},"<template-name>")," to be the\nname of your template. This property will hold all configurations for that\ntemplate."),(0,r.kt)(o.e,{mdxType:"Example"},(0,r.kt)("p",null,"Say we had a template named ",(0,r.kt)("inlineCode",{parentName:"p"},"react-component"),". Now to add configurations to this\ntemplate I would put the following inside of my tpsrc file"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    /* react-component template specific configs */\n  }\n}\n'))),(0,r.kt)("p",null,"Like mentioned before, you can add multiple template configurations"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "<template-name-1>": {},\n  "<template-name-2>": {}\n}\n')),(0,r.kt)(o.e,{mdxType:"Example"},(0,r.kt)("p",null,"Say we had two templates ",(0,r.kt)("inlineCode",{parentName:"p"},"react-component")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"express-app-route")," and wanted to\nalso add configurations then the tpsrc files would look something like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    /* react-component template specific configs */\n  },\n  "express-app-route": {\n    /* express-app-route template specific configs */\n  }\n}\n'))),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"To find all the available properties you can use in the configuration file,\ncheck out the ",(0,r.kt)("a",{parentName:"p",href:"../api/tpsrc"},"tpsrc API"))),(0,r.kt)("h3",{id:"answering-templates-prompts"},"Answering Templates Prompts"),(0,r.kt)("p",null,"You have the option to define pre-existing answers for specific template prompts\nby using the ",(0,r.kt)("inlineCode",{parentName:"p"},"answers")," property. This feature prevents the prompt from being\ndisplayed every time you render a new template. When rendering, the system will\nfirst read all the answers from this file and only prompt the user for the ones\nthat remain unanswered. This functionality proves to be beneficial when you want\na template to behave in a particular manner within a specific directory."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "<template-name>": {\n    "answers": {\n      "<prompt-name>": "<prompt-answer>"\n    }\n  }\n}\n')),(0,r.kt)(o.e,{mdxType:"Example"},(0,r.kt)("p",null,"If I had a template named ",(0,r.kt)("inlineCode",{parentName:"p"},"hello-world")," and a prompt named ",(0,r.kt)("inlineCode",{parentName:"p"},"age"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n  "prompts": [\n    {\n      // highlight-next-line\n      "name": "age"\n      // ...\n    }\n  ]\n}\n')),(0,r.kt)("p",null,"The I can set the answer to the prompt in our ",(0,r.kt)("inlineCode",{parentName:"p"},".tpsrc")," file with"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "hello-world": {\n    "answers": {\n      "age": 23\n    }\n  }\n}\n'))),(0,r.kt)("h3",{id:"configuring-templates"},"Configuring Templates"),(0,r.kt)("p",null,"Additionally, you can define pre-existing options that modify the behavior of\ntemplates consistently for a given template. This provides a convenient way for\nusers to have templates function in a desired manner each time they use them\nwithin the repository. You can configure templates behavior with the ",(0,r.kt)("inlineCode",{parentName:"p"},"opts"),"\nproperty"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "<template-name>": {\n    "opts": {\n      "<opt-name>": "<opt-answer>"\n    }\n  }\n}\n')),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"To find all the available options for configuring templates, check out the\n",(0,r.kt)("a",{parentName:"p",href:"../api/template#options"},"Template Options API"))),(0,r.kt)(o.e,{mdxType:"Example"},(0,r.kt)("p",null,"If I had a template named ",(0,r.kt)("inlineCode",{parentName:"p"},"react-component")," and I wanted to always force the\ncreation of my new instance even if one already exists then I can add a ",(0,r.kt)("inlineCode",{parentName:"p"},"force"),"\noption to my templates configuration."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    "opts": {\n      "force": true\n    }\n  }\n}\n')),(0,r.kt)("p",null,"This would be equivilent to passing a ",(0,r.kt)("inlineCode",{parentName:"p"},"--force")," flag to the create command"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --force\n"))),(0,r.kt)("h2",{id:"make-a-global-configuration-file"},"Make a Global Configuration File"),(0,r.kt)("p",null,"Templates also allows you to have global settings. In order to initialize global\nsettings or templates run the following command"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps init --global\n")),(0,r.kt)("p",null,"This will create a ",(0,r.kt)("inlineCode",{parentName:"p"},".tps")," and ",(0,r.kt)("inlineCode",{parentName:"p"},".tpsrc")," folder in your home directory."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Note sure what a home directory is? Check out this\n",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Home_directory"},"wiki")),(0,r.kt)("p",{parentName:"admonition"},"For mac uses your home directory is usually refered to as ",(0,r.kt)("inlineCode",{parentName:"p"},"~")," on the command\nline")))}d.isMDXComponent=!0}}]);