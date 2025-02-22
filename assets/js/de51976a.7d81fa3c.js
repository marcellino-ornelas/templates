"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[307],{38648:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>d});var a=l(74848),t=l(28453),i=l(83167);const s={sidebar_position:4},o="Templates CLI",r={id:"api/cli",title:"Templates CLI",description:"Init",source:"@site/docs/api/cli.mdx",sourceDirName:"api",slug:"/api/cli",permalink:"/templates/docs/api/cli",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/cli.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"api",previous:{title:"Template Context",permalink:"/templates/docs/api/template-context"},next:{title:"Templates Configuration",permalink:"/templates/docs/api/tpsrc/"}},c={},d=[{value:"Init",id:"init",level:2},{value:"Initializing a repo",id:"initializing-a-repo",level:4},{value:"Initializing tps globally",id:"initializing-tps-globally",level:4},{value:"Forcing a repo",id:"forcing-a-repo",level:4},{value:"List",id:"list",level:2},{value:"Copy",id:"copy",level:2},{value:"Create",id:"create",level:2},{value:"Single build path",id:"single-build-path",level:4},{value:"Long build path",id:"long-build-path",level:4},{value:"Multiple build paths",id:"multiple-build-paths",level:4},{value:"new",id:"new",level:2},{value:"new template",id:"new-template",level:3},{value:"new package",id:"new-package",level:3}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"templates-cli",children:"Templates CLI"})}),"\n",(0,a.jsx)(n.h2,{id:"init",children:"Init"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"tps init\n\nInitialize local settings\n\nOptions:\n  --version      Show version number                                   [boolean]\n  --verbose, -v  More in-depth logging                [boolean] [default: false]\n  --help         Show help                                             [boolean]\n  --force, -f    Initialize tps in cwd no matter what                  [boolean]\n  --global, -g   Initialize tps globally                               [boolean]\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Initialize your repo as a tps repo. This will allow you to set tps template\nsettings and build templates for your repo. This command will create a ",(0,a.jsx)(n.code,{children:".tps"}),"\nfolder and a ",(0,a.jsx)(n.code,{children:".tpsrc"})," file inside of it."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"| - .tps/\n    | - .tpsrc\n"})}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsxs)(n.p,{children:["Tps will throw an error if you try to initialize a child directory when a parent\ndirectory is already initialized. If you would like to do this anyways see\n",(0,a.jsx)(n.a,{href:"#forcing-a-repo",children:"forcing a repo"}),"."]})}),"\n",(0,a.jsx)(n.h4,{id:"initializing-a-repo",children:"Initializing a repo"}),"\n",(0,a.jsx)(n.p,{children:"First navigate into the directory that you wish to initialize local settings."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"cd some/path/to/repo\n"})}),"\n",(0,a.jsx)(n.p,{children:"Initialize template settings"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps init\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h4,{id:"initializing-tps-globally",children:"Initializing tps globally"}),"\n",(0,a.jsxs)(n.p,{children:["use the ",(0,a.jsx)(n.code,{children:"--global"})," flag when you want tps to be initialized globally. This will\nplace the ",(0,a.jsx)(n.code,{children:".tps"})," folder and ",(0,a.jsx)(n.code,{children:".tpsrc"})," file in your home directory"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps init --global\n"})}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.h4,{id:"forcing-a-repo",children:"Forcing a repo"}),"\n",(0,a.jsx)(n.p,{children:"use the force flag when you want a repo to be initialized but a parent directory\nis already initialized"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps init --force\n"})}),"\n",(0,a.jsx)(n.h2,{id:"list",children:"List"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"tps list\n\nShow all available templates\n\nOptions:\n  --version      Show version number                                   [boolean]\n  --verbose, -v  More in-depth logging                [boolean] [default: false]\n  --help         Show help                                             [boolean]\n  --global, -g   List out global files                 [boolean] [default: true]\n  --local, -l    List out global files                 [boolean] [default: true]\n"})}),"\n",(0,a.jsxs)(n.p,{children:["List all available templates that you can use. ",(0,a.jsx)(n.code,{children:"local"})," refers to local\ntemplates, which are templates available in your current working directory\n(cwd). ",(0,a.jsx)(n.code,{children:"global"})," stands for global templates, accessible from anywhere on your\nsystem."]}),"\n",(0,a.jsx)(i.R,{children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps list\nGlobal:\n- react-component\nLocal:\n- new-test\n- new-api\n"})})}),"\n",(0,a.jsx)(n.h2,{id:"copy",children:"Copy"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"cli copy <template>\n\nCopy a template\n\nOptions:\n  --version      Show version number                                   [boolean]\n  --verbose, -v  More in-depth logging                [boolean] [default: false]\n  --help         Show help                                             [boolean]\n"})}),"\n",(0,a.jsx)(n.p,{children:"Copy a template to your local tps directory. Files can then be changed to fit\nusers needs."}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsx)(n.p,{children:"Useful when you like the template but want to add additional features or make a\nfew modifications"})}),"\n",(0,a.jsxs)(i.R,{children:[(0,a.jsxs)(n.p,{children:["Copy Templates default ",(0,a.jsx)(n.a,{href:"../main/templates/react-component",children:(0,a.jsx)(n.code,{children:"react-component"})}),"."]}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps copy react-component\n"})}),(0,a.jsx)(n.p,{children:"Produces:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"| - <cwd>\n    | - .tps/\n        | - react-component/\n            | - <all packages and files from react-component template>\n"})})]}),"\n",(0,a.jsx)(n.h2,{id:"create",children:"Create"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"tps [use] [buildPaths...]\n\nrender a new instance from a template\n\nOptions:\n      --version    Show version number                                 [boolean]\n  -v, --verbose    More in-depth logging              [boolean] [default: false]\n      --env        Load environment variables from a .env file\n                                                       [boolean] [default: true]\n      --help       Show help                                           [boolean]\n  -u, --use        Template package to create your with                 [string]\n  -p, --packages   Additional Packages to use when building your template[array]\n  -d, --default    Use all default answers to all prompts              [boolean]\n  -f, --newFolder  Create a new folder                                 [boolean]\n      --force      force the template to be made. This will override any files\n                   that tps needs to create                            [boolean]\n      --wipe       force the template to be made. This will delete the directory\n                   if exists                                           [boolean]\n      --hidden     Prompt all hidden prompts                           [boolean]\n"})}),"\n",(0,a.jsx)(n.p,{children:"Render a new instance of a template."}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["Checkout out the ",(0,a.jsx)(n.a,{href:"./template#options",children:"Template Options API"})," for more information\nabout template options"]})}),"\n",(0,a.jsx)(n.h4,{id:"single-build-path",children:"Single build path"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps react-component Nav\n"})}),"\n",(0,a.jsx)(n.h4,{id:"long-build-path",children:"Long build path"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps react-component components/Nav\n"})}),"\n",(0,a.jsx)(n.h4,{id:"multiple-build-paths",children:"Multiple build paths"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps react-component components/Nav components/Button pages/Home\n"})}),"\n",(0,a.jsx)(n.h2,{id:"new",children:"new"}),"\n",(0,a.jsx)(n.h3,{id:"new-template",children:"new template"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps new template <template>\n\ncreate a new template\n\nOptions:\n  --version      Show version number                                   [boolean]\n  --verbose, -v  More in-depth logging                [boolean] [default: false]\n  --help         Show help                                             [boolean]\n"})}),"\n",(0,a.jsxs)(i.R,{children:[(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps new template react-component\n"})}),(0,a.jsx)(n.p,{children:"Produces:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"| - .tps\n    // highlight-start\n    | - react-component/\n        | - default/\n        | - settings.json\n    // highlight-end\n"})})]}),"\n",(0,a.jsx)(n.h3,{id:"new-package",children:"new package"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps new package <template> <package>\n\ncreate a new package in a template\n\nOptions:\n  --version      Show version number                                   [boolean]\n  --verbose, -v  More in-depth logging                [boolean] [default: false]\n  --help         Show help                                             [boolean]\n"})}),"\n",(0,a.jsxs)(i.R,{children:[(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"tps new package react-component css\n"})}),(0,a.jsx)(n.p,{children:"Produces:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",children:"| - .tps\n    | - react-component/\n        // highlight-next-line\n        | - css/\n        | - default/\n        | - <other files or directories...>\n"})})]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},83167:(e,n,l)=>{l.d(n,{R:()=>i});l(96540);var a=l(41622),t=l(74848);const i=e=>{let{children:n,open:l=!1,title:i=""}=e;const s=i?`Example: ${i}`:"Example";return(0,t.jsx)(a.A,{summary:s,open:l,children:(0,t.jsx)("div",{children:n})})}},41622:(e,n,l)=>{l.d(n,{A:()=>x});var a=l(96540),t=l(18215),i=l(15066),s=l(63427),o=l(92303),r=l(41422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var d=l(74848);function p(e){return!!e&&("SUMMARY"===e.tagName||p(e.parentElement))}function h(e,n){return!!e&&(e===n||h(e.parentElement,n))}function u(e){let{summary:n,children:l,...t}=e;(0,s.A)().collectAnchor(t.id);const u=(0,o.A)(),m=(0,a.useRef)(null),{collapsed:g,setCollapsed:x}=(0,r.u)({initialState:!t.open}),[b,j]=(0,a.useState)(t.open),f=a.isValidElement(n)?n:(0,d.jsx)("summary",{children:n??"Details"});return(0,d.jsxs)("details",{...t,ref:m,open:b,"data-collapsed":g,className:(0,i.A)(c.details,u&&c.isBrowser,t.className),onMouseDown:e=>{p(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;p(n)&&h(n,m.current)&&(e.preventDefault(),g?(x(!1),j(!0)):x(!0))},children:[f,(0,d.jsx)(r.N,{lazy:!1,collapsed:g,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{x(e),j(!e)},children:(0,d.jsx)("div",{className:c.collapsibleContent,children:l})})]})}const m={details:"details_b_Ee"},g="alert alert--info";function x(e){let{...n}=e;return(0,d.jsx)(u,{...n,className:(0,t.A)(g,m.details,n.className)})}},28453:(e,n,l)=>{l.d(n,{R:()=>s,x:()=>o});var a=l(96540);const t={},i=a.createContext(t);function s(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);