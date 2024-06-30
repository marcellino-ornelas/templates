(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[8949],{15680:(e,t,n)=>{"use strict";n.d(t,{xA:()=>u,yg:()=>g});var a=n(96540);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=c(n),d=l,g=p["".concat(i,".").concat(d)]||p[d]||m[d]||r;return n?a.createElement(g,s(s({ref:t},u),{},{components:n})):a.createElement(g,s({ref:t},u))}));function g(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,s=new Array(r);s[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[p]="string"==typeof e?e:l,s[1]=o;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},83167:(e,t,n)=>{"use strict";n.d(t,{R:()=>r});var a=n(96540),l=n(41622);const r=e=>{let{children:t,open:n=!1,title:r=""}=e;const s=r?`Example: ${r}`:"Example";return a.createElement(l.A,{summary:s,open:n},a.createElement("div",null,t))}},85174:(e,t,n)=>{"use strict";n.d(t,{$:()=>r});var a=n(96540);const l="tableContainer_DG64",r=e=>{let{template:t,type:r="json"}=e;const[s,o]=(0,a.useState)(null);(0,a.useEffect)((()=>{(async()=>{const e=await n(49867)(`./${t}/settings.${r}`);o(e)})()}),[]);return a.createElement("div",{className:l},a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"name"),a.createElement("th",null,"description"),a.createElement("th",null,"option"),a.createElement("th",null,"alias"),a.createElement("th",null,"default"))),a.createElement("tbody",null,s?.prompts?.map((e=>a.createElement("tr",{key:e.name},a.createElement("td",null,e.name),a.createElement("td",null,e.message,a.createElement("br",null),a.createElement("span",{style:{color:"grey"}},!!e?.choices?.length&&`(${(e=>(e?.choices||[]).map((e=>e?.value||e)))(e).join(", ")})`)),a.createElement("td",{style:{whiteSpace:"nowrap"}},`--${e.name}`),a.createElement("td",{style:{whiteSpace:"nowrap"}},e?.aliases?.map((e=>1===e.length?`-${e}`:`--${e}`)).join(", ")),a.createElement("td",null,"function"==typeof e?.default?e?.default({}):e?.default?.toString())))))))}},41622:(e,t,n)=>{"use strict";n.d(t,{A:()=>g});var a=n(58168),l=n(96540),r=n(20053),s=n(92303),o=n(41422);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function c(e){return!!e&&("SUMMARY"===e.tagName||c(e.parentElement))}function u(e,t){return!!e&&(e===t||u(e.parentElement,t))}function p(e){let{summary:t,children:n,...p}=e;const m=(0,s.A)(),d=(0,l.useRef)(null),{collapsed:g,setCollapsed:y}=(0,o.u)({initialState:!p.open}),[h,f]=(0,l.useState)(p.open),b=l.isValidElement(t)?t:l.createElement("summary",null,t??"Details");return l.createElement("details",(0,a.A)({},p,{ref:d,open:h,"data-collapsed":g,className:(0,r.A)(i.details,m&&i.isBrowser,p.className),onMouseDown:e=>{c(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;c(t)&&u(t,d.current)&&(e.preventDefault(),g?(y(!1),f(!0)):y(!0))}}),b,l.createElement(o.N,{lazy:!1,collapsed:g,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{y(e),f(!e)}},l.createElement("div",{className:i.collapsibleContent},n)))}const m={details:"details_b_Ee"},d="alert alert--info";function g(e){let{...t}=e;return l.createElement(p,(0,a.A)({},t,{className:(0,r.A)(d,m.details,t.className)}))}},19365:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var a=n(96540),l=n(20053);const r={tabItem:"tabItem_Ymn6"};function s(e){let{children:t,hidden:n,className:s}=e;return a.createElement("div",{role:"tabpanel",className:(0,l.A)(r.tabItem,s),hidden:n},t)}},11470:(e,t,n)=>{"use strict";n.d(t,{A:()=>N});var a=n(58168),l=n(96540),r=n(20053),s=n(23104),o=n(56347),i=n(57485),c=n(31682),u=n(89466);function p(e){return function(e){return l.Children.map(e,(e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:l}}=e;return{value:t,label:n,attributes:a,default:l}}))}function m(e){const{values:t,children:n}=e;return(0,l.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,c.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const a=(0,o.W6)(),r=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(r),(0,l.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(a.location.search);t.set(r,e),a.replace({...a.location,search:t.toString()})}),[r,a])]}function y(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,r=m(e),[s,o]=(0,l.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:r}))),[i,c]=g({queryString:n,groupId:a}),[p,y]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,r]=(0,u.Dv)(n);return[a,(0,l.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:a}),h=(()=>{const e=i??p;return d({value:e,tabValues:r})?e:null})();(0,l.useLayoutEffect)((()=>{h&&o(h)}),[h]);return{selectedValue:s,selectValue:(0,l.useCallback)((e=>{if(!d({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);o(e),c(e),y(e)}),[c,y,r]),tabValues:r}}var h=n(92303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:t,block:n,selectedValue:o,selectValue:i,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:p}=(0,s.a_)(),m=e=>{const t=e.currentTarget,n=u.indexOf(t),a=c[n].value;a!==o&&(p(t),i(a))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":n},t)},c.map((e=>{let{value:t,label:n,attributes:s}=e;return l.createElement("li",(0,a.A)({role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,key:t,ref:e=>u.push(e),onKeyDown:d,onClick:m},s,{className:(0,r.A)("tabs__item",f.tabItem,s?.className,{"tabs__item--active":o===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:a}=e;const r=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=r.find((e=>e.props.value===a));return e?(0,l.cloneElement)(e,{className:"margin-top--md"}):null}return l.createElement("div",{className:"margin-top--md"},r.map(((e,t)=>(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function w(e){const t=y(e);return l.createElement("div",{className:(0,r.A)("tabs-container",f.tabList)},l.createElement(b,(0,a.A)({},e,t)),l.createElement(v,(0,a.A)({},e,t)))}function N(e){const t=(0,h.A)();return l.createElement(w,(0,a.A)({key:String(t)},e))}},81874:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>u,default:()=>h,frontMatter:()=>c,metadata:()=>p,toc:()=>d});var a=n(58168),l=(n(96540),n(15680)),r=n(85174),s=n(83167),o=n(11470),i=n(19365);const c={},u="yargs-cli-cmd",p={unversionedId:"main/templates/yargs-cli-cmd",id:"main/templates/yargs-cli-cmd",title:"yargs-cli-cmd",description:"templates@>v1.0.19",source:"@site/docs/main/templates/yargs-cli-cmd.mdx",sourceDirName:"main/templates",slug:"/main/templates/yargs-cli-cmd",permalink:"/templates/docs/main/templates/yargs-cli-cmd",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/templates/yargs-cli-cmd.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"react-component",permalink:"/templates/docs/main/templates/react-component"},next:{title:"Creating new templates",permalink:"/templates/docs/main/create-new-template/"}},m={},d=[{value:"Usage",id:"usage",level:2},{value:"Installation",id:"installation",level:2},{value:"Options",id:"options",level:2},{value:"Copy",id:"copy",level:2},{value:"Examples",id:"examples",level:2},{value:"How to use",id:"how-to-use",level:3},{value:"Set a loction for new instances",id:"set-a-loction-for-new-instances",level:3},{value:"Dont create a new folder",id:"dont-create-a-new-folder",level:3}],g={toc:d},y="wrapper";function h(e){let{components:t,...n}=e;return(0,l.yg)(y,(0,a.A)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,l.yg)("h1",{id:"yargs-cli-cmd"},"yargs-cli-cmd"),(0,l.yg)("span",{className:"badge badge--secondary margin-left--xs"},"templates@>v1.0.19"),(0,l.yg)("br",null),(0,l.yg)("br",null),(0,l.yg)("p",null,"Create a yargs cli command module using\n",(0,l.yg)("a",{parentName:"p",href:"https://github.com/yargs/yargs/blob/main/docs/advanced.md#example-command-hierarchy-using-indexmjs"},"ESM syntax"),"."),(0,l.yg)("admonition",{type:"info"},(0,l.yg)("p",{parentName:"admonition"},"For template versions prior to 1.0.24, a new folder is created when generating a\nnew instance of this template. This issue has been resolved in version 1.0.24.\nIf you are using an incompatible version and wish to avoid a new folder being\ncreated, please refer to our guide on\n",(0,l.yg)("a",{parentName:"p",href:"/templates/docs/main/templates/yargs-cli-cmd#dont-create-a-new-folder"},"preventing new folder"),".")),(0,l.yg)("h2",{id:"usage"},"Usage"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash",metastring:'title="Usage"',title:'"Usage"'},"tps yargs-cli-cmd <cmd-name>\n\n# or long build path\n\ntps yargs-cli-cmd path/to/dir/<cmd-name>\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt",metastring:'title="Creates"',title:'"Creates"'},"| - <cmd-name>.js\n")),(0,l.yg)(s.R,{mdxType:"Example"},(0,l.yg)(o.A,{mdxType:"Tabs"},(0,l.yg)(i.A,{value:"default",mdxType:"TabItem"},(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps yargs-cli-cmd publish\n")),(0,l.yg)("p",null,"Produces:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"|- publish.js\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="publish.js"',title:'"publish.js"'},"export const command = 'publish';\n\nexport const aliases = [];\n\nexport const describe = 'This is my publish cli command';\n\nexport const builder = {\n    flag: {\n        alias: '',\n        describe: '...',\n        type: 'boolean',\n    },\n};\n\nexport const handler = async (argv) => {\n    // code ...\n};\n"))),(0,l.yg)(i.A,{value:"long build path",mdxType:"TabItem"},(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps yargs-cli-cmd cli/commands/publish\n")),(0,l.yg)("p",null,"Produces:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - cli/\n    | - commands/\n        | - publish.js\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="cli/commands/publish.js"',title:'"cli/commands/publish.js"'},"export const command = 'publish';\n\nexport const aliases = [];\n\nexport const describe = 'This is my publish cli command';\n\nexport const builder = {\n    flag: {\n        alias: '',\n        describe: '...',\n        type: 'boolean',\n    },\n};\n\nexport const handler = async (argv) => {\n    // code ...\n};\n"))))),(0,l.yg)("h2",{id:"installation"},"Installation"),(0,l.yg)("p",null,"This templates is a part of Templates library. If you've already installed\nTemplates, you'll have instant access to this template, and you can disregard\nthis command."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"npm i -g templates-mo\n")),(0,l.yg)("h2",{id:"options"},"Options"),(0,l.yg)(r.$,{template:"yargs-cli-cmd",type:"js",mdxType:"TemplateOptions"}),(0,l.yg)("h2",{id:"copy"},"Copy"),(0,l.yg)("p",null,"If you like this template, but want to modify a few things use the copy command.\nIt allows you to duplicate the template into your project and tailor it to your\nneeds."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"# if your not initialized run\ntps init\n\n# copy template\ntps copy yargs-cli-cmd\n")),(0,l.yg)("h2",{id:"examples"},"Examples"),(0,l.yg)("h3",{id:"how-to-use"},"How to use"),(0,l.yg)("p",null,"If your using\n",(0,l.yg)("a",{parentName:"p",href:"https://github.com/yargs/yargs/blob/main/docs/advanced.md#example-command-hierarchy-using-indexmjs"},"yargs modules"),"\nyou can use this template to generate command files. Lets say your projects cli\nlooks something like this:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            | - some-command.js\n            | - index.js\n")),(0,l.yg)("p",null,"If you want to add a new command called ",(0,l.yg)("inlineCode",{parentName:"p"},"list")," you can run the following"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps yargs-cli-cmd cli/commands/list\n")),(0,l.yg)("p",null,"You will be prompted to answer the following questions:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"? What type of file style do you want to use?\n? Would you like to use typescript?\n? What type of extension do you want for your file?\n? Please add a description\n")),(0,l.yg)("p",null,"Based on your responses to the prompts, templates will generate a ",(0,l.yg)("inlineCode",{parentName:"p"},"list.js")," file\nwithin your ",(0,l.yg)("inlineCode",{parentName:"p"},"./cli/commands/")," directory."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            // highlight-next-line\n            | - list.js\n            | - some-command.js\n            | - index.js\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="cli/commands/list.js"',title:'"cli/commands/list.js"'},"export const command = 'list';\n\nexport const aliases = [];\n\nexport const describe = 'This is my list cli command';\n\nexport const builder = {\n    flag: {\n        alias: '',\n        describe: '...',\n        type: 'boolean',\n    },\n};\n\nexport const handler = async (argv) => {\n    // code ...\n};\n")),(0,l.yg)("h3",{id:"set-a-loction-for-new-instances"},"Set a loction for new instances"),(0,l.yg)("p",null,"You can configure this template to always generate in the same directory by\nadding a ",(0,l.yg)("a",{parentName:"p",href:"/templates/docs/api/template#extend-destination"},(0,l.yg)("inlineCode",{parentName:"a"},"extendDest"))," option\nto your ",(0,l.yg)("inlineCode",{parentName:"p"},".tps/tpsrc")," file."),(0,l.yg)("p",null,"If you havent already initialize your repo:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,l.yg)("p",null,"lets say you have a directory structure like this"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            | - some-command.js\n            | - index.js\n")),(0,l.yg)("p",null,"If you wanted all your new commands to be generated in the ",(0,l.yg)("inlineCode",{parentName:"p"},"cli/commands"),"\ndirectory then you can add the following to your tpsrc file."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "yargs-cli-cmd": {\n        "opts": {\n            // highlight-next-line\n            "extendDest": "./cli/commands"\n        }\n    }\n}\n')),(0,l.yg)("p",null,"Now you can generate a new instance without passing in a path and it will be\ncreated in the ",(0,l.yg)("inlineCode",{parentName:"p"},"cli/commands")," folder."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps yargs-cli-cmd list\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            // highlight-next-line\n            | - list.js\n            | - some-command.js\n            | - index.js\n")),(0,l.yg)("p",null,"Want to create sub commands? Add a build path and let the magic unfold"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps yargs-cli-cmd list_commands/template\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - cli/\n        | - index.js\n        | - commands/\n            // highlight-start\n            | - list_commands/\n                | - template.js\n            // highlight-end\n            | - list.js\n            | - some-command.js\n            | - index.js\n")),(0,l.yg)("h3",{id:"dont-create-a-new-folder"},"Dont create a new folder"),(0,l.yg)("admonition",{type:"caution"},(0,l.yg)("p",{parentName:"admonition"},"Versions equal to or higher than ",(0,l.yg)("inlineCode",{parentName:"p"},"1.0.24")," automatically support this behavior,\nrequiring no additional action within this section.")),(0,l.yg)("p",null,"If you dont want your yarg cmd file in a new folder you can turn off the new\nfolder option in your ",(0,l.yg)("inlineCode",{parentName:"p"},".tps/tpsrc")),(0,l.yg)("p",null,"If you havent already initialize your repo:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "yargs-cli-cmd": {\n        "opts": {\n            // highlight-next-line\n            "newFolder": false\n        }\n    }\n}\n')),(0,l.yg)("p",null,"Now when you run the following it will produce the cmd file with a new folder"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps yargs-cli-cmd publish\n")),(0,l.yg)("p",null,"Produces:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - <cwd>\n    // highlight-next-line\n    | - publish.js\n")))}h.isMDXComponent=!0},49867:(e,t,n)=>{var a={"./new-template/default/settings.json":[34033,3,4033],"./new-test/settings.json":[43137,3,3137],"./react-component/settings.js":[80543,7,543],"./yargs-cli-cmd/settings.js":[97572,7,7572]};function l(e){if(!n.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],l=t[0];return n.e(t[2]).then((()=>n.t(l,16|t[1])))}l.keys=()=>Object.keys(a),l.id=49867,e.exports=l}}]);