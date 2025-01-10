"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[6630],{22511:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var i=t(74848),s=t(28453),a=t(83167);const r={sidebar_label:"Configure"},o="Configure Templates",l={id:"main/tpsrc",title:"Configure Templates",description:"Initializing Repo with Templates",source:"@site/docs/main/tpsrc.mdx",sourceDirName:"main",slug:"/main/tpsrc",permalink:"/templates/docs/main/tpsrc",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/tpsrc.mdx",tags:[],version:"current",frontMatter:{sidebar_label:"Configure"},sidebar:"docs",previous:{title:"Generating an Instance",permalink:"/templates/docs/main/generating-instance"}},c={},d=[{value:"Initializing Repo with Templates",id:"initializing-repo-with-templates",level:2},{value:"Configuring a Template",id:"configuring-a-template",level:2},{value:"Answering Templates Prompts",id:"answering-templates-prompts",level:3},{value:"Configuring Templates",id:"configuring-templates",level:3},{value:"Make a Global Configuration File",id:"make-a-global-configuration-file",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"configure-templates",children:"Configure Templates"})}),"\n",(0,i.jsx)(n.h2,{id:"initializing-repo-with-templates",children:"Initializing Repo with Templates"}),"\n",(0,i.jsx)(n.p,{children:"Before delving into custom components or configuring template behavior, the\ninitial step is to Initialize your repository with templates. This\nstraightforward process will generate a .tps folder containing a .tpsrc file,\nlocated within your current working directory."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps init\n"})}),"\n",(0,i.jsx)(n.p,{children:"Produces:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"| - <cwd>\n    // highlight-start\n    | - .tps/\n        | - .tpsrc\n    // highlight-end\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:".tps"})," folder also serves as the designated location for your custom\ntemplates. For further insights into creating custom templates, refer to our\ndetailed documentation on ",(0,i.jsx)(n.a,{href:"./create-new-template/",children:"creating a new template"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Furthermore, keep on reading these docs to gain in-depth knowledge about the\n",(0,i.jsx)(n.code,{children:".tpsrc"})," file."]}),"\n",(0,i.jsx)(n.h2,{id:"configuring-a-template",children:"Configuring a Template"}),"\n",(0,i.jsxs)(n.p,{children:["Tps offers a json configuration file that caters specifically to users of your\ntemplate, as opposed to the ",(0,i.jsx)(n.a,{href:"./create-new-template/settings",children:"settings file"}),"\nwhich is intended for template development. The configuration file is named\n",(0,i.jsx)(n.code,{children:".tpsrc"})," and it allows you to define predefined configurations for each\ntemplate, altering tps behavior during rendering. With the ability to have\nmultiple template configurations within this file, users gain greater control\nand flexibility when utilizing your template. This file needs to be in a ",(0,i.jsx)(n.code,{children:".tps"}),"\nfolder in the root of your repo."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    // highlight-next-line\n    "<template-name>": {}\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["When adding configurations for template replace the ",(0,i.jsx)(n.code,{children:"<template-name>"})," to be the\nname of your template. This property will hold all configurations for that\ntemplate."]}),"\n",(0,i.jsxs)(a.R,{children:[(0,i.jsxs)(n.p,{children:["Say we had a template named ",(0,i.jsx)(n.code,{children:"react-component"}),". Now to add configurations to this\ntemplate I would put the following inside of my tpsrc file"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    // highlight-start\n    "react-component": {\n        /* react-component template specific configs */\n    }\n    // highlight-end\n}\n'})})]}),"\n",(0,i.jsx)(n.p,{children:"Like mentioned before, you can add multiple template configurations"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    // highlight-start\n    "<template-name-1>": {},\n    "<template-name-2>": {}\n    // highlight-end\n}\n'})}),"\n",(0,i.jsxs)(a.R,{children:[(0,i.jsxs)(n.p,{children:["Say we had two templates ",(0,i.jsx)(n.code,{children:"react-component"})," and ",(0,i.jsx)(n.code,{children:"express-app-route"})," and wanted to\nalso add configurations then the tpsrc files would look something like this:"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    // highlight-start\n    "react-component": {\n        /* react-component template specific configs */\n    },\n    "express-app-route": {\n        /* express-app-route template specific configs */\n    }\n    // highlight-end\n}\n'})})]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["To find all the available properties you can use in the configuration file,\ncheck out the ",(0,i.jsx)(n.a,{href:"../api/tpsrc",children:"tpsrc API"})]})}),"\n",(0,i.jsx)(n.h3,{id:"answering-templates-prompts",children:"Answering Templates Prompts"}),"\n",(0,i.jsxs)(n.p,{children:["You have the option to define pre-existing answers for specific template prompts\nby using the ",(0,i.jsx)(n.code,{children:"answers"})," property. This feature prevents the prompt from being\ndisplayed every time you render a new template. When rendering, the system will\nfirst read all the answers from this file and only prompt the user for the ones\nthat remain unanswered. This functionality proves to be beneficial when you want\na template to behave in a particular manner within a specific directory."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "<template-name>": {\n        // highlight-start\n        "answers": {\n            "<prompt-name>": "<prompt-answer>"\n        }\n        // highlight-end\n    }\n}\n'})}),"\n",(0,i.jsxs)(a.R,{children:[(0,i.jsxs)(n.p,{children:["If I had a template named ",(0,i.jsx)(n.code,{children:"hello-world"})," and a prompt named ",(0,i.jsx)(n.code,{children:"age"}),":"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title="settings.json"',children:'{\n    "prompts": [\n        {\n            // highlight-next-line\n            "name": "age"\n            // ...\n        }\n    ]\n}\n'})}),(0,i.jsxs)(n.p,{children:["The I can set the answer to the prompt in our ",(0,i.jsx)(n.code,{children:".tpsrc"})," file with"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "hello-world": {\n        "answers": {\n            // highlight-next-line\n            "age": 23\n        }\n    }\n}\n'})})]}),"\n",(0,i.jsx)(n.h3,{id:"configuring-templates",children:"Configuring Templates"}),"\n",(0,i.jsxs)(n.p,{children:["Additionally, you can define pre-existing options that modify the behavior of\ntemplates consistently for a given template. This provides a convenient way for\nusers to have templates function in a desired manner each time they use them\nwithin the repository. You can configure templates behavior with the ",(0,i.jsx)(n.code,{children:"opts"}),"\nproperty"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "<template-name>": {\n        // highlight-start\n        "opts": {\n            "<opt-name>": "<opt-answer>"\n        }\n        // highlight-end\n    }\n}\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["To find all the available options for configuring templates, check out the\n",(0,i.jsx)(n.a,{href:"../api/template#options",children:"Template Options API"})]})}),"\n",(0,i.jsxs)(a.R,{children:[(0,i.jsxs)(n.p,{children:["If I had a template named ",(0,i.jsx)(n.code,{children:"react-component"})," and I wanted to always force the\ncreation of my new instance even if one already exists then I can add a ",(0,i.jsx)(n.code,{children:"force"}),"\noption to my templates configuration."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "react-component": {\n        "opts": {\n            // highlight-next-line\n            "force": true\n        }\n    }\n}\n'})}),(0,i.jsxs)(n.p,{children:["This would be equivilent to passing a ",(0,i.jsx)(n.code,{children:"--force"})," flag to the create command"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps react-component Nav --force\n"})})]}),"\n",(0,i.jsx)(n.h2,{id:"make-a-global-configuration-file",children:"Make a Global Configuration File"}),"\n",(0,i.jsx)(n.p,{children:"Templates also allows you to have global settings. In order to initialize global\nsettings or templates run the following command"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps init --global\n"})}),"\n",(0,i.jsxs)(n.p,{children:["This will create a ",(0,i.jsx)(n.code,{children:".tps"})," and ",(0,i.jsx)(n.code,{children:".tpsrc"})," folder in your home directory."]}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsxs)(n.p,{children:["Note sure what a home directory is? Check out this\n",(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Home_directory",children:"wiki"})]}),(0,i.jsxs)(n.p,{children:["For mac uses your home directory is usually refered to as ",(0,i.jsx)(n.code,{children:"~"})," on the command\nline"]})]})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},83167:(e,n,t)=>{t.d(n,{R:()=>a});t(96540);var i=t(41622),s=t(74848);const a=e=>{let{children:n,open:t=!1,title:a=""}=e;const r=a?`Example: ${a}`:"Example";return(0,s.jsx)(i.A,{summary:r,open:t,children:(0,s.jsx)("div",{children:n})})}},41622:(e,n,t)=>{t.d(n,{A:()=>f});var i=t(96540),s=t(18215),a=t(15066),r=t(63427),o=t(92303),l=t(41422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var d=t(74848);function h(e){return!!e&&("SUMMARY"===e.tagName||h(e.parentElement))}function p(e,n){return!!e&&(e===n||p(e.parentElement,n))}function m(e){let{summary:n,children:t,...s}=e;(0,r.A)().collectAnchor(s.id);const m=(0,o.A)(),g=(0,i.useRef)(null),{collapsed:u,setCollapsed:f}=(0,l.u)({initialState:!s.open}),[x,j]=(0,i.useState)(s.open),w=i.isValidElement(n)?n:(0,d.jsx)("summary",{children:n??"Details"});return(0,d.jsxs)("details",{...s,ref:g,open:x,"data-collapsed":u,className:(0,a.A)(c.details,m&&c.isBrowser,s.className),onMouseDown:e=>{h(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;h(n)&&p(n,g.current)&&(e.preventDefault(),u?(f(!1),j(!0)):f(!0))},children:[w,(0,d.jsx)(l.N,{lazy:!1,collapsed:u,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{f(e),j(!e)},children:(0,d.jsx)("div",{className:c.collapsibleContent,children:t})})]})}const g={details:"details_b_Ee"},u="alert alert--info";function f(e){let{...n}=e;return(0,d.jsx)(m,{...n,className:(0,s.A)(u,g.details,n.className)})}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var i=t(96540);const s={},a=i.createContext(s);function r(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);