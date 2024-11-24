"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[751],{69615:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var s=t(74848),a=t(28453),i=t(83167);const r={},l="Template Configuration",o={id:"api/tpsrc/template",title:"Template Configuration",description:"Answers",source:"@site/docs/api/tpsrc/template.mdx",sourceDirName:"api/tpsrc",slug:"/api/tpsrc/template",permalink:"/templates/docs/api/tpsrc/template",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/tpsrc/template.mdx",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Templates Configuration",permalink:"/templates/docs/api/tpsrc/"},next:{title:"Settings File",permalink:"/templates/docs/api/settings/"}},c={},p=[{value:"Answers",id:"answers",level:2},{value:"Options",id:"options",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"template-configuration",children:"Template Configuration"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="Type"',children:"interface TemplateConfig {\n    answers: TemplateConfigAnswers;\n    opts: TemplateConfigOptions;\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"answers",children:"Answers"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="Type"',children:"interface TemplateConfigAnswers {\n    [name: string]: any;\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"Object containing answers to prompts."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "some-template": {\n        // highlight-start\n        "answers": {\n            "<prompt-name>": "<prompt-value>"\n        }\n        // highlight-end\n    }\n}\n'})}),"\n",(0,s.jsx)(i.R,{children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "react-component": {\n        // highlight-start\n        "answers": {\n            "css": true\n        }\n        // highlight-end\n    }\n}\n'})})}),"\n",(0,s.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="Type"',children:"interface TemplateConfigOptions {\n    [name: string]: any;\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Object containing options for templates. See\n",(0,s.jsx)(n.a,{href:"../template#options",children:"Template Option API"})," for template options."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "some-template": {\n        // highlight-start\n        "opts": {\n            "<option-name>": "<option-value>"\n        }\n        // highlight-end\n    }\n}\n'})}),"\n",(0,s.jsx)(i.R,{children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title=".tpsrc"',children:'{\n    "react-component": {\n        // highlight-start\n        "opts": {\n            "wipe": true\n        }\n        // highlight-end\n    }\n}\n'})})})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},83167:(e,n,t)=>{t.d(n,{R:()=>i});t(96540);var s=t(41622),a=t(74848);const i=e=>{let{children:n,open:t=!1,title:i=""}=e;const r=i?`Example: ${i}`:"Example";return(0,a.jsx)(s.A,{summary:r,open:t,children:(0,a.jsx)("div",{children:n})})}},41622:(e,n,t)=>{t.d(n,{A:()=>x});var s=t(96540),a=t(18215),i=t(15066),r=t(63427),l=t(92303),o=t(41422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var p=t(74848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function m(e,n){return!!e&&(e===n||m(e.parentElement,n))}function h(e){let{summary:n,children:t,...a}=e;(0,r.A)().collectAnchor(a.id);const h=(0,l.A)(),u=(0,s.useRef)(null),{collapsed:g,setCollapsed:x}=(0,o.u)({initialState:!a.open}),[f,j]=(0,s.useState)(a.open),v=s.isValidElement(n)?n:(0,p.jsx)("summary",{children:n??"Details"});return(0,p.jsxs)("details",{...a,ref:u,open:f,"data-collapsed":g,className:(0,i.A)(c.details,h&&c.isBrowser,a.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;d(n)&&m(n,u.current)&&(e.preventDefault(),g?(x(!1),j(!0)):x(!0))},children:[v,(0,p.jsx)(o.N,{lazy:!1,collapsed:g,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{x(e),j(!e)},children:(0,p.jsx)("div",{className:c.collapsibleContent,children:t})})]})}const u={details:"details_b_Ee"},g="alert alert--info";function x(e){let{...n}=e;return(0,p.jsx)(h,{...n,className:(0,a.A)(g,u.details,n.className)})}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>l});var s=t(96540);const a={},i=s.createContext(a);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);