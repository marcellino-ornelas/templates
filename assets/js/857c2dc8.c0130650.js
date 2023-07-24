"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[3974],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),i=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=i(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=i(n),d=r,g=u["".concat(s,".").concat(d)]||u[d]||m[d]||l;return n?a.createElement(g,o(o({ref:t},c),{},{components:n})):a.createElement(g,o({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[u]="string"==typeof e?e:r,o[1]=p;for(var i=2;i<l;i++)o[i]=n[i];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6539:(e,t,n)=>{n.d(t,{e:()=>l});var a=n(7294),r=n(4673);const l=e=>{let{children:t,open:n=!1,title:l=""}=e;const o=l?`Example: ${l}`:"Example";return a.createElement(r.Z,{summary:o,open:n},a.createElement("div",null,t))}},4673:(e,t,n)=>{n.d(t,{Z:()=>g});var a=n(7462),r=n(7294),l=n(6010),o=n(2389),p=n(6043);const s={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function i(e){return!!e&&("SUMMARY"===e.tagName||i(e.parentElement))}function c(e,t){return!!e&&(e===t||c(e.parentElement,t))}function u(e){let{summary:t,children:n,...u}=e;const m=(0,o.Z)(),d=(0,r.useRef)(null),{collapsed:g,setCollapsed:h}=(0,p.u)({initialState:!u.open}),[k,f]=(0,r.useState)(u.open),y=r.isValidElement(t)?t:r.createElement("summary",null,t??"Details");return r.createElement("details",(0,a.Z)({},u,{ref:d,open:k,"data-collapsed":g,className:(0,l.Z)(s.details,m&&s.isBrowser,u.className),onMouseDown:e=>{i(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;i(t)&&c(t,d.current)&&(e.preventDefault(),g?(h(!1),f(!0)):h(!0))}}),y,r.createElement(p.z,{lazy:!1,collapsed:g,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{h(e),f(!e)}},r.createElement("div",{className:s.collapsibleContent},n)))}const m={details:"details_b_Ee"},d="alert alert--info";function g(e){let{...t}=e;return r.createElement(u,(0,a.Z)({},t,{className:(0,l.Z)(d,m.details,t.className)}))}},5162:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294),r=n(6010);const l={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,o),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>w});var a=n(7462),r=n(7294),l=n(6010),o=n(2466),p=n(6550),s=n(1980),i=n(7392),c=n(12);function u(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function m(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??u(n);return function(e){const t=(0,i.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const a=(0,p.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=m(e),[o,p]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[s,i]=g({queryString:n,groupId:a}),[u,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),k=(()=>{const e=s??u;return d({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{k&&p(k)}),[k]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);p(e),i(e),h(e)}),[i,h,l]),tabValues:l}}var k=n(2389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function y(e){let{className:t,block:n,selectedValue:p,selectValue:s,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),m=e=>{const t=e.currentTarget,n=c.indexOf(t),a=i[n].value;a!==p&&(u(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},i.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:p===t?0:-1,"aria-selected":p===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:m},o,{className:(0,l.Z)("tabs__item",f.tabItem,o?.className,{"tabs__item--active":p===t})}),n??t)})))}function b(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function N(e){const t=h(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",f.tabList)},r.createElement(y,(0,a.Z)({},e,t)),r.createElement(b,(0,a.Z)({},e,t)))}function w(e){const t=(0,k.Z)();return r.createElement(N,(0,a.Z)({key:String(t)},e))}},163:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>m});var a=n(7462),r=(n(7294),n(3905)),l=n(6539),o=n(4866),p=n(5162);const s={sidebar_position:2},i="Template",c={unversionedId:"api/template",id:"api/template",title:"Template",description:"Options",source:"@site/docs/api/template.mdx",sourceDirName:"api",slug:"/api/template",permalink:"/templates/docs/api/template",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/template.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"api",previous:{title:"API Docs",permalink:"/templates/docs/api/"},next:{title:"Template Context",permalink:"/templates/docs/api/template-context"}},u={},m=[{value:"Options",id:"options",level:2},{value:"Extend Destination",id:"extend-destination",level:3},{value:"Wipe",id:"wipe",level:3},{value:"Force",id:"force",level:3},{value:"New Folder",id:"new-folder",level:3}],d={toc:m},g="wrapper";function h(e){let{components:t,...n}=e;return(0,r.kt)(g,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"template"},"Template"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"interface Template {\n  constructor(templateName: string, opts: TemplateOptions): Template;\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Templates('<template-name>', {\n  /* template options ... */\n});\n")),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Templates('react-component', {\n  wipe: true,\n});\n"))),(0,r.kt)("h2",{id:"options"},"Options"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"interface TemplateOptions {\n  extendDest?: string;\n  wipe?: boolean;\n  force?: boolean;\n  NewFolder?: boolean;\n}\n")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"extend-destination"},"Extend Destination"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"string;\n")),(0,r.kt)("p",null,"Optional path to add prepend to each\n",(0,r.kt)("a",{parentName:"p",href:"/docs/main/create-new-template/templates#what-is-rendering-a-template"},"build path"),"."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(p.Z,{value:"tpsrc",label:".tpsrc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    "opts": {\n      // highlight-next-line\n      "extendDest": "./path/to/some/directory"\n    }\n  }\n}\n'))),(0,r.kt)(p.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Templates('react-component', {\n  extendDest: './path/to/some/directory',\n});\n"))),(0,r.kt)(p.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,r.kt)("p",null,"Not suppported at the moment"))),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)("p",null,"Imagine being in a directory named ",(0,r.kt)("inlineCode",{parentName:"p"},"app")," and having a template named\n",(0,r.kt)("inlineCode",{parentName:"p"},"react-component"),". In this case, your directory structure might look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - app\n    | - .tps/\n        | - react-component/\n        | - .tpsrc\n    | - src/\n        | - <frontend-code...>\n")),(0,r.kt)("p",null,"Lets say all of our react components live inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"./src/")," folder. So if I\nwanted to render a new instance with the react component template, I would need\nto use a long build path."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps react-component src/Home\n")),(0,r.kt)("p",null,"Produces"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - app\n    | - .tps/\n        | - ...\n    | - src/\n        // highlight-next-line\n        | - Home/\n        | - ...\n")),(0,r.kt)("p",null,"However since you know all components will live in the ",(0,r.kt)("inlineCode",{parentName:"p"},"src")," folder you can\ninstead, add a ",(0,r.kt)("inlineCode",{parentName:"p"},"extendDest")," option to your ",(0,r.kt)("inlineCode",{parentName:"p"},".tpsrc")," file and add ",(0,r.kt)("inlineCode",{parentName:"p"},"src")," as the\nvalue."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(p.Z,{value:"tpsrc",label:".tpsrc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    "opts": {\n      // highlight-next-line\n      "extendDest": "./src"\n    }\n  }\n}\n'))),(0,r.kt)(p.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Templates('react-component', {\n  // highlight-next-line\n  extendDest: './src',\n});\n")))),(0,r.kt)("p",null,"Tps will now prepend the ",(0,r.kt)("inlineCode",{parentName:"p"},"src")," path to your build paths so well get the same\nresult as before but without adding ",(0,r.kt)("inlineCode",{parentName:"p"},"src")," to our build paths:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps react-component Home\n")),(0,r.kt)("p",null,"still produces"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - app\n    | - .tps/\n        | - ...\n    | - src/\n        // highlight-next-line\n        | - Home/\n        | - ...\n"))),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"wipe"},"Wipe"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"boolean;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Default"',title:'"Default"'},"false;\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"wipe")," option acts by deleting any existing build path directory before\nrendering your new template instance. This ensures a fresh start and avoids any\npotential conflicts during the rendering process."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(p.Z,{value:"tpsrc",label:".tpsrc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    "opts": {\n      // highlight-next-line\n      "wipe": true\n    }\n  }\n}\n'))),(0,r.kt)(p.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Templates('react-component', {\n  // highlight-next-line\n  wipe: true,\n});\n"))),(0,r.kt)(p.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps some-template app --wipe\n")))),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)("p",null,"Lets say you have the following directory structure"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - app\n    | - .tps/\n        | - ...\n    | - src/\n        // highlight-start\n        | - Home/\n            | - ...\n        // highlight-end\n")),(0,r.kt)("p",null,"If I was trying to rendering a new instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"react-component")," template and\ncalled this ",(0,r.kt)("inlineCode",{parentName:"p"},"Home"),", tps would error out because a ",(0,r.kt)("inlineCode",{parentName:"p"},"Home")," directory already\nexists. However if you add the ",(0,r.kt)("inlineCode",{parentName:"p"},"--wipe")," flag, tps will delete this directory\nfirst, then render your new instance in its place."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps react-component src/Home --wipe\n")),(0,r.kt)("p",null,"Will produce:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - app\n    | - .tps/\n        | - ...\n    | - src/\n        // highlight-start\n        | - Home/\n            | - <react-component template files ...>\n        // highlight-end\n"))),(0,r.kt)("h3",{id:"force"},"Force"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"boolean;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Default"',title:'"Default"'},"false;\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"force")," option makes sure that your new instance is created no matter what,\nsimilar to the ",(0,r.kt)("a",{parentName:"p",href:"#wipe"},"wipe")," option. However, instead of deleting the whole\ndirectory, it only replaces the conflicting files, so you don't lose any extra\nwork you may have added"),(0,r.kt)("p",null,"By default, templates will raise an error if there are any file or directory\nconflicts."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(p.Z,{value:"tpsrc",label:".tpsrc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    "opts": {\n      // highlight-next-line\n      "force": true\n    }\n  }\n}\n'))),(0,r.kt)(p.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Templates('react-component', {\n  // highlight-next-line\n  force: true,\n});\n"))),(0,r.kt)(p.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps some-template app --force\n")))),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)("p",null,"Lets say you have the following directory structure"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - app\n    | - .tps/\n        | - ...\n    | - src/\n        // highlight-start\n        | - Home/\n            | - ...\n        // highlight-end\n")),(0,r.kt)("p",null,"If I was trying to rendering a new instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"react-component")," template and\ncalled this ",(0,r.kt)("inlineCode",{parentName:"p"},"Home"),", tps would error out because a ",(0,r.kt)("inlineCode",{parentName:"p"},"Home")," directory already\nexists. However if you add the ",(0,r.kt)("inlineCode",{parentName:"p"},"--wipe")," flag, tps will delete this directory\nfirst, then render your new instance in its place."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps react-component src/Home --wipe\n")),(0,r.kt)("p",null,"Will produce:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - app\n    | - .tps/\n        | - ...\n    | - src/\n        // highlight-start\n        | - Home/\n            | - <react-component template files ...>\n        // highlight-end\n"))),(0,r.kt)("h3",{id:"new-folder"},"New Folder"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"boolean;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Default"',title:'"Default"'},"true;\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"newFolder")," option will create a new folder and put all the template\ncontents inside it. This new folder will share the same name as your new\ntemplate instance, providing a neatly organized structure for your project. This\nis how templates behaves by default"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"This feature becomes particularly useful when you already have a directory set\nup and prefer not to create a brand new one from scratch. By using the\n",(0,r.kt)("inlineCode",{parentName:"p"},"newFolder")," option, you can seamlessly integrate the template contents into your\nexisting directory, making it a convenient choice for projects that are already\nin progress.")),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(p.Z,{value:"tpsrc",label:".tpsrc",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".tpsrc"',title:'".tpsrc"'},'{\n  "react-component": {\n    "opts": {\n      // highlight-next-line\n      "newFolder": false\n    }\n  }\n}\n'))),(0,r.kt)(p.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new Templates('react-component', {\n  // highlight-next-line\n  newFolder: false,\n});\n"))),(0,r.kt)(p.Z,{value:"cli",label:"CLI",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --no-newFolder\n")))),(0,r.kt)(l.e,{title:"New folder",mdxType:"Example"},(0,r.kt)("p",null,"If I was trying to rendering a new instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"express-app")," template and called\nthis ",(0,r.kt)("inlineCode",{parentName:"p"},"app"),", tps would create a new directory for me named ",(0,r.kt)("inlineCode",{parentName:"p"},"app")," and place all\ncontents inside of it"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps express-app app\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - coding <---cwd\n    // highlight-start\n    | - app\n        | - <express-app contents ...>\n    // highlight-end\n"))),(0,r.kt)(l.e,{title:"No New folder",mdxType:"Example"},(0,r.kt)("p",null,"If I was trying to rendering a new instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"express-app")," template and called\nthis ",(0,r.kt)("inlineCode",{parentName:"p"},"app")," however I didnt want a new folder then it would produce the\nfollowing:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"tps express-app app --no-newFolder\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - coding <---cwd\n    // highlight-start\n    | - <express-app contents ...>\n    // highlight-end\n")),(0,r.kt)("p",null,"Notice how this no longer creates a ",(0,r.kt)("inlineCode",{parentName:"p"},"app")," directory.")))}h.isMDXComponent=!0}}]);