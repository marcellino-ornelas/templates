"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[6630],{15680:(e,t,n)=>{n.d(t,{xA:()=>m,yg:()=>d});var a=n(96540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=s(n),u=i,d=c["".concat(p,".").concat(u)]||c[u]||g[u]||r;return n?a.createElement(d,o(o({ref:t},m),{},{components:n})):a.createElement(d,o({ref:t},m))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<r;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},83167:(e,t,n)=>{n.d(t,{R:()=>r});var a=n(96540),i=n(41622);const r=e=>{let{children:t,open:n=!1,title:r=""}=e;const o=r?`Example: ${r}`:"Example";return a.createElement(i.A,{summary:o,open:n},a.createElement("div",null,t))}},41622:(e,t,n)=>{n.d(t,{A:()=>d});var a=n(58168),i=n(96540),r=n(20053),o=n(92303),l=n(41422);const p={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function s(e){return!!e&&("SUMMARY"===e.tagName||s(e.parentElement))}function m(e,t){return!!e&&(e===t||m(e.parentElement,t))}function c(e){let{summary:t,children:n,...c}=e;const g=(0,o.A)(),u=(0,i.useRef)(null),{collapsed:d,setCollapsed:h}=(0,l.u)({initialState:!c.open}),[y,f]=(0,i.useState)(c.open),w=i.isValidElement(t)?t:i.createElement("summary",null,t??"Details");return i.createElement("details",(0,a.A)({},c,{ref:u,open:y,"data-collapsed":d,className:(0,r.A)(p.details,g&&p.isBrowser,c.className),onMouseDown:e=>{s(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;s(t)&&m(t,u.current)&&(e.preventDefault(),d?(h(!1),f(!0)):h(!0))}}),w,i.createElement(l.N,{lazy:!1,collapsed:d,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{h(e),f(!e)}},i.createElement("div",{className:p.collapsibleContent},n)))}const g={details:"details_b_Ee"},u="alert alert--info";function d(e){let{...t}=e;return i.createElement(c,(0,a.A)({},t,{className:(0,r.A)(u,g.details,t.className)}))}},69792:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>m});var a=n(58168),i=(n(96540),n(15680)),r=n(83167);const o={sidebar_label:"Configure"},l="Configure Templates",p={unversionedId:"main/tpsrc",id:"main/tpsrc",title:"Configure Templates",description:"Initializing Repo with Templates",source:"@site/docs/main/tpsrc.mdx",sourceDirName:"main",slug:"/main/tpsrc",permalink:"/templates/docs/main/tpsrc",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/tpsrc.mdx",tags:[],version:"current",frontMatter:{sidebar_label:"Configure"},sidebar:"docs",previous:{title:"Prompting",permalink:"/templates/docs/main/create-new-template/prompts"}},s={},m=[{value:"Initializing Repo with Templates",id:"initializing-repo-with-templates",level:2},{value:"Configuring a Template",id:"configuring-a-template",level:2},{value:"Answering Templates Prompts",id:"answering-templates-prompts",level:3},{value:"Configuring Templates",id:"configuring-templates",level:3},{value:"Make a Global Configuration File",id:"make-a-global-configuration-file",level:2}],c={toc:m},g="wrapper";function u(e){let{components:t,...n}=e;return(0,i.yg)(g,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"configure-templates"},"Configure Templates"),(0,i.yg)("h2",{id:"initializing-repo-with-templates"},"Initializing Repo with Templates"),(0,i.yg)("p",null,"Before delving into custom components or configuring template behavior, the\ninitial step is to Initialize your repository with templates. This\nstraightforward process will generate a .tps folder containing a .tpsrc file,\nlocated within your current working directory."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,i.yg)("p",null,"Produces:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>\n    // highlight-start\n    | - .tps/\n        | - .tpsrc\n    // highlight-end\n")),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},".tps")," folder also serves as the designated location for your custom\ntemplates. For further insights into creating custom templates, refer to our\ndetailed documentation on ",(0,i.yg)("a",{parentName:"p",href:"./create-new-template/"},"creating a new template"),"."),(0,i.yg)("p",null,"Furthermore, keep on reading these docs to gain in-depth knowledge about the\n",(0,i.yg)("inlineCode",{parentName:"p"},".tpsrc")," file."),(0,i.yg)("h2",{id:"configuring-a-template"},"Configuring a Template"),(0,i.yg)("p",null,"Tps offers a json configuration file that caters specifically to users of your\ntemplate, as opposed to the ",(0,i.yg)("a",{parentName:"p",href:"./create-new-template/settings"},"settings file"),"\nwhich is intended for template development. The configuration file is named\n",(0,i.yg)("inlineCode",{parentName:"p"},".tpsrc")," and it allows you to define predefined configurations for each\ntemplate, altering tps behavior during rendering. With the ability to have\nmultiple template configurations within this file, users gain greater control\nand flexibility when utilizing your template. This file needs to be in a ",(0,i.yg)("inlineCode",{parentName:"p"},".tps"),"\nfolder in the root of your repo."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    // highlight-next-line\n    "<template-name>": {}\n}\n')),(0,i.yg)("p",null,"When adding configurations for template replace the ",(0,i.yg)("inlineCode",{parentName:"p"},"<template-name>")," to be the\nname of your template. This property will hold all configurations for that\ntemplate."),(0,i.yg)(r.R,{mdxType:"Example"},(0,i.yg)("p",null,"Say we had a template named ",(0,i.yg)("inlineCode",{parentName:"p"},"react-component"),". Now to add configurations to this\ntemplate I would put the following inside of my tpsrc file"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    // highlight-start\n    "react-component": {\n        /* react-component template specific configs */\n    }\n    // highlight-end\n}\n'))),(0,i.yg)("p",null,"Like mentioned before, you can add multiple template configurations"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    // highlight-start\n    "<template-name-1>": {},\n    "<template-name-2>": {}\n    // highlight-end\n}\n')),(0,i.yg)(r.R,{mdxType:"Example"},(0,i.yg)("p",null,"Say we had two templates ",(0,i.yg)("inlineCode",{parentName:"p"},"react-component")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"express-app-route")," and wanted to\nalso add configurations then the tpsrc files would look something like this:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    // highlight-start\n    "react-component": {\n        /* react-component template specific configs */\n    },\n    "express-app-route": {\n        /* express-app-route template specific configs */\n    }\n    // highlight-end\n}\n'))),(0,i.yg)("admonition",{type:"note"},(0,i.yg)("p",{parentName:"admonition"},"To find all the available properties you can use in the configuration file,\ncheck out the ",(0,i.yg)("a",{parentName:"p",href:"../api/tpsrc"},"tpsrc API"))),(0,i.yg)("h3",{id:"answering-templates-prompts"},"Answering Templates Prompts"),(0,i.yg)("p",null,"You have the option to define pre-existing answers for specific template prompts\nby using the ",(0,i.yg)("inlineCode",{parentName:"p"},"answers")," property. This feature prevents the prompt from being\ndisplayed every time you render a new template. When rendering, the system will\nfirst read all the answers from this file and only prompt the user for the ones\nthat remain unanswered. This functionality proves to be beneficial when you want\na template to behave in a particular manner within a specific directory."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "<template-name>": {\n        // highlight-start\n        "answers": {\n            "<prompt-name>": "<prompt-answer>"\n        }\n        // highlight-end\n    }\n}\n')),(0,i.yg)(r.R,{mdxType:"Example"},(0,i.yg)("p",null,"If I had a template named ",(0,i.yg)("inlineCode",{parentName:"p"},"hello-world")," and a prompt named ",(0,i.yg)("inlineCode",{parentName:"p"},"age"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n    "prompts": [\n        {\n            // highlight-next-line\n            "name": "age"\n            // ...\n        }\n    ]\n}\n')),(0,i.yg)("p",null,"The I can set the answer to the prompt in our ",(0,i.yg)("inlineCode",{parentName:"p"},".tpsrc")," file with"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "hello-world": {\n        "answers": {\n            // highlight-next-line\n            "age": 23\n        }\n    }\n}\n'))),(0,i.yg)("h3",{id:"configuring-templates"},"Configuring Templates"),(0,i.yg)("p",null,"Additionally, you can define pre-existing options that modify the behavior of\ntemplates consistently for a given template. This provides a convenient way for\nusers to have templates function in a desired manner each time they use them\nwithin the repository. You can configure templates behavior with the ",(0,i.yg)("inlineCode",{parentName:"p"},"opts"),"\nproperty"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "<template-name>": {\n        // highlight-start\n        "opts": {\n            "<opt-name>": "<opt-answer>"\n        }\n        // highlight-end\n    }\n}\n')),(0,i.yg)("admonition",{type:"note"},(0,i.yg)("p",{parentName:"admonition"},"To find all the available options for configuring templates, check out the\n",(0,i.yg)("a",{parentName:"p",href:"../api/template#options"},"Template Options API"))),(0,i.yg)(r.R,{mdxType:"Example"},(0,i.yg)("p",null,"If I had a template named ",(0,i.yg)("inlineCode",{parentName:"p"},"react-component")," and I wanted to always force the\ncreation of my new instance even if one already exists then I can add a ",(0,i.yg)("inlineCode",{parentName:"p"},"force"),"\noption to my templates configuration."),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n    "react-component": {\n        "opts": {\n            // highlight-next-line\n            "force": true\n        }\n    }\n}\n')),(0,i.yg)("p",null,"This would be equivilent to passing a ",(0,i.yg)("inlineCode",{parentName:"p"},"--force")," flag to the create command"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --force\n"))),(0,i.yg)("h2",{id:"make-a-global-configuration-file"},"Make a Global Configuration File"),(0,i.yg)("p",null,"Templates also allows you to have global settings. In order to initialize global\nsettings or templates run the following command"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-bash"},"tps init --global\n")),(0,i.yg)("p",null,"This will create a ",(0,i.yg)("inlineCode",{parentName:"p"},".tps")," and ",(0,i.yg)("inlineCode",{parentName:"p"},".tpsrc")," folder in your home directory."),(0,i.yg)("admonition",{type:"note"},(0,i.yg)("p",{parentName:"admonition"},"Note sure what a home directory is? Check out this\n",(0,i.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Home_directory"},"wiki")),(0,i.yg)("p",{parentName:"admonition"},"For mac uses your home directory is usually refered to as ",(0,i.yg)("inlineCode",{parentName:"p"},"~")," on the command\nline")))}u.isMDXComponent=!0}}]);