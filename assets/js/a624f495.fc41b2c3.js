"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[9942],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=l,h=d["".concat(o,".").concat(m)]||d[m]||u[m]||r;return n?a.createElement(h,i(i({ref:t},c),{},{components:n})):a.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=m;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[d]="string"==typeof e?e:l,i[1]=s;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6539:(e,t,n)=>{n.d(t,{e:()=>r});var a=n(7294),l=n(4673);const r=e=>{let{children:t,open:n=!1,title:r=""}=e;const i=r?`Example: ${r}`:"Example";return a.createElement(l.Z,{summary:i,open:n},a.createElement("div",null,t))}},4673:(e,t,n)=>{n.d(t,{Z:()=>h});var a=n(7462),l=n(7294),r=n(6010),i=n(2389),s=n(6043);const o={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function p(e){return!!e&&("SUMMARY"===e.tagName||p(e.parentElement))}function c(e,t){return!!e&&(e===t||c(e.parentElement,t))}function d(e){let{summary:t,children:n,...d}=e;const u=(0,i.Z)(),m=(0,l.useRef)(null),{collapsed:h,setCollapsed:g}=(0,s.u)({initialState:!d.open}),[f,k]=(0,l.useState)(d.open),b=l.isValidElement(t)?t:l.createElement("summary",null,t??"Details");return l.createElement("details",(0,a.Z)({},d,{ref:m,open:f,"data-collapsed":h,className:(0,r.Z)(o.details,u&&o.isBrowser,d.className),onMouseDown:e=>{p(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;p(t)&&c(t,m.current)&&(e.preventDefault(),h?(g(!1),k(!0)):g(!0))}}),b,l.createElement(s.z,{lazy:!1,collapsed:h,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),k(!e)}},l.createElement("div",{className:o.collapsibleContent},n)))}const u={details:"details_b_Ee"},m="alert alert--info";function h(e){let{...t}=e;return l.createElement(d,(0,a.Z)({},t,{className:(0,r.Z)(m,u.details,t.className)}))}},5162:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294),l=n(6010);const r={tabItem:"tabItem_Ymn6"};function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,l.Z)(r.tabItem,i),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>v});var a=n(7462),l=n(7294),r=n(6010),i=n(2466),s=n(6550),o=n(1980),p=n(7392),c=n(12);function d(e){return function(e){return l.Children.map(e,(e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:l}}=e;return{value:t,label:n,attributes:a,default:l}}))}function u(e){const{values:t,children:n}=e;return(0,l.useMemo)((()=>{const e=t??d(n);return function(e){const t=(0,p.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.k6)(),r=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o._X)(r),(0,l.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(a.location.search);t.set(r,e),a.replace({...a.location,search:t.toString()})}),[r,a])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,r=u(e),[i,s]=(0,l.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:r}))),[o,p]=h({queryString:n,groupId:a}),[d,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,r]=(0,c.Nk)(n);return[a,(0,l.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:a}),f=(()=>{const e=o??d;return m({value:e,tabValues:r})?e:null})();(0,l.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:i,selectValue:(0,l.useCallback)((e=>{if(!m({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);s(e),p(e),g(e)}),[p,g,r]),tabValues:r}}var f=n(2389);const k={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:t,block:n,selectedValue:s,selectValue:o,tabValues:p}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,i.o5)(),u=e=>{const t=e.currentTarget,n=c.indexOf(t),a=p[n].value;a!==s&&(d(t),o(a))},m=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":n},t)},p.map((e=>{let{value:t,label:n,attributes:i}=e;return l.createElement("li",(0,a.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:u},i,{className:(0,r.Z)("tabs__item",k.tabItem,i?.className,{"tabs__item--active":s===t})}),n??t)})))}function w(e){let{lazy:t,children:n,selectedValue:a}=e;const r=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=r.find((e=>e.props.value===a));return e?(0,l.cloneElement)(e,{className:"margin-top--md"}):null}return l.createElement("div",{className:"margin-top--md"},r.map(((e,t)=>(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function y(e){const t=g(e);return l.createElement("div",{className:(0,r.Z)("tabs-container",k.tabList)},l.createElement(b,(0,a.Z)({},e,t)),l.createElement(w,(0,a.Z)({},e,t)))}function v(e){const t=(0,f.Z)();return l.createElement(y,(0,a.Z)({key:String(t)},e))}},7831:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>p,default:()=>g,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var a=n(7462),l=(n(7294),n(3905)),r=n(6539),i=n(4866),s=n(5162);const o={pagination_next:"main/create-new-template/packages",pagination_prev:"main/create-new-template/index",sidebar_position:1},p="Templates",c={unversionedId:"main/create-new-template/templates",id:"main/create-new-template/templates",title:"Templates",description:"We will be referring to `` in our guide to represent any directory.",source:"@site/docs/main/create-new-template/templates.mdx",sourceDirName:"main/create-new-template",slug:"/main/create-new-template/templates",permalink:"/templates/docs/main/create-new-template/templates",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/create-new-template/templates.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{pagination_next:"main/create-new-template/packages",pagination_prev:"main/create-new-template/index",sidebar_position:1},sidebar:"docs",previous:{title:"Creating new templates",permalink:"/templates/docs/main/create-new-template/"},next:{title:"Packages",permalink:"/templates/docs/main/create-new-template/packages"}},d={},u=[{value:"Where do templates live",id:"where-do-templates-live",level:2},{value:"Packages",id:"packages",level:2},{value:"Settings file",id:"settings-file",level:2},{value:"Dynamic files",id:"dynamic-files",level:2},{value:"Making a new template",id:"making-a-new-template",level:2},{value:"Generating a new instance",id:"generating-a-new-instance",level:2},{value:"What is a new instance",id:"what-is-a-new-instance",level:3},{value:"Single build path",id:"single-build-path",level:3},{value:"Long build path",id:"long-build-path",level:3},{value:"Multiple build paths",id:"multiple-build-paths",level:3},{value:"How to generate a new instance",id:"how-to-generate-a-new-instance",level:3}],m={toc:u},h="wrapper";function g(e){let{components:t,...n}=e;return(0,l.kt)(h,(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"templates"},"Templates"),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{parentName:"admonition"},"We will be referring to ",(0,l.kt)("inlineCode",{parentName:"p"},"<some-name>")," in our guide to represent any directory.")),(0,l.kt)("p",null,"A tps template is a collection of folders and files that acts as a blueprint for\nrecreating identical file structures in different locations. Think of this as a\ngoogle doc template but for files and folders. When generating a new instance of\nthis template, all files and directories within the template folder are rendered\ninto the your new instance's directory. Tps also supports conditionally rending\nfiles and folders and dynamiclly rendering files and folders."),(0,l.kt)("p",null,"Don't worry about all this right now! More will be discussed later on. First,\nlet's start with the basics."),(0,l.kt)("h2",{id:"where-do-templates-live"},"Where do templates live"),(0,l.kt)("p",null,"All templates need to live in a ",(0,l.kt)("inlineCode",{parentName:"p"},".tps")," folder. Subdirectories of the ",(0,l.kt)("inlineCode",{parentName:"p"},".tps"),"\ndirectory are your templates. You may have as many templates as you wish."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"| - .tps/\n    // highlight-next-line\n    | - <templates...>/\n")),(0,l.kt)(r.e,{mdxType:"Example"},(0,l.kt)("p",null,"If I were to make a new template called ",(0,l.kt)("inlineCode",{parentName:"p"},"react-component")," then my folder\nstructure would look like this:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"| - .tps/\n    | - react-component/\n"))),(0,l.kt)("h2",{id:"packages"},"Packages"),(0,l.kt)("p",null,"Inside of each ",(0,l.kt)("inlineCode",{parentName:"p"},"template")," you can have directories referred to as ",(0,l.kt)("inlineCode",{parentName:"p"},"packages"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"| - .tps/\n    | - <template>/\n        // highlight-next-line\n        | - <packages...>/\n")),(0,l.kt)("p",null,"Within each package directory, you have the freedom to add an unlimited number\nof files and directories. These resources will then be utilized when generating\na new instance of your template. You can name packages anything you wish, but\nTPS treats the ",(0,l.kt)("inlineCode",{parentName:"p"},"default")," package as special. When rendering a new instance of a\ntemplate, TPS will automatically include all the contents ",(0,l.kt)("em",{parentName:"p"},"(files/directories)"),"\nwithin your ",(0,l.kt)("inlineCode",{parentName:"p"},"default")," package. All other packages will only be included if\nexplicitly specified."),(0,l.kt)(r.e,{open:!0,mdxType:"Example"},(0,l.kt)("p",null,"Lets say we have a template called ",(0,l.kt)("inlineCode",{parentName:"p"},"node-server"),". This template is responsible\nfor setting up a brand new node webserver with all the bells and whistles\nincluded."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"| - .tps/\n    | - node-server/\n        | - default/\n            // highlight-start\n            | - server.js\n            | - package.json\n            // highlight-end\n")),(0,l.kt)("p",null,'let\'s say today we had a new idea for a trash removal company called "Trash\nRemoval". If we wanted to build a new website for this company we can generate a\nnew instance of ',(0,l.kt)("inlineCode",{parentName:"p"},"node-server")," called ",(0,l.kt)("inlineCode",{parentName:"p"},"trash-removal"),". When templates generates\nthis new instance it will create a new directory called ",(0,l.kt)("inlineCode",{parentName:"p"},"trash-removal")," and\ngenerate copies of all files/directories inside the template's ",(0,l.kt)("inlineCode",{parentName:"p"},"default"),"\ndirectory and place them into the new ",(0,l.kt)("inlineCode",{parentName:"p"},"trash-removal")," directory it just created."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"// highlight-start\n| - trash-removal/\n    | - server.js\n    | - package.json\n// highlight-end\n"))),(0,l.kt)("p",null,"Dont worry more will be covered on this in our ",(0,l.kt)("a",{parentName:"p",href:"./packages"},"next section")," of\nthis guide:"),(0,l.kt)("h2",{id:"settings-file"},"Settings file"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"| - .tps/\n    | - <template>/\n        // highlight-next-line\n        | - settings.json\n")),(0,l.kt)("p",null,"A template can optionally have a settings file where you can define prompts and\nother configuration details. The settings file will be discussed in more detail\nlater in this guide."),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{parentName:"admonition"},"You can learn more about the settings file in our\n",(0,l.kt)("a",{parentName:"p",href:"./settings"},"settings file guide"))),(0,l.kt)("h2",{id:"dynamic-files"},"Dynamic files"),(0,l.kt)("p",null,"Within each package, you can use dynamic files. Dynamic files are files that end\nwith a ",(0,l.kt)("inlineCode",{parentName:"p"},".dot")," extension. These files enable you to leverage all the features\nprovided by ",(0,l.kt)("a",{parentName:"p",href:"http://olado.github.io/doT/index.html"},"doT")," within tps."),(0,l.kt)("p",null,"Dynamic files provide the capability to pass data and enhance the power of\ndynamic rendering. By utilizing this data, you can leverage the features of doT\nto conditionally render specific sections of code or perform other dynamic\noperations. This allows for more flexibility and customization in your\ntemplates."),(0,l.kt)("h2",{id:"making-a-new-template"},"Making a new template"),(0,l.kt)("p",null,"There is nothing special about a template. Its nothing other than a directory\nholding a collection of files and folders. We could create a template two ways:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Use our command line tool ",(0,l.kt)("em",{parentName:"li"},"(recommended)")),(0,l.kt)("li",{parentName:"ol"},"Create the directories and files with ",(0,l.kt)("inlineCode",{parentName:"li"},"mkdir/touch")," or use Finder etc.")),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{parentName:"admonition"},"Read more about our command line docs ",(0,l.kt)("a",{parentName:"p",href:"../../api/cli"},"here"))),(0,l.kt)(i.Z,{mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"tps",label:"tps cli",default:!0,mdxType:"TabItem"},(0,l.kt)("p",null,"Our command line tools will create the ",(0,l.kt)("inlineCode",{parentName:"p"},"default")," folder for you."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"tps new template <template-name>\n")),(0,l.kt)("admonition",{type:"note"},(0,l.kt)("p",{parentName:"admonition"},"Read more about our ",(0,l.kt)("inlineCode",{parentName:"p"},"new")," command more ",(0,l.kt)("a",{parentName:"p",href:"../../api/cli#new"},"here")))),(0,l.kt)(s.Z,{value:"bash",label:"bash",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir .tps/<template-name>\n\nmkdir .tps/<template-name>/default\n")))),(0,l.kt)("h2",{id:"generating-a-new-instance"},"Generating a new instance"),(0,l.kt)("h3",{id:"what-is-a-new-instance"},"What is a new instance"),(0,l.kt)("p",null,"Generating a new instance of a template, also known as template instantiation or\nthe template instantiation process, refers to the action of utilizing a template\nas a starting point to create a new instance. It involves rendering the files\nand folders from the template folder and transferring them to the ",(0,l.kt)("strong",{parentName:"p"},"build\npath(s)"),"."),(0,l.kt)("br",null),(0,l.kt)("br",null),(0,l.kt)("mermaid",{value:'graph LR;\n    step1("User generates a\n\tnew instance")\n    step2("Tps loads all files\n    and folders from packages")\n    step3("Tps creates a directory\n    for the passed build path")\n    step4("Creates all needed files and\n    folders inside each build path")\n    step1--\x3estep2;\n    step2--\x3estep3;\n    step3--\x3estep4;'}),(0,l.kt)("br",null),(0,l.kt)("br",null),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"build path")," is the information you provide to TPS to specify the location\nand details of the new template to be created. It can be thought of as the name\nor identifier for the new template. When TPS receives the build path, it creates\na directory with that name and renders all the files and folders from your\ntemplate packages into this newly created directory. In essence, the build path\nacts as a directive to TPS, guiding it in assembling the new template by\norganizing the appropriate files and folders in the designated directory."),(0,l.kt)("h3",{id:"single-build-path"},"Single build path"),(0,l.kt)("p",null,"When the build path is a single word, tps utilizes it as the name for your new\ninstance. It then generates a fresh directory with the given name within the\ncurrent directory you are in, and proceeds to render all contents within the\nnewly created directory."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"// highlight-next-line\napp\n|__|\n ^ Build path & template name\n")),(0,l.kt)(r.e,{mdxType:"Example"},(0,l.kt)("p",null,"If we were generating a new instance from a template and we have the build path\n",(0,l.kt)("inlineCode",{parentName:"p"},"app")," then templates will create a new directory called ",(0,l.kt)("inlineCode",{parentName:"p"},"app")," and render all\ncontents inside of it"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Template structure"',title:'"Template','structure"':!0},"| - .tps/\n    // highlight-start\n    | - node-server/\n        | - default/\n            | - server.js\n            | - package.json\n    // highlight-end\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Rendered instance"',title:'"Rendered','instance"':!0},"// highlight-start\n| - app/\n    | - server.js\n    | - package.json\n// highlight-end\n"))),(0,l.kt)("h3",{id:"long-build-path"},"Long build path"),(0,l.kt)("p",null,"If you give tps a long build path, it uses it as the path to create your new\ntemplate. The last word becomes the template name, and the words before that\nshow which directory you want the new instance to be in. If the directory doesnt\nexist, tps will create it."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"// highlight-next-line\nsome/path/app\n          |__| <- template name\n|____________|\n    ^ Build path\n")),(0,l.kt)(r.e,{mdxType:"Example"},(0,l.kt)("p",null,"If we were generating a new instance from a template and we have the build path\n",(0,l.kt)("inlineCode",{parentName:"p"},"code/projects/app")," then templates will create a new directory called ",(0,l.kt)("inlineCode",{parentName:"p"},"app"),"\ninside of ",(0,l.kt)("inlineCode",{parentName:"p"},"<cwd>/code/projects")," and render all contents inside of it."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Template structure"',title:'"Template','structure"':!0},"| - .tps/\n    // highlight-start\n    | - node-server/\n        | - default/\n            | - server.js\n            | - package.json\n    // highlight-end\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Rendered instance"',title:'"Rendered','instance"':!0},"|- code\n    |- projects\n        // highlight-start\n        | - app/\n            | - server.js\n            | - package.json\n        // highlight-end\n"))),(0,l.kt)("h3",{id:"multiple-build-paths"},"Multiple build paths"),(0,l.kt)("p",null,"You can also pass in multiple build paths at the same time. This is going to be\nthe same as passing in one but for each one."),(0,l.kt)(r.e,{mdxType:"Example"},(0,l.kt)("p",null,"If we were generating a new instance from a template and we have the build paths\n",(0,l.kt)("inlineCode",{parentName:"p"},"code/projects/app")," & ",(0,l.kt)("inlineCode",{parentName:"p"},"code/projects/app2")," then templates will create new\ndirectories for both and render contents into both of them."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Template structure"',title:'"Template','structure"':!0},"| - .tps/\n    // highlight-start\n    | - node-server/\n        | - default/\n            | - server.js\n            | - package.json\n    // highlight-end\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="Rendered instance"',title:'"Rendered','instance"':!0},"|- code\n    |- projects\n        // highlight-start\n        | - app/\n            | - server.js\n            | - package.json\n        | - app2/\n            | - server.js\n            | - package.json\n        // highlight-end\n"))),(0,l.kt)("h3",{id:"how-to-generate-a-new-instance"},"How to generate a new instance"),(0,l.kt)("p",null,"There are two ways on how to generate a new instance of a template. One is via\nour command line tool or by our ",(0,l.kt)("inlineCode",{parentName:"p"},"node_module")," package. We wont go deep into this\ntopic right now but here are some basics."),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"<template-to-use>")," is the name of the template you would like to use."),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"Not sure what templates you have? Check out our ",(0,l.kt)("a",{parentName:"p",href:"../../api/cli#list"},"list command"))),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"<build-paths...>")," is the location/name of where you want your new rendered\ntemplate to go"),(0,l.kt)(i.Z,{groupId:"cli-node",mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"tps",label:"tps cli",default:!0,mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# create command\n\ntps create --use=<template-to-use> <build-paths...>\n\n# or use command\n\ntps <template-to-use> <build-paths...>\n"))),(0,l.kt)(s.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"const Templates = require('tps');\n\nconst tps = new Templates('<template-to-use>');\n// ^ In js pass in the name to the template here\n\nconst buildPaths = ['<build-paths...>'];\n// ^ In js build paths should always be an array\n\ntps.render('<some-directory-path>', buildPaths);\n// ^ In js we need to add a path to some directory so tps has a\n// starting directory. tps cli tools uses this node module\n// underneath the hood and uses the terminals current working\n// directory as the `<some-directory-path>` path\n")))),(0,l.kt)("hr",null),(0,l.kt)(r.e,{title:"One Build Path",open:!0,mdxType:"Example"},(0,l.kt)(i.Z,{groupId:"cli-node",mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"tps",label:"tps cli",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# create command\n\ntps create --use=express-template app\n\n# or use command\n\ntps express-template app\n\n"))),(0,l.kt)(s.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const Templates = require('tps');\n\nconst tps = new Templates('express-template');\n\nconst buildPaths = ['app'];\n\ntps.render(process.cwd(), buildPaths);\n"))))),(0,l.kt)(r.e,{title:"Long Build Path",mdxType:"Example"},(0,l.kt)(i.Z,{groupId:"cli-node",mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"tps",label:"tps cli",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# create command\n\ntps create --use=express-template projects/app\n\n# or use command\n\ntps express-template projects/app\n"))),(0,l.kt)(s.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const Templates = require('tps');\n\nconst tps = new Templates('express-template');\n\nconst buildPaths = ['projects/app'];\n\ntps.render(process.cwd(), buildPaths);\n"))))),(0,l.kt)(r.e,{title:"multiple build path",mdxType:"Example"},(0,l.kt)(i.Z,{groupId:"cli-node",mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"tps",label:"tps cli",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# create command\n\ntps create --use=express-template app project/app app2\n\n# or use command\n\ntps express-template app project/app app2\n"))),(0,l.kt)(s.Z,{value:"node",label:"Node",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const Templates = require('tps');\n\nconst tps = new Templates('express-template');\n\nconst buildPaths = ['app', 'projects/app', 'app2'];\n\ntps.render(process.cwd(), buildPaths);\n"))))))}g.isMDXComponent=!0}}]);