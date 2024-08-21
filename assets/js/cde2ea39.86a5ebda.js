"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[209],{58829:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var a=n(74848),r=n(28453),s=n(11470),i=n(19365);const l={pagination_next:"main/create-new-template/prompts",pagination_prev:"main/create-new-template/dynamic-files",sidebar_position:4},o="Settings File",u={id:"main/create-new-template/settings",title:"Settings File",description:"Tps allows you to have a settings file in your template to add certain",source:"@site/docs/main/create-new-template/settings.mdx",sourceDirName:"main/create-new-template",slug:"/main/create-new-template/settings",permalink:"/templates/docs/main/create-new-template/settings",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/create-new-template/settings.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{pagination_next:"main/create-new-template/prompts",pagination_prev:"main/create-new-template/dynamic-files",sidebar_position:4},sidebar:"docs",previous:{title:"Dynamic Files",permalink:"/templates/docs/main/create-new-template/dynamic-files"},next:{title:"Prompting",permalink:"/templates/docs/main/create-new-template/prompts"}},c={},d=[{value:"Settings options",id:"settings-options",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"settings-file",children:"Settings File"})}),"\n",(0,a.jsxs)(t.p,{children:["Tps allows you to have a settings file in your template to add certain\nactions/configurations when generating your template. The settings file can be a\n",(0,a.jsx)(t.code,{children:"settings.json"})," or ",(0,a.jsx)(t.code,{children:"settings.js"})," in your template folder at the same level as\nyour packages. The main use for this file is prompting but well be adding more\nfeatures very soon."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - .tps\n    | - some-template\n        // highlight-next-line\n        | - settings.json\n        | - default\n            | - <files...>\n"})}),"\n",(0,a.jsxs)(s.A,{children:[(0,a.jsx)(i.A,{value:"json",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",metastring:'title="settings.json"',children:"{}\n"})})}),(0,a.jsxs)(i.A,{value:"js",children:[(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-js",metastring:'title="settings.js"',children:"module.exports = {};\n"})}),(0,a.jsx)(t.admonition,{type:"warning",children:(0,a.jsxs)(t.p,{children:["Please note that ",(0,a.jsx)(t.code,{children:"export default"})," has not been thoroughly tested and may not\nperform as anticipated. If you encounter any issues or have suggestions for\nimprovement, we encourage you to file an issue or submit a pull request (PR). We\ngreatly value contributions and welcome any input you may have."]})})]})]}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsxs)(t.p,{children:["Our ",(0,a.jsx)(t.a,{href:"../../api/cli#new-template",children:(0,a.jsx)(t.code,{children:"new template"})})," command creates this file for\nyou \ud83d\ude03"]})}),"\n",(0,a.jsx)(t.h2,{id:"settings-options",children:"Settings options"}),"\n",(0,a.jsxs)(t.p,{children:["You can explore the complete list of available fields for a settings file in the\ncomprehensive ",(0,a.jsx)(t.a,{href:"../../api/settings",children:"Settings File API Documentation"}),". This guide\nwill cover the following topics:"]}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"./prompts",children:"Prompting"})}),"\n"]})]})}function m(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},19365:(e,t,n)=>{n.d(t,{A:()=>i});n(96540);var a=n(18215);const r={tabItem:"tabItem_Ymn6"};var s=n(74848);function i(e){let{children:t,hidden:n,className:i}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.A)(r.tabItem,i),hidden:n,children:t})}},11470:(e,t,n)=>{n.d(t,{A:()=>w});var a=n(96540),r=n(18215),s=n(23104),i=n(56347),l=n(205),o=n(57485),u=n(31682),c=n(70679);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}(n);return function(e){const t=(0,u.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const r=(0,i.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o.aZ)(s),(0,a.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(r.location.search);t.set(s,e),r.replace({...r.location,search:t.toString()})}),[s,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,s=p(e),[i,o]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:s}))),[u,d]=h({queryString:n,groupId:r}),[f,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,s]=(0,c.Dv)(n);return[r,(0,a.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:r}),b=(()=>{const e=u??f;return m({value:e,tabValues:s})?e:null})();(0,l.A)((()=>{b&&o(b)}),[b]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),g(e)}),[d,g,s]),tabValues:s}}var g=n(92303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=n(74848);function x(e){let{className:t,block:n,selectedValue:a,selectValue:i,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,s.a_)(),c=e=>{const t=e.currentTarget,n=o.indexOf(t),r=l[n].value;r!==a&&(u(t),i(r))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=o[n]??o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;t=o[n]??o[o.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>o.push(e),onKeyDown:d,onClick:c,...s,className:(0,r.A)("tabs__item",b.tabItem,s?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function j(e){let{lazy:t,children:n,selectedValue:s}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===s));return e?(0,a.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function y(e){const t=f(e);return(0,v.jsxs)("div",{className:(0,r.A)("tabs-container",b.tabList),children:[(0,v.jsx)(x,{...t,...e}),(0,v.jsx)(j,{...t,...e})]})}function w(e){const t=(0,g.A)();return(0,v.jsx)(y,{...e,children:d(e.children)},String(t))}},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>l});var a=n(96540);const r={},s=a.createContext(r);function i(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);