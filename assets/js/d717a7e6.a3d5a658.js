"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[8949],{3145:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>m,contentTitle:()=>u,default:()=>g,frontMatter:()=>d,metadata:()=>h,toc:()=>p});var t=s(74848),a=s(28453),l=s(85174),r=s(83167),i=s(11470),c=s(19365),o=s(1549);const d={},u="yargs-cli-cmd",h={id:"main/templates/yargs-cli-cmd",title:"yargs-cli-cmd",description:'=v1.0.19" />',source:"@site/docs/main/templates/yargs-cli-cmd.mdx",sourceDirName:"main/templates",slug:"/main/templates/yargs-cli-cmd",permalink:"/templates/docs/main/templates/yargs-cli-cmd",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/templates/yargs-cli-cmd.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"react-component",permalink:"/templates/docs/main/templates/react-component"},next:{title:"Creating new templates",permalink:"/templates/docs/main/create-new-template/"}},m={},p=[{value:"Usage",id:"usage",level:2},{value:"Installation",id:"installation",level:2},{value:"Options",id:"options",level:2},{value:"Copy",id:"copy",level:2},{value:"Examples",id:"examples",level:2},{value:"How to use",id:"how-to-use",level:3},{value:"Set a loction for new instances",id:"set-a-loction-for-new-instances",level:3},{value:"Dont create a new folder",id:"dont-create-a-new-folder",level:3}];function x(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"yargs-cli-cmd",children:"yargs-cli-cmd"})}),"\n",(0,t.jsx)(o._Q,{children:(0,t.jsx)(o.km,{version:">=v1.0.19"})}),"\n",(0,t.jsxs)(n.p,{children:["Create a yargs cli command module using\n",(0,t.jsx)(n.a,{href:"https://github.com/yargs/yargs/blob/main/docs/advanced.md#example-command-hierarchy-using-indexmjs",children:"ESM syntax"}),"."]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["For template versions prior to 1.0.24, a new folder is created when generating a\nnew instance of this template. This issue has been resolved in version 1.0.24.\nIf you are using an incompatible version and wish to avoid a new folder being\ncreated, please refer to our guide on\n",(0,t.jsx)(n.a,{href:"/templates/docs/main/templates/yargs-cli-cmd#dont-create-a-new-folder",children:"preventing new folder"}),"."]})}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",metastring:'title="Usage"',children:"tps yargs-cli-cmd <cmd-name>\n\n# or long build path\n\ntps yargs-cli-cmd path/to/dir/<cmd-name>\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-txt",metastring:'title="Creates"',children:"| - <cmd-name>.js\n"})}),"\n",(0,t.jsx)(r.R,{children:(0,t.jsxs)(i.A,{children:[(0,t.jsxs)(c.A,{value:"default",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps yargs-cli-cmd publish\n"})}),(0,t.jsx)(n.p,{children:"Produces:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-txt",children:"|- publish.js\n"})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="publish.js"',children:"export const command = 'publish';\n\nexport const aliases = [];\n\nexport const describe = 'This is my publish cli command';\n\nexport const builder = {\n    flag: {\n        alias: '',\n        describe: '...',\n        type: 'boolean',\n    },\n};\n\nexport const handler = async (argv) => {\n    // code ...\n};\n"})})]}),(0,t.jsxs)(c.A,{value:"long build path",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps yargs-cli-cmd cli/commands/publish\n"})}),(0,t.jsx)(n.p,{children:"Produces:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-txt",children:"| - cli/\n    | - commands/\n        | - publish.js\n"})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="cli/commands/publish.js"',children:"export const command = 'publish';\n\nexport const aliases = [];\n\nexport const describe = 'This is my publish cli command';\n\nexport const builder = {\n    flag: {\n        alias: '',\n        describe: '...',\n        type: 'boolean',\n    },\n};\n\nexport const handler = async (argv) => {\n    // code ...\n};\n"})})]})]})}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.p,{children:"This templates is a part of Templates library. If you've already installed\nTemplates, you'll have instant access to this template, and you can disregard\nthis command."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm i -g templates-mo\n"})}),"\n",(0,t.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,t.jsx)(l.$,{template:"yargs-cli-cmd",type:"js"}),"\n",(0,t.jsx)(n.h2,{id:"copy",children:"Copy"}),"\n",(0,t.jsx)(n.p,{children:"If you like this template, but want to modify a few things use the copy command.\nIt allows you to duplicate the template into your project and tailor it to your\nneeds."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# if your not initialized run\ntps init\n\n# copy template\ntps copy yargs-cli-cmd\n"})}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(n.h3,{id:"how-to-use",children:"How to use"}),"\n",(0,t.jsxs)(n.p,{children:["If your using\n",(0,t.jsx)(n.a,{href:"https://github.com/yargs/yargs/blob/main/docs/advanced.md#example-command-hierarchy-using-indexmjs",children:"yargs modules"}),"\nyou can use this template to generate command files. Lets say your projects cli\nlooks something like this:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            | - some-command.js\n            | - index.js\n"})}),"\n",(0,t.jsxs)(n.p,{children:["If you want to add a new command called ",(0,t.jsx)(n.code,{children:"list"})," you can run the following"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps yargs-cli-cmd cli/commands/list\n"})}),"\n",(0,t.jsx)(n.p,{children:"You will be prompted to answer the following questions:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"? What type of file style do you want to use?\n? Would you like to use typescript?\n? What type of extension do you want for your file?\n? Please add a description\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Based on your responses to the prompts, templates will generate a ",(0,t.jsx)(n.code,{children:"list.js"})," file\nwithin your ",(0,t.jsx)(n.code,{children:"./cli/commands/"})," directory."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            // highlight-next-line\n            | - list.js\n            | - some-command.js\n            | - index.js\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:'title="cli/commands/list.js"',children:"export const command = 'list';\n\nexport const aliases = [];\n\nexport const describe = 'This is my list cli command';\n\nexport const builder = {\n    flag: {\n        alias: '',\n        describe: '...',\n        type: 'boolean',\n    },\n};\n\nexport const handler = async (argv) => {\n    // code ...\n};\n"})}),"\n",(0,t.jsx)(n.h3,{id:"set-a-loction-for-new-instances",children:"Set a loction for new instances"}),"\n",(0,t.jsxs)(n.p,{children:["You can configure this template to always generate in the same directory by\nadding a ",(0,t.jsx)(n.a,{href:"/templates/docs/api/template#extend-destination",children:(0,t.jsx)(n.code,{children:"extendDest"})})," option\nto your ",(0,t.jsx)(n.code,{children:".tps/tpsrc"})," file."]}),"\n",(0,t.jsx)(n.p,{children:"If you havent already initialize your repo:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps init\n"})}),"\n",(0,t.jsx)(n.p,{children:"lets say you have a directory structure like this"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            | - some-command.js\n            | - index.js\n"})}),"\n",(0,t.jsxs)(n.p,{children:["If you wanted all your new commands to be generated in the ",(0,t.jsx)(n.code,{children:"cli/commands"}),"\ndirectory then you can add the following to your tpsrc file."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title=".tps/.tpsrc"',children:'{\n    "yargs-cli-cmd": {\n        "opts": {\n            // highlight-next-line\n            "extendDest": "./cli/commands"\n        }\n    }\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Now you can generate a new instance without passing in a path and it will be\ncreated in the ",(0,t.jsx)(n.code,{children:"cli/commands"})," folder."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps yargs-cli-cmd list\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            // highlight-next-line\n            | - list.js\n            | - some-command.js\n            | - index.js\n"})}),"\n",(0,t.jsx)(n.p,{children:"Want to create sub commands? Add a build path and let the magic unfold"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps yargs-cli-cmd list_commands/template\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            // highlight-start\n            | - list_commands/\n                | - template.js\n            // highlight-end\n            | - list.js\n            | - some-command.js\n            | - index.js\n"})}),"\n",(0,t.jsx)(n.h3,{id:"dont-create-a-new-folder",children:"Dont create a new folder"}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.p,{children:["Versions equal to or higher than ",(0,t.jsx)(n.code,{children:"1.0.24"})," automatically support this behavior,\nrequiring no additional action within this section."]})}),"\n",(0,t.jsxs)(n.p,{children:["If you dont want your yarg cmd file in a new folder you can turn off the new\nfolder option in your ",(0,t.jsx)(n.code,{children:".tps/tpsrc"})]}),"\n",(0,t.jsx)(n.p,{children:"If you havent already initialize your repo:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps init\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title=".tps/.tpsrc"',children:'{\n    "yargs-cli-cmd": {\n        "opts": {\n            // highlight-next-line\n            "newFolder": false\n        }\n    }\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"Now when you run the following it will produce the cmd file with a new folder"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps yargs-cli-cmd publish\n"})}),"\n",(0,t.jsx)(n.p,{children:"Produces:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-txt",children:"| - <cwd>\n    // highlight-next-line\n    | - publish.js\n"})})]})}function g(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(x,{...e})}):x(e)}},1549:(e,n,s)=>{s.d(n,{Ex:()=>l,_Q:()=>c,km:()=>o});var t=s(96540),a=s(74848);const l=e=>{let{children:n=null,type:s="primary",className:t=""}=e;return(0,a.jsx)("span",{className:`badge badge--${s} ${t}`,children:n})},r="badgeList_iLql",i="badgeListItem_Tu9E",c=e=>{let{children:n}=e;const s=t.Children.map(n,(e=>(0,a.jsx)("div",{className:i,children:e})));return(0,a.jsx)("div",{className:r,children:s})},o=e=>{let{version:n}=e;return(0,a.jsxs)(l,{type:"secondary",children:["templates@",n]})}},83167:(e,n,s)=>{s.d(n,{R:()=>l});s(96540);var t=s(41622),a=s(74848);const l=e=>{let{children:n,open:s=!1,title:l=""}=e;const r=l?`Example: ${l}`:"Example";return(0,a.jsx)(t.A,{summary:r,open:s,children:(0,a.jsx)("div",{children:n})})}},85174:(e,n,s)=>{s.d(n,{$:()=>i});s(96540);var t=s(66588);const a="tableContainer_DG64";var l=s(74848);const r=e=>(e?.choices||[]).map((e=>"string"==typeof e?e:e?.value)),i=e=>{let{template:n}=e;const{templates:s}=(0,t.P_)("templates-libraries-plugin");console.log(s);const{settings:i}=s[n];return(0,l.jsx)("div",{className:a,children:(0,l.jsxs)("table",{children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"name"}),(0,l.jsx)("th",{children:"description"}),(0,l.jsx)("th",{children:"option"}),(0,l.jsx)("th",{children:"alias"}),(0,l.jsx)("th",{children:"default"}),(0,l.jsx)("th",{children:"hidden"})]})}),(0,l.jsx)("tbody",{children:i?.prompts?.map((e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:e.name}),(0,l.jsxs)("td",{children:[e.description||e.message,(0,l.jsx)("br",{}),(0,l.jsx)("span",{style:{color:"grey"},children:!!e?.choices?.length&&`(${r(e).join(", ")})`})]}),(0,l.jsx)("td",{style:{whiteSpace:"nowrap"},children:`--${e.name}`}),(0,l.jsx)("td",{style:{whiteSpace:"nowrap"},children:e?.aliases?.map((e=>1===e.length?`-${e}`:`--${e}`)).join(", ")}),(0,l.jsx)("td",{children:e.default.toString()}),(0,l.jsx)("td",{children:(e.hidden??!1).toString()})]},e.name)))})]})})}},41622:(e,n,s)=>{s.d(n,{A:()=>g});var t=s(96540),a=s(18215),l=s(15066),r=s(63427),i=s(92303),c=s(41422);const o={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var d=s(74848);function u(e){return!!e&&("SUMMARY"===e.tagName||u(e.parentElement))}function h(e,n){return!!e&&(e===n||h(e.parentElement,n))}function m(e){let{summary:n,children:s,...a}=e;(0,r.A)().collectAnchor(a.id);const m=(0,i.A)(),p=(0,t.useRef)(null),{collapsed:x,setCollapsed:g}=(0,c.u)({initialState:!a.open}),[j,y]=(0,t.useState)(a.open),f=t.isValidElement(n)?n:(0,d.jsx)("summary",{children:n??"Details"});return(0,d.jsxs)("details",{...a,ref:p,open:j,"data-collapsed":x,className:(0,l.A)(o.details,m&&o.isBrowser,a.className),onMouseDown:e=>{u(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;u(n)&&h(n,p.current)&&(e.preventDefault(),x?(g(!1),y(!0)):g(!0))},children:[f,(0,d.jsx)(c.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),y(!e)},children:(0,d.jsx)("div",{className:o.collapsibleContent,children:s})})]})}const p={details:"details_b_Ee"},x="alert alert--info";function g(e){let{...n}=e;return(0,d.jsx)(m,{...n,className:(0,a.A)(x,p.details,n.className)})}},19365:(e,n,s)=>{s.d(n,{A:()=>r});s(96540);var t=s(18215);const a={tabItem:"tabItem_Ymn6"};var l=s(74848);function r(e){let{children:n,hidden:s,className:r}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,t.A)(a.tabItem,r),hidden:s,children:n})}},11470:(e,n,s)=>{s.d(n,{A:()=>w});var t=s(96540),a=s(18215),l=s(23104),r=s(56347),i=s(205),c=s(57485),o=s(31682),d=s(70679);function u(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:s}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:s,attributes:t,default:a}}=e;return{value:n,label:s,attributes:t,default:a}}))}(s);return function(e){const n=(0,o.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,s])}function m(e){let{value:n,tabValues:s}=e;return s.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:s}=e;const a=(0,r.W6)(),l=function(e){let{queryString:n=!1,groupId:s}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:n,groupId:s});return[(0,c.aZ)(l),(0,t.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(a.location.search);n.set(l,e),a.replace({...a.location,search:n.toString()})}),[l,a])]}function x(e){const{defaultValue:n,queryString:s=!1,groupId:a}=e,l=h(e),[r,c]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=s.find((e=>e.default))??s[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:l}))),[o,u]=p({queryString:s,groupId:a}),[x,g]=function(e){let{groupId:n}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,l]=(0,d.Dv)(s);return[a,(0,t.useCallback)((e=>{s&&l.set(e)}),[s,l])]}({groupId:a}),j=(()=>{const e=o??x;return m({value:e,tabValues:l})?e:null})();(0,i.A)((()=>{j&&c(j)}),[j]);return{selectedValue:r,selectValue:(0,t.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);c(e),u(e),g(e)}),[u,g,l]),tabValues:l}}var g=s(92303);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=s(74848);function f(e){let{className:n,block:s,selectedValue:t,selectValue:r,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:o}=(0,l.a_)(),d=e=>{const n=e.currentTarget,s=c.indexOf(n),a=i[s].value;a!==t&&(o(n),r(a))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const s=c.indexOf(e.currentTarget)+1;n=c[s]??c[0];break}case"ArrowLeft":{const s=c.indexOf(e.currentTarget)-1;n=c[s]??c[c.length-1];break}}n?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":s},n),children:i.map((e=>{let{value:n,label:s,attributes:l}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>c.push(e),onKeyDown:u,onClick:d,...l,className:(0,a.A)("tabs__item",j.tabItem,l?.className,{"tabs__item--active":t===n}),children:s??n},n)}))})}function b(e){let{lazy:n,children:s,selectedValue:l}=e;const r=(Array.isArray(s)?s:[s]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===l));return e?(0,t.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:r.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==l})))})}function v(e){const n=x(e);return(0,y.jsxs)("div",{className:(0,a.A)("tabs-container",j.tabList),children:[(0,y.jsx)(f,{...n,...e}),(0,y.jsx)(b,{...n,...e})]})}function w(e){const n=(0,g.A)();return(0,y.jsx)(v,{...e,children:u(e.children)},String(n))}},28453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>i});var t=s(96540);const a={},l=t.createContext(a);function r(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);