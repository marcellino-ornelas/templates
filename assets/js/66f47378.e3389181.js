(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[4570],{15680:(e,t,n)=>{"use strict";n.d(t,{xA:()=>c,yg:()=>d});var a=n(96540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),g=o,d=u["".concat(i,".").concat(g)]||u[g]||m[g]||l;return n?a.createElement(d,r(r({ref:t},c),{},{components:n})):a.createElement(d,r({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,r=new Array(l);r[0]=g;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[u]="string"==typeof e?e:o,r[1]=s;for(var p=2;p<l;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},83167:(e,t,n)=>{"use strict";n.d(t,{R:()=>l});var a=n(96540),o=n(41622);const l=e=>{let{children:t,open:n=!1,title:l=""}=e;const r=l?`Example: ${l}`:"Example";return a.createElement(o.A,{summary:r,open:n},a.createElement("div",null,t))}},85174:(e,t,n)=>{"use strict";n.d(t,{$:()=>l});var a=n(96540);const o="tableContainer_DG64",l=e=>{let{template:t,type:l="json"}=e;const[r,s]=(0,a.useState)(null);(0,a.useEffect)((()=>{(async()=>{const e=await n(49867)(`./${t}/settings.${l}`);s(e)})()}),[]);return a.createElement("div",{className:o},a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"name"),a.createElement("th",null,"description"),a.createElement("th",null,"option"),a.createElement("th",null,"alias"),a.createElement("th",null,"default"))),a.createElement("tbody",null,r?.prompts?.map((e=>a.createElement("tr",{key:e.name},a.createElement("td",null,e.name),a.createElement("td",null,e.message,a.createElement("br",null),a.createElement("span",{style:{color:"grey"}},!!e?.choices?.length&&`(${(e=>(e?.choices||[]).map((e=>e?.value||e)))(e).join(", ")})`)),a.createElement("td",{style:{whiteSpace:"nowrap"}},`--${e.name}`),a.createElement("td",{style:{whiteSpace:"nowrap"}},e?.aliases?.map((e=>1===e.length?`-${e}`:`--${e}`)).join(", ")),a.createElement("td",null,"function"==typeof e?.default?e?.default({}):e?.default?.toString())))))))}},41622:(e,t,n)=>{"use strict";n.d(t,{A:()=>d});var a=n(58168),o=n(96540),l=n(20053),r=n(92303),s=n(41422);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function p(e){return!!e&&("SUMMARY"===e.tagName||p(e.parentElement))}function c(e,t){return!!e&&(e===t||c(e.parentElement,t))}function u(e){let{summary:t,children:n,...u}=e;const m=(0,r.A)(),g=(0,o.useRef)(null),{collapsed:d,setCollapsed:y}=(0,s.u)({initialState:!u.open}),[h,f]=(0,o.useState)(u.open),w=o.isValidElement(t)?t:o.createElement("summary",null,t??"Details");return o.createElement("details",(0,a.A)({},u,{ref:g,open:h,"data-collapsed":d,className:(0,l.A)(i.details,m&&i.isBrowser,u.className),onMouseDown:e=>{p(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;p(t)&&c(t,g.current)&&(e.preventDefault(),d?(y(!1),f(!0)):y(!0))}}),w,o.createElement(s.N,{lazy:!1,collapsed:d,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{y(e),f(!e)}},o.createElement("div",{className:i.collapsibleContent},n)))}const m={details:"details_b_Ee"},g="alert alert--info";function d(e){let{...t}=e;return o.createElement(u,(0,a.A)({},t,{className:(0,l.A)(g,m.details,t.className)}))}},19365:(e,t,n)=>{"use strict";n.d(t,{A:()=>r});var a=n(96540),o=n(20053);const l={tabItem:"tabItem_Ymn6"};function r(e){let{children:t,hidden:n,className:r}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.A)(l.tabItem,r),hidden:n},t)}},11470:(e,t,n)=>{"use strict";n.d(t,{A:()=>N});var a=n(58168),o=n(96540),l=n(20053),r=n(23104),s=n(56347),i=n(57485),p=n(31682),c=n(89466);function u(e){return function(e){return o.Children.map(e,(e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:o}}=e;return{value:t,label:n,attributes:a,default:o}}))}function m(e){const{values:t,children:n}=e;return(0,o.useMemo)((()=>{const e=t??u(n);return function(e){const t=(0,p.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function g(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function d(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.W6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(l),(0,o.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function y(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=m(e),[r,s]=(0,o.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!g({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[i,p]=d({queryString:n,groupId:a}),[u,y]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.Dv)(n);return[a,(0,o.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),h=(()=>{const e=i??u;return g({value:e,tabValues:l})?e:null})();(0,o.useLayoutEffect)((()=>{h&&s(h)}),[h]);return{selectedValue:r,selectValue:(0,o.useCallback)((e=>{if(!g({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),p(e),y(e)}),[p,y,l]),tabValues:l}}var h=n(92303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function w(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:p}=e;const c=[],{blockElementScrollPositionUntilNextRender:u}=(0,r.a_)(),m=e=>{const t=e.currentTarget,n=c.indexOf(t),a=p[n].value;a!==s&&(u(t),i(a))},g=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":n},t)},p.map((e=>{let{value:t,label:n,attributes:r}=e;return o.createElement("li",(0,a.A)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:g,onClick:m},r,{className:(0,l.A)("tabs__item",f.tabItem,r?.className,{"tabs__item--active":s===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,o.cloneElement)(e,{className:"margin-top--md"}):null}return o.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function b(e){const t=y(e);return o.createElement("div",{className:(0,l.A)("tabs-container",f.tabList)},o.createElement(w,(0,a.A)({},e,t)),o.createElement(v,(0,a.A)({},e,t)))}function N(e){const t=(0,h.A)();return o.createElement(b,(0,a.A)({key:String(t)},e))}},45377:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>y,contentTitle:()=>g,default:()=>v,frontMatter:()=>m,metadata:()=>d,toc:()=>h});var a=n(58168),o=n(96540),l=n(15680),r=n(85174),s=n(83167),i=n(11470),p=n(19365),c=n(75489);const u=e=>{let{to:t,size:n,children:l,onClick:r,color:s="primary"}=e,i=`button button--${s}`;n&&(i=`${i} button--${n} `);const p={className:i,onClick:r,style:{textDecoration:"none"}};return t?o.createElement(c.A,(0,a.A)({to:t},p),l):o.createElement("button",(0,a.A)({type:"button"},p),l)},m={},g="react-component",d={unversionedId:"main/templates/react-component",id:"main/templates/react-component",title:"react-component",description:"If you're using our template and have ideas on how we can make it even better,",source:"@site/docs/main/templates/react-component.mdx",sourceDirName:"main/templates",slug:"/main/templates/react-component",permalink:"/templates/docs/main/templates/react-component",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/templates/react-component.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Templates",permalink:"/templates/docs/main/templates/"},next:{title:"yargs-cli-cmd",permalink:"/templates/docs/main/templates/yargs-cli-cmd"}},y={},h=[{value:"Usage",id:"usage",level:2},{value:"Installation",id:"installation",level:2},{value:"Options",id:"options",level:2},{value:"Copy",id:"copy",level:2},{value:"Examples",id:"examples",level:2},{value:"How to use",id:"how-to-use",level:3},{value:"How to use options",id:"how-to-use-options",level:3},{value:"No new folder",id:"no-new-folder",level:3},{value:"How to use with typescript",id:"how-to-use-with-typescript",level:3},{value:"Use all default answers",id:"use-all-default-answers",level:3}],f={toc:h},w="wrapper";function v(e){let{components:t,...n}=e;return(0,l.yg)(w,(0,a.A)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.yg)("h1",{id:"react-component"},"react-component"),(0,l.yg)("admonition",{title:"Now accepting new feature requests",type:"info"},(0,l.yg)("p",{parentName:"admonition"},"If you're using our template and have ideas on how we can make it even better,\nwe'd love to hear from you. Your feedback helps us prioritize improvements and\nbuild a tool that truly meets your needs."),(0,l.yg)("p",{parentName:"admonition"},"Feel free to submit feature requests, suggestions, or any thoughts you have\nusing the form below. We hope to hear from you soon!"),(0,l.yg)(u,{to:"https://github.com/marcellino-ornelas/templates/discussions/categories/react-component-feature-requests-feedback",size:"sm",onClick:()=>{"function"==typeof gtag&&gtag("event","feedback_request_click",{event_category:"Feedback",event_label:"react-template"})},mdxType:"Button"},"Submit feature request")),(0,l.yg)("div",{className:"row",style:{fontSize:20}},(0,l.yg)("div",{className:"col col--6"},"\ud83c\udf89 Supports Typescript"),(0,l.yg)("div",{className:"col col--6"},"\ud83d\udcd7 Supports Storybook"),(0,l.yg)("div",{className:"col col--6"},"\ud83e\uddea Supports Unit tests"),(0,l.yg)("div",{className:"col col--6"},"\ud83d\udc85 Supports multiple CSS languages")),(0,l.yg)("br",null),(0,l.yg)("p",null,"Generate a fully functioning React function component."),(0,l.yg)("h2",{id:"usage"},"Usage"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash",metastring:'title="Usage"',title:'"Usage"'},"tps react-component <component-name>\n\n# or long build path\n\ntps react-component path/to/dir/<component-name>\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt",metastring:'title="Creates"',title:'"Creates"'},"| - <component-name>\n    | - index.jsx (optional)\n    | - <component-name>.jsx\n    | - <component-name>.css (optional)\n    | - <component-name>.test.js (optional)\n    | - <component-name>.stories.jsx (optional)\n")),(0,l.yg)(s.R,{mdxType:"Example"},(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(p.A,{value:"default",mdxType:"TabItem"},(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav\n")),(0,l.yg)("p",null,"Will produces something like the following:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.jsx\n    | - Nav.jsx\n    | - Nav.css\n"))),(0,l.yg)(p.A,{value:"long build path",mdxType:"TabItem"},(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component src/components/Nav\n")),(0,l.yg)("p",null,"Produces:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - src/\n    | - components/\n        | - Nav\n            | - index.jsx\n            | - Nav.jsx\n            | - Nav.css\n"))))),(0,l.yg)("h2",{id:"installation"},"Installation"),(0,l.yg)("p",null,"This templates is a part of Templates library. If you've already installed\nTemplates, you'll have instant access to this template, and you can disregard\nthis command."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"npm i -g templates-mo\n")),(0,l.yg)("h2",{id:"options"},"Options"),(0,l.yg)(r.$,{template:"react-component",type:"js",mdxType:"TemplateOptions"}),(0,l.yg)("h2",{id:"copy"},"Copy"),(0,l.yg)("p",null,"If you like this template, but want to modify a few things use the copy command.\nIt allows you to duplicate the template into your project and tailor it to your\nneeds."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"# if your not initialized run\ntps init\n\n# copy template\ntps copy react-component\n")),(0,l.yg)("h2",{id:"examples"},"Examples"),(0,l.yg)("h3",{id:"how-to-use"},"How to use"),(0,l.yg)("p",null,"Lets say you have a basic react folder structure like so:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - src/\n        | - components/\n            | - ...\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,l.yg)("p",null,"If you wanted to generate a new component called ",(0,l.yg)("inlineCode",{parentName:"p"},"Nav")," in the components folder,\nyou could use the following command:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"> tps react-component src/components/Nav\n")),(0,l.yg)("p",null,"You will be prompted to answer the following questions:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre"},"? Would you like to use typescript?\n? What type of extension do you want for your component?\n? Would you like to include a css file?\n? What type of css extension would you like?\n? Would you like to include unit tests?\n? Would you like to include a index file?\n? Would you like to include a storybook file?\n")),(0,l.yg)("p",null,"Depending on the answers you provide it will generate something similar to the\nfollowing:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - <cwd>/\n    | - src/\n        | - components/\n            // highlight-start\n            | - Nav/\n                | - index.jsx\n                | - Nav.jsx\n                | - Nav.css\n            // highlight-end\n            | - ...\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,l.yg)("h3",{id:"how-to-use-options"},"How to use options"),(0,l.yg)("p",null,"The React component template offers various customization options, which are\nlisted in the ",(0,l.yg)("a",{parentName:"p",href:"#options"},"options")," table. These will be prompted to you when you\ncreate a new instance. However to save time and avoid answering the same\nquestions each time, you can set your answers ahead of time. You can do this\neither on the command line or in your ",(0,l.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")," file."),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(p.A,{value:"cli",mdxType:"TabItem"},(0,l.yg)("p",null,"Lets say your project always uses a ",(0,l.yg)("inlineCode",{parentName:"p"},"js")," extension for its components. You can\nadd ",(0,l.yg)("inlineCode",{parentName:"p"},"js")," to the ",(0,l.yg)("inlineCode",{parentName:"p"},"extension")," answer when creating a new instance and you will no\nlonger be prompted that question."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --extension=js\n")),(0,l.yg)("p",null,"Depending on the rest of your answers, it will generate something similar to the\nfollowing:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.js\n    | - Nav.js\n    | - Nav.css\n"))),(0,l.yg)(p.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,l.yg)("p",null,"If you havent already initialize your repo:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,l.yg)("p",null,"Lets say your project always uses a ",(0,l.yg)("inlineCode",{parentName:"p"},"js")," extension for its components. You can\nadd ",(0,l.yg)("inlineCode",{parentName:"p"},"js")," to the ",(0,l.yg)("inlineCode",{parentName:"p"},"extension")," answer. Now when creating a new instance and you\nwill no longer be prompted that question."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "extension": "js"\n        }\n    }\n}1\n')),(0,l.yg)("p",null,"Depending on the rest of your answers, it will generate something similar to the\nfollowing:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.js\n    | - Nav.js\n    | - Nav.css\n")))),(0,l.yg)("h3",{id:"no-new-folder"},"No new folder"),(0,l.yg)("p",null,"By default, templates creates a new folder for you. If you don't want a new\nfolder for your react component, you can use the\n",(0,l.yg)("a",{parentName:"p",href:"../../api/template#new-folder"},(0,l.yg)("inlineCode",{parentName:"a"},"newFolder"))," and\n",(0,l.yg)("a",{parentName:"p",href:"./react-component#options"},(0,l.yg)("inlineCode",{parentName:"a"},"index"))," options. These options both default to\n",(0,l.yg)("inlineCode",{parentName:"p"},"true"),"."),(0,l.yg)("p",null,"The ",(0,l.yg)("a",{parentName:"p",href:"../../api/template#new-folder"},(0,l.yg)("inlineCode",{parentName:"a"},"newFolder"))," option tells templates whether\nor not to place everything into a new folder."),(0,l.yg)("p",null,"The ",(0,l.yg)("a",{parentName:"p",href:"./react-component#options"},(0,l.yg)("inlineCode",{parentName:"a"},"index"))," option determines whether a ",(0,l.yg)("inlineCode",{parentName:"p"},"index"),"\nfile should be created."),(0,l.yg)("p",null,"Lets say you have a basic react folder structure like so:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - src/\n        // highlight-start\n        | - components/\n            | - Nav.jsx\n            | - Nav.css\n            // highlight-end\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,l.yg)("p",null,"If you wanted to generate a new component called ",(0,l.yg)("inlineCode",{parentName:"p"},"footer")," in the components\nfolder without a new folder, you can do one of the following:"),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(p.A,{value:"cli",mdxType:"TabItem"},(0,l.yg)("p",null,"You can pass in the following flags when your generating your new instance"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component footer --no-newFolder --no-index\n"))),(0,l.yg)(p.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,l.yg)("p",null,"You can add the following to your ",(0,l.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")," file to always avoid creating a\nnew folder when generating a React component in your repository directory and\nall its subdirectories."),(0,l.yg)("p",null,"If you havent already initialize your repo:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "index": false\n        },\n        "opts": {\n            "newFolder": false\n        }\n    }\n}\n')),(0,l.yg)("p",null,"Now when generating a new instance"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component footer\n")))),(0,l.yg)("p",null,"Depending on your answers, it would produce something to the following:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - src/\n        | - components/\n            | - nav.jsx\n            | - nav.css\n            // highlight-start\n            | - footer.jsx\n            | - footer.css\n            // highlight-end\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,l.yg)("h3",{id:"how-to-use-with-typescript"},"How to use with typescript"),(0,l.yg)("p",null,"When generating a new instance of this template you will be asked if you want to\nuse typescript. However if you know you want to use typescript in your project\nyou can do one of the following:"),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(p.A,{value:"cli",mdxType:"TabItem"},(0,l.yg)("p",null,"You can pass in the following flags when your generating your new instance and\nyou will no longer be prompted those questions"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --typescript --extension=tsx\n\n# or\n\ntps react-component Nav --typescript -e tsx\n")),(0,l.yg)("p",null,"Produces:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.tsx\n    | - Nav.tsx\n    | - Nav.css\n"))),(0,l.yg)(p.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,l.yg)("p",null,"You can add the following to your ",(0,l.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")," file to always use typescript\nwhen generating a react component in your repos directory and all its\nsubdirectories."),(0,l.yg)("p",null,"If you havent already initialize your repo:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "typescript": true,\n            "extension": "tsx"\n        }\n    }\n}\n')),(0,l.yg)("p",null,"Now when generating a new instance you no longer will be prompted for these two\nquestions or have to supply the two flags to the cli command"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav\n")),(0,l.yg)("p",null,"Would produce:"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.tsx\n    | - Nav.tsx\n    | - Nav.css\n")))),(0,l.yg)("h3",{id:"use-all-default-answers"},"Use all default answers"),(0,l.yg)("p",null,"To bypass all prompts and use default answers, simply include the ",(0,l.yg)("inlineCode",{parentName:"p"},"--default"),"\nflag when generating a new instance."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component --default\n")),(0,l.yg)("p",null,"You can also combined this with other flags and/or in conjunction with your\n",(0,l.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")),(0,l.yg)(i.A,{mdxType:"Tabs"},(0,l.yg)(p.A,{value:"cli",mdxType:"TabItem"},(0,l.yg)("p",null,"Use typescript and use defaults for the rest of the questions. This will no\nlonger prompt you any questions"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --typescript --default\n"))),(0,l.yg)(p.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,l.yg)("p",null,"If you have typescript set in your tpsrc file."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "typescript": true\n        }\n    }\n}\n')),(0,l.yg)("p",null,"Now when using defaults it will use the typescript, defaults for the rest of the\nquestions, and will no longer prompt any questions."),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --default\n")))))}v.isMDXComponent=!0},49867:(e,t,n)=>{var a={"./new-template/default/settings.json":[34033,3,4033],"./new-test/settings.json":[43137,3,3137],"./react-component/settings.js":[80543,7,543],"./yargs-cli-cmd/settings.js":[97572,7,7572]};function o(e){if(!n.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return n.e(t[2]).then((()=>n.t(o,16|t[1])))}o.keys=()=>Object.keys(a),o.id=49867,e.exports=o}}]);