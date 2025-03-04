"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[68],{59685:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>c,default:()=>m,frontMatter:()=>o,metadata:()=>d,toc:()=>u});var a=n(74848),l=n(28453),r=n(83167),s=n(11470),i=n(19365);const o={pagination_next:"main/create-new-template/packages",pagination_prev:"main/create-new-template/index",sidebar_position:1},c="Templates",d={id:"main/create-new-template/templates",title:"Templates",description:"We will be referring to `` in our guide to represent any directory.",source:"@site/docs/main/create-new-template/templates.mdx",sourceDirName:"main/create-new-template",slug:"/main/create-new-template/templates",permalink:"/templates/docs/main/create-new-template/templates",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/create-new-template/templates.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{pagination_next:"main/create-new-template/packages",pagination_prev:"main/create-new-template/index",sidebar_position:1},sidebar:"docs",previous:{title:"Creating New Templates",permalink:"/templates/docs/main/create-new-template/"},next:{title:"Packages",permalink:"/templates/docs/main/create-new-template/packages"}},h={},u=[{value:"Template Types",id:"template-types",level:2},{value:"Local Templates",id:"local-templates",level:3},{value:"Multiple Template Folders",id:"multiple-template-folders",level:4},{value:"Global Templates",id:"global-templates",level:3},{value:"3rd party Templates",id:"3rd-party-templates",level:3},{value:"Packages",id:"packages",level:2},{value:"Settings file",id:"settings-file",level:2},{value:"Dynamic files",id:"dynamic-files",level:2},{value:"Making a new template",id:"making-a-new-template",level:2},{value:"Generating a instance",id:"generating-a-instance",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"templates",children:"Templates"})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["We will be referring to ",(0,a.jsx)(t.code,{children:"<some-name>"})," in our guide to represent any directory."]})}),"\n",(0,a.jsx)(t.p,{children:"A template is a collection of folders and files that acts as a blueprint for\nrecreating identical file structures in different locations. Think of this as a\ngoogle doc template but for files and folders. When generating a new instance of\nthis template, all files and directories within the template folder are rendered\ninto the your new instance's directory. Templates also supports conditionally\nand dynamiclly rendering files and folders."}),"\n",(0,a.jsx)(t.p,{children:"Don't worry about all this right now! More will be discussed later on. First,\nlet's start with the basics."}),"\n",(0,a.jsx)(t.h2,{id:"template-types",children:"Template Types"}),"\n",(0,a.jsx)(t.p,{children:"There are 3 main types of templates:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"#local-templates",children:"Local Templates"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"#global-templates",children:"Global Templates"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"#3rd-party-templates",children:"3rd Party Templates"})}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"local-templates",children:"Local Templates"}),"\n",(0,a.jsxs)(t.p,{children:["Local templates are templates that live in your local directories. This could be\nyour repository directory, subdirectories of your repository directory, or any\ndirectory on your file system. This is useful if you have repository-specific or\ndirectory specific flows you are trying to automate. Local templates live in a\n",(0,a.jsx)(t.code,{children:".tps"})," folder. Subdirectories of the ",(0,a.jsx)(t.code,{children:".tps"})," directory are your templates."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - <your-repo>/\n    | - .tps/\n        // highlight-next-line\n        | - <templates...>/\n"})}),"\n",(0,a.jsxs)(r.R,{children:[(0,a.jsxs)(t.p,{children:["If I were to make a new template called ",(0,a.jsx)(t.code,{children:"react-component"})," that will generate\nReact components, then my folder structure would look like this:"]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - <your-repo>/\n    | - .tps/\n        // highlight-next-line\n        | - react-component/\n            | - <template code...>\n"})})]}),"\n",(0,a.jsxs)(t.admonition,{type:"tip",children:[(0,a.jsxs)(t.p,{children:["You can create this ",(0,a.jsx)(t.code,{children:".tps"})," directory by running:"]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"tps init\n"})})]}),"\n",(0,a.jsx)(t.h4,{id:"multiple-template-folders",children:"Multiple Template Folders"}),"\n",(0,a.jsxs)(t.p,{children:["When using the Templates CLI, Templates can use any template that's defined in a\n",(0,a.jsx)(t.code,{children:".tps"})," directory in your current working directory or any parent directory. This\nmeans you can define multiple ",(0,a.jsx)(t.code,{children:".tps"})," folders in your repository. This can be\nuseful when you want to segregate certain templates to specific parts of the\ncodebase. Keep in mind that in order to use subdirectory templates, your\nterminal's current working directory needs to be that subdirectory."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - <your-repo>/\n    // highlight-start\n    | - .tps/\n        | - <templates...>/\n    // highlight-end\n    | - some-sub-directory\n        // highlight-start\n        | - .tps/\n            | - <templates...>/\n        // highlight-end\n"})}),"\n",(0,a.jsxs)(r.R,{children:[(0,a.jsxs)(t.p,{children:["If you had a separate folder for your app's frontend codebase, then you can\ndefine a ",(0,a.jsx)(t.code,{children:".tps"})," folder at the repo level and inside the frontend folder. This\nwould allow you to keep frontend-specific templates out of the main directory."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - my-repo/\n    // highlight-start\n    | - .tps/\n        | - backend-api\n        // highlight-end\n    | - frontend\n        // highlight-start\n        | - .tps/\n            | - react-component\n        // highlight-end\n"})}),(0,a.jsxs)(t.p,{children:["Now if your current working directory is ",(0,a.jsx)(t.code,{children:"my-repo"}),", you will be able to use the\n",(0,a.jsx)(t.code,{children:"backend-api"})," template. If your current working directory is ",(0,a.jsx)(t.code,{children:"frontend"}),", then\nyou can use both ",(0,a.jsx)(t.code,{children:"backend-api"})," and ",(0,a.jsx)(t.code,{children:"react-component"}),"."]})]}),"\n",(0,a.jsx)(t.h3,{id:"global-templates",children:"Global Templates"}),"\n",(0,a.jsxs)(t.p,{children:["Global templates are similar to local templates but they live in your home\ndirectory. This is useful when you want to share templates across your whole\nfile system. These templates still need to live in a ",(0,a.jsx)(t.code,{children:".tps"})," directory."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - ~/\n    | - .tps/\n        // highlight-next-line\n        | - <templates...>/\n"})}),"\n",(0,a.jsxs)(r.R,{children:[(0,a.jsxs)(t.p,{children:["If I were to make a new template called ",(0,a.jsx)(t.code,{children:"github-pull-request-template"})," that will generate\na github pull request template file, then my folder structure would look like this:"]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - ~/\n    | - .tps/\n        // highlight-next-line\n        | - github-pull-request-template/\n            | - <template code...>\n"})})]}),"\n",(0,a.jsxs)(t.admonition,{type:"tip",children:[(0,a.jsxs)(t.p,{children:["You can create this global ",(0,a.jsx)(t.code,{children:".tps"})," directory by running:"]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"tps init --global\n"})})]}),"\n",(0,a.jsx)(t.h3,{id:"3rd-party-templates",children:"3rd party Templates"}),"\n",(0,a.jsxs)(t.p,{children:["3rd party templates are templates that will be published to your choice of\npackage manager like npm/yarn/pnpm. This allows other developers to use your\ntemplate by installing it globally or locally. There are special considerations\nyou need to think about when making 3rd party template that we will touch on in\nour ",(0,a.jsx)(t.a,{href:"/templates/docs/main/create-new-template/3rd-party-templates",children:"3rd party templates guide"}),"."]}),"\n",(0,a.jsx)(t.h2,{id:"packages",children:"Packages"}),"\n",(0,a.jsxs)(t.p,{children:["Inside of each ",(0,a.jsx)(t.code,{children:"template"})," you can have directories referred to as ",(0,a.jsx)(t.code,{children:"packages"}),"."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - .tps/\n    | - <template>/\n        // highlight-next-line\n        | - <packages...>/\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Within each package directory, you have the freedom to add an unlimited number\nof files and directories. These resources will then be utilized when generating\na new instance of your template. You can name packages anything you wish, but\nTemplates treats the ",(0,a.jsx)(t.code,{children:"default"})," package as special. When rendering a new instance\nof a template, Templates will automatically include all the contents\n",(0,a.jsx)(t.em,{children:"(files/directories)"})," within your ",(0,a.jsx)(t.code,{children:"default"})," package. All other packages will\nonly be included if explicitly specified."]}),"\n",(0,a.jsxs)(r.R,{open:!0,children:[(0,a.jsxs)(t.p,{children:["Lets say we have a template called ",(0,a.jsx)(t.code,{children:"node-server"}),". This template is responsible\nfor setting up a brand new node webserver with all the bells and whistles\nincluded."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - .tps/\n    | - node-server/\n        | - default/\n            // highlight-start\n            | - server.js\n            | - package.json\n            // highlight-end\n"})}),(0,a.jsxs)(t.p,{children:['let\'s say today we had a new idea for a trash removal company called "Trash\nRemoval". If we wanted to build a new website for this company we can generate a\nnew instance of ',(0,a.jsx)(t.code,{children:"node-server"})," called ",(0,a.jsx)(t.code,{children:"trash-removal"}),". When templates generates\nthis new instance it will create a new directory called ",(0,a.jsx)(t.code,{children:"trash-removal"})," and\ngenerate copies of all files/directories inside the template's ",(0,a.jsx)(t.code,{children:"default"}),"\ndirectory and place them into the new ",(0,a.jsx)(t.code,{children:"trash-removal"})," directory it just created."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"// highlight-start\n| - trash-removal/\n    | - server.js\n    | - package.json\n// highlight-end\n"})})]}),"\n",(0,a.jsxs)(t.p,{children:["Dont worry more will be covered on this in our ",(0,a.jsx)(t.a,{href:"./packages",children:"next section"})," of\nthis guide:"]}),"\n",(0,a.jsx)(t.h2,{id:"settings-file",children:"Settings file"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-text",children:"| - .tps/\n    | - <template>/\n        // highlight-next-line\n        | - settings.json\n"})}),"\n",(0,a.jsx)(t.p,{children:"A template can optionally have a settings file where you can define prompts and\nother configuration details. The settings file will be discussed in more detail\nlater in this guide."}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["You can learn more about the settings file in our\n",(0,a.jsx)(t.a,{href:"./settings",children:"settings file guide"})]})}),"\n",(0,a.jsx)(t.h2,{id:"dynamic-files",children:"Dynamic files"}),"\n",(0,a.jsxs)(t.p,{children:["Within each package, you can use dynamic files, which are files ending with a\n",(0,a.jsx)(t.code,{children:".tps"})," extension. Dynamic files allow you to utilize our template engine to\ncreate dynamic content. This results in more flexibility and customization in\nyour templates."]}),"\n",(0,a.jsx)(t.h2,{id:"making-a-new-template",children:"Making a new template"}),"\n",(0,a.jsx)(t.p,{children:"There is nothing special about a template. Its nothing other than a directory\nholding a collection of files and folders. We could create a template two ways:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["Use our command line tool ",(0,a.jsx)(t.em,{children:"(recommended)"})]}),"\n",(0,a.jsxs)(t.li,{children:["Create the directories and files with ",(0,a.jsx)(t.code,{children:"mkdir/touch"})," or use Finder etc."]}),"\n"]}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["Read more about our command line docs ",(0,a.jsx)(t.a,{href:"../../api/cli",children:"here"})]})}),"\n",(0,a.jsxs)(s.A,{children:[(0,a.jsxs)(i.A,{value:"tps",label:"tps cli",default:!0,children:[(0,a.jsxs)(t.p,{children:["Our command line tools will create the ",(0,a.jsx)(t.code,{children:"default"})," folder for you."]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"tps new template <template-name>\n"})}),(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["Read more about our ",(0,a.jsx)(t.code,{children:"new"})," command more ",(0,a.jsx)(t.a,{href:"../../api/cli#new",children:"here"})]})})]}),(0,a.jsx)(i.A,{value:"bash",label:"bash",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"mkdir .tps/<template-name>\n\nmkdir .tps/<template-name>/default\n"})})})]}),"\n",(0,a.jsx)(t.h2,{id:"generating-a-instance",children:"Generating a instance"}),"\n",(0,a.jsxs)(t.p,{children:["Check out our ",(0,a.jsx)(t.a,{href:"/templates/docs/main/generating-instance",children:"generating a instance"})," guide to learn\nhow to generate your new template."]})]})}function m(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},83167:(e,t,n)=>{n.d(t,{R:()=>r});n(96540);var a=n(41622),l=n(74848);const r=e=>{let{children:t,open:n=!1,title:r=""}=e;const s=r?`Example: ${r}`:"Example";return(0,l.jsx)(a.A,{summary:s,open:n,children:(0,l.jsx)("div",{children:t})})}},41622:(e,t,n)=>{n.d(t,{A:()=>f});var a=n(96540),l=n(18215),r=n(15066),s=n(63427),i=n(92303),o=n(41422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var d=n(74848);function h(e){return!!e&&("SUMMARY"===e.tagName||h(e.parentElement))}function u(e,t){return!!e&&(e===t||u(e.parentElement,t))}function p(e){let{summary:t,children:n,...l}=e;(0,s.A)().collectAnchor(l.id);const p=(0,i.A)(),m=(0,a.useRef)(null),{collapsed:g,setCollapsed:f}=(0,o.u)({initialState:!l.open}),[x,y]=(0,a.useState)(l.open),j=a.isValidElement(t)?t:(0,d.jsx)("summary",{children:t??"Details"});return(0,d.jsxs)("details",{...l,ref:m,open:x,"data-collapsed":g,className:(0,r.A)(c.details,p&&c.isBrowser,l.className),onMouseDown:e=>{h(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;h(t)&&u(t,m.current)&&(e.preventDefault(),g?(f(!1),y(!0)):f(!0))},children:[j,(0,d.jsx)(o.N,{lazy:!1,collapsed:g,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{f(e),y(!e)},children:(0,d.jsx)("div",{className:c.collapsibleContent,children:n})})]})}const m={details:"details_b_Ee"},g="alert alert--info";function f(e){let{...t}=e;return(0,d.jsx)(p,{...t,className:(0,l.A)(g,m.details,t.className)})}},19365:(e,t,n)=>{n.d(t,{A:()=>s});n(96540);var a=n(18215);const l={tabItem:"tabItem_Ymn6"};var r=n(74848);function s(e){let{children:t,hidden:n,className:s}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,a.A)(l.tabItem,s),hidden:n,children:t})}},11470:(e,t,n)=>{n.d(t,{A:()=>v});var a=n(96540),l=n(18215),r=n(23104),s=n(56347),i=n(205),o=n(57485),c=n(31682),d=n(70679);function h(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return h(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:l}}=e;return{value:t,label:n,attributes:a,default:l}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const l=(0,s.W6)(),r=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o.aZ)(r),(0,a.useCallback)((e=>{if(!r)return;const t=new URLSearchParams(l.location.search);t.set(r,e),l.replace({...l.location,search:t.toString()})}),[r,l])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:l}=e,r=u(e),[s,o]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:r}))),[c,h]=m({queryString:n,groupId:l}),[g,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[l,r]=(0,d.Dv)(n);return[l,(0,a.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:l}),x=(()=>{const e=c??g;return p({value:e,tabValues:r})?e:null})();(0,i.A)((()=>{x&&o(x)}),[x]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);o(e),h(e),f(e)}),[h,f,r]),tabValues:r}}var f=n(92303);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=n(74848);function j(e){let{className:t,block:n,selectedValue:a,selectValue:s,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),d=e=>{const t=e.currentTarget,n=o.indexOf(t),l=i[n].value;l!==a&&(c(t),s(l))},h=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=o[n]??o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;t=o[n]??o[o.length-1];break}}t?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:r}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>o.push(e),onKeyDown:h,onClick:d,...r,className:(0,l.A)("tabs__item",x.tabItem,r?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function b(e){let{lazy:t,children:n,selectedValue:r}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:(0,l.A)("margin-top--md",e.props.className)}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function w(e){const t=g(e);return(0,y.jsxs)("div",{className:(0,l.A)("tabs-container",x.tabList),children:[(0,y.jsx)(j,{...t,...e}),(0,y.jsx)(b,{...t,...e})]})}function v(e){const t=(0,f.A)();return(0,y.jsx)(w,{...e,children:h(e.children)},String(t))}},28453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>i});var a=n(96540);const l={},r=a.createContext(l);function s(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);