"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[4624],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,f=p["".concat(s,".").concat(d)]||p[d]||m[d]||l;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:r,o[1]=i;for(var u=2;u<l;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6539:(e,t,n)=>{n.d(t,{e:()=>l});var a=n(7294),r=n(4673);const l=e=>{let{children:t,open:n=!1,title:l=""}=e;const o=l?`Example: ${l}`:"Example";return a.createElement(r.Z,{summary:o,open:n},a.createElement("div",null,t))}},4673:(e,t,n)=>{n.d(t,{Z:()=>f});var a=n(7462),r=n(7294),l=n(6010),o=n(2389),i=n(6043);const s={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function u(e){return!!e&&("SUMMARY"===e.tagName||u(e.parentElement))}function c(e,t){return!!e&&(e===t||c(e.parentElement,t))}function p(e){let{summary:t,children:n,...p}=e;const m=(0,o.Z)(),d=(0,r.useRef)(null),{collapsed:f,setCollapsed:g}=(0,i.u)({initialState:!p.open}),[b,y]=(0,r.useState)(p.open),v=r.isValidElement(t)?t:r.createElement("summary",null,t??"Details");return r.createElement("details",(0,a.Z)({},p,{ref:d,open:b,"data-collapsed":f,className:(0,l.Z)(s.details,m&&s.isBrowser,p.className),onMouseDown:e=>{u(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;u(t)&&c(t,d.current)&&(e.preventDefault(),f?(g(!1),y(!0)):g(!0))}}),v,r.createElement(i.z,{lazy:!1,collapsed:f,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),y(!e)}},r.createElement("div",{className:s.collapsibleContent},n)))}const m={details:"details_b_Ee"},d="alert alert--info";function f(e){let{...t}=e;return r.createElement(p,(0,a.Z)({},t,{className:(0,l.Z)(d,m.details,t.className)}))}},5162:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294),r=n(6010);const l={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,o),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>k});var a=n(7462),r=n(7294),l=n(6010),o=n(2466),i=n(6550),s=n(1980),u=n(7392),c=n(12);function p(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function m(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,i.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=m(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[s,u]=f({queryString:n,groupId:a}),[p,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),b=(()=>{const e=s??p;return d({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{b&&i(b)}),[b]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),g(e)}),[u,g,l]),tabValues:l}}var b=n(2389);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){let{className:t,block:n,selectedValue:i,selectValue:s,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,o.o5)(),m=e=>{const t=e.currentTarget,n=c.indexOf(t),a=u[n].value;a!==i&&(p(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:m},o,{className:(0,l.Z)("tabs__item",y.tabItem,o?.className,{"tabs__item--active":i===t})}),n??t)})))}function h(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function w(e){const t=g(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",y.tabList)},r.createElement(v,(0,a.Z)({},e,t)),r.createElement(h,(0,a.Z)({},e,t)))}function k(e){const t=(0,b.Z)();return r.createElement(w,(0,a.Z)({key:String(t)},e))}},9015:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>f,frontMatter:()=>i,metadata:()=>u,toc:()=>p});var a=n(7462),r=(n(7294),n(3905)),l=(n(6539),n(4866)),o=n(5162);const i={pagination_next:"main/create-new-template/prompts",pagination_prev:"main/create-new-template/dynamic-files",sidebar_position:4},s="Settings File",u={unversionedId:"main/create-new-template/settings",id:"main/create-new-template/settings",title:"Settings File",description:"Tps allows you to have a settings file in your template to add certain",source:"@site/docs/main/create-new-template/settings.mdx",sourceDirName:"main/create-new-template",slug:"/main/create-new-template/settings",permalink:"/templates/docs/main/create-new-template/settings",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/create-new-template/settings.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{pagination_next:"main/create-new-template/prompts",pagination_prev:"main/create-new-template/dynamic-files",sidebar_position:4},sidebar:"docs",previous:{title:"Dynamic Files",permalink:"/templates/docs/main/create-new-template/dynamic-files"},next:{title:"Prompting",permalink:"/templates/docs/main/create-new-template/prompts"}},c={},p=[{value:"Settings options",id:"settings-options",level:2}],m={toc:p},d="wrapper";function f(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"settings-file"},"Settings File"),(0,r.kt)("p",null,"Tps allows you to have a settings file in your template to add certain\nactions/configurations when generating your template. The settings file can be a\n",(0,r.kt)("inlineCode",{parentName:"p"},"settings.json")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"settings.js")," in your template folder at the same level as\nyour packages. The main use for this file is prompting but well be adding more\nfeatures very soon."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"| - .tps\n    | - some-template\n        // highlight-next-line\n        | - settings.json\n        | - default\n            | - <files...>\n")),(0,r.kt)(l.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"json",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},"{}\n"))),(0,r.kt)(o.Z,{value:"js",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="settings.js"',title:'"settings.js"'},"module.exports = {};\n")),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"Please note that ",(0,r.kt)("inlineCode",{parentName:"p"},"export default")," has not been thoroughly tested and may not\nperform as anticipated. If you encounter any issues or have suggestions for\nimprovement, we encourage you to file an issue or submit a pull request (PR). We\ngreatly value contributions and welcome any input you may have.")))),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Our ",(0,r.kt)("a",{parentName:"p",href:"../../api/cli#new-template"},(0,r.kt)("inlineCode",{parentName:"a"},"new template"))," command creates this file for\nyou \ud83d\ude03")),(0,r.kt)("h2",{id:"settings-options"},"Settings options"),(0,r.kt)("p",null,"You can explore the complete list of available fields for a settings file in the\ncomprehensive ",(0,r.kt)("a",{parentName:"p",href:"../../api/settings"},"Settings File API Documentation"),". This guide\nwill cover the following topics:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./prompts"},"Prompting"))))}f.isMDXComponent=!0}}]);