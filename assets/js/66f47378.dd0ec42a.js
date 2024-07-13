(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[4570],{83167:(e,n,t)=>{"use strict";t.d(n,{R:()=>s});var a=t(96540),o=t(41622);const s=e=>{let{children:n,open:t=!1,title:s=""}=e;const l=s?`Example: ${s}`:"Example";return a.createElement(o.A,{summary:l,open:t},a.createElement("div",null,n))}},85174:(e,n,t)=>{"use strict";t.d(n,{$:()=>s});var a=t(96540);const o="tableContainer_DG64",s=e=>{let{template:n,type:s="json"}=e;const[l,p]=(0,a.useState)(null);(0,a.useEffect)((()=>{(async()=>{const e=await t(49867)(`./${n}/settings.${s}`);p(e)})()}),[]);return a.createElement("div",{className:o},a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",null,"name"),a.createElement("th",null,"description"),a.createElement("th",null,"option"),a.createElement("th",null,"alias"),a.createElement("th",null,"default"))),a.createElement("tbody",null,l?.prompts?.map((e=>a.createElement("tr",{key:e.name},a.createElement("td",null,e.name),a.createElement("td",null,e.message,a.createElement("br",null),a.createElement("span",{style:{color:"grey"}},!!e?.choices?.length&&`(${(e=>(e?.choices||[]).map((e=>e?.value||e)))(e).join(", ")})`)),a.createElement("td",{style:{whiteSpace:"nowrap"}},`--${e.name}`),a.createElement("td",{style:{whiteSpace:"nowrap"}},e?.aliases?.map((e=>1===e.length?`-${e}`:`--${e}`)).join(", ")),a.createElement("td",null,"function"==typeof e?.default?e?.default({}):e?.default?.toString())))))))}},52152:(e,n,t)=>{"use strict";t.r(n),t.d(n,{assets:()=>f,contentTitle:()=>d,default:()=>v,frontMatter:()=>y,metadata:()=>h,toc:()=>w});var a=t(58168),o=t(96540),s=t(15680),l=t(85174),p=t(83167),r=t(11470),i=t(19365),c=t(75489);const m=e=>{let{to:n,size:t,children:s,onClick:l,color:p="primary"}=e,r=`button button--${p}`;t&&(r=`${r} button--${t} `);const i={className:r,onClick:l,style:{textDecoration:"none"}};return n?o.createElement(c.A,(0,a.A)({to:n},i),s):o.createElement("button",(0,a.A)({type:"button"},i),s)};var g=t(37399);const u=t.p+"assets/images/react-component-2e5695e295b5bf9764d3f64f8b3bacc5.gif",y={},d="react-component",h={unversionedId:"main/templates/react-component",id:"main/templates/react-component",title:"react-component",description:"<Icon",source:"@site/docs/main/templates/react-component.mdx",sourceDirName:"main/templates",slug:"/main/templates/react-component",permalink:"/templates/docs/main/templates/react-component",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/templates/react-component.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Templates",permalink:"/templates/docs/main/templates/"},next:{title:"yargs-cli-cmd",permalink:"/templates/docs/main/templates/yargs-cli-cmd"}},f={},w=[{value:"Usage",id:"usage",level:2},{value:"Installation",id:"installation",level:2},{value:"Options",id:"options",level:2},{value:"Copy",id:"copy",level:2},{value:"Examples",id:"examples",level:2},{value:"How to use",id:"how-to-use",level:3},{value:"How to use options",id:"how-to-use-options",level:3},{value:"No new folder",id:"no-new-folder",level:3},{value:"How to use with typescript",id:"how-to-use-with-typescript",level:3},{value:"Use all default answers",id:"use-all-default-answers",level:3}],N={toc:w},x="wrapper";function v(e){let{components:n,...t}=e;return(0,s.yg)(x,(0,a.A)({},N,t,{components:n,mdxType:"MDXLayout"}),(0,s.yg)("h1",{id:"react-component"},"react-component"),(0,s.yg)("div",{className:"row",style:{fontSize:20}},(0,s.yg)("div",{className:"col col--6 display--flex align-items--center margin-bottom--xs"},(0,s.yg)(g.In,{inline:!0,icon:"skill-icons:typescript",width:"25px",className:"margin-right--xs",mdxType:"Icon"}),"Supports Typescript"),(0,s.yg)("div",{className:"col col--6 display--flex align-items--center margin-bottom--xs"},(0,s.yg)(g.In,{icon:"logos:storybook-icon",width:"25px",className:"margin-right--xs",mdxType:"Icon"}),"Supports Storybook"),(0,s.yg)("div",{className:"col col--6 display--flex align-items--center margin-bottom--xs"},(0,s.yg)(g.In,{inline:!0,icon:"logos:jest",width:"25px",className:"margin-right--xs",mdxType:"Icon"})," ","Supports Unit tests"),(0,s.yg)("div",{className:"col col--6 display--flex align-items--center margin-bottom--xs"},(0,s.yg)(g.In,{icon:"skill-icons:css",width:"25px",className:"margin-right--xs",mdxType:"Icon"})," ","Supports multiple CSS languages")),(0,s.yg)("br",null),(0,s.yg)("p",null,"Generate a fully functioning React function component."),(0,s.yg)("img",{className:"shadow--lw",src:u,style:{width:"100%",borderRadius:"5px"},alt:"react component template usage gif"}),(0,s.yg)("h2",{id:"usage"},"Usage"),(0,s.yg)("admonition",{title:"Now accepting new feature requests",type:"info"},(0,s.yg)("p",{parentName:"admonition"},"If you're using our template and have ideas on how we can make it even better,\nwe'd love to hear from you. Your feedback helps us prioritize improvements and\nbuild a tool that truly meets your needs."),(0,s.yg)("p",{parentName:"admonition"},"Feel free to submit feature requests, suggestions, or any thoughts you have\nusing the form below. We hope to hear from you soon!"),(0,s.yg)(m,{to:"https://github.com/marcellino-ornelas/templates/discussions/categories/react-component-feature-requests-feedback",size:"sm",onClick:()=>{"function"==typeof gtag&&gtag("event","feedback_request_click",{event_category:"Feedback",event_label:"react-template"})},mdxType:"Button"},"Submit feature request")),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash",metastring:'title="Usage"',title:'"Usage"'},"tps react-component <component-name>\n\n# or in a directory\n\ntps react-component path/to/dir/<component-name>\n")),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt",metastring:'title="Creates"',title:'"Creates"'},"| - <component-name>\n    | - index.jsx (optional)\n    | - <component-name>.jsx\n    | - <component-name>.css (optional)\n    | - <component-name>.test.js (optional)\n    | - <component-name>.stories.jsx (optional)\n")),(0,s.yg)(p.R,{mdxType:"Example"},(0,s.yg)(r.A,{mdxType:"Tabs"},(0,s.yg)(i.A,{value:"Default",mdxType:"TabItem"},(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav\n")),(0,s.yg)("p",null,"Will produces something like the following:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.jsx\n    | - Nav.jsx\n    | - Nav.css\n"))),(0,s.yg)(i.A,{value:"In directory",mdxType:"TabItem"},(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component src/components/Nav\n")),(0,s.yg)("p",null,"Will produces something like the following:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - src/\n    | - components/\n        | - Nav\n            | - index.jsx\n            | - Nav.jsx\n            | - Nav.css\n"))))),(0,s.yg)("p",null,"Check out our ",(0,s.yg)("a",{parentName:"p",href:"#examples"},"examples section")," to see detailed instructions on how\nto use this template."),(0,s.yg)("h2",{id:"installation"},"Installation"),(0,s.yg)("p",null,"This templates is a part of Templates library. If you've already installed\nTemplates, you'll have instant access to this template, and you can disregard\nthis command."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"npm i -g templates-mo\n")),(0,s.yg)("h2",{id:"options"},"Options"),(0,s.yg)(l.$,{template:"react-component",type:"js",mdxType:"TemplateOptions"}),(0,s.yg)("h2",{id:"copy"},"Copy"),(0,s.yg)("p",null,"If you like this template, but want to modify a few things use the copy command.\nIt allows you to duplicate the template into your project and tailor it to your\nneeds."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"# if your not initialized run\ntps init\n\n# copy template\ntps copy react-component\n")),(0,s.yg)("h2",{id:"examples"},"Examples"),(0,s.yg)("h3",{id:"how-to-use"},"How to use"),(0,s.yg)("p",null,"Lets say you have a basic react folder structure like so:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - src/\n        | - components/\n            | - ...\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,s.yg)("p",null,"If you wanted to generate a new nav component in the components folder, you\ncould use the following command:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"> tps react-component src/components/Nav\n")),(0,s.yg)("admonition",{type:"tip"},(0,s.yg)("p",{parentName:"admonition"},"The name you pass in will be used as the name of your folder and component\nfiles. If your repository uses\n",(0,s.yg)("a",{parentName:"p",href:"../../api/template-context#paramCase"},"param-case"),",\n",(0,s.yg)("a",{parentName:"p",href:"../../api/template-context#camelCase"},"camelCase"),", or\n",(0,s.yg)("a",{parentName:"p",href:"../../api/template-context#pascalCase"},"snake_case")," file naming patterns, you\ncan also use those naming conventions."),(0,s.yg)("pre",{parentName:"admonition"},(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"# camel case\n> tps react-component src/components/navItem\n\n# or param case\n> tps react-component src/components/nav-item\n\n# or snake case\n> tps react-component src/components/nav_item\n")),(0,s.yg)("p",{parentName:"admonition"},"Your component name will be the name you passed in converted into\n",(0,s.yg)("a",{parentName:"p",href:"../../api/template-context#pascalCase"},"Pascalcase"),".")),(0,s.yg)("p",null,"Once the command is run, you will be prompted some questions:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre"},"? Would you like to use typescript?\n? What type of extension do you want for your component?\n? Would you like to include a css file?\n? What type of css extension would you like?\n? Would you like to include unit tests?\n? Would you like to include a index file?\n? Would you like to include a storybook file?\n")),(0,s.yg)("p",null,"Depending on your answers, you'll end up with something similar to the\nfollowing:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - <cwd>/\n    | - src/\n        | - components/\n            // highlight-start\n            | - Nav/\n                | - index.jsx\n                | - Nav.jsx\n                | - Nav.css\n            // highlight-end\n            | - ...\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,s.yg)("p",null,"If you used another naming format, such as\n",(0,s.yg)("a",{parentName:"p",href:"../../api/template-context#paramCase"},"param-case"),", and created a component\ncalled ",(0,s.yg)("inlineCode",{parentName:"p"},"nav-item"),":"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"> tps react-component src/components/nav-item\n")),(0,s.yg)("p",null,"Depending on your answers, you'll end up with something similar to the\nfollowing:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - <cwd>/\n    | - src/\n        | - components/\n            // highlight-start\n            | - nav-item/\n                | - index.jsx\n                | - nav-item.jsx\n                | - nav-item.css\n            // highlight-end\n            | - ...\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,s.yg)("h3",{id:"how-to-use-options"},"How to use options"),(0,s.yg)("p",null,"The React component template offers various customization options, which are\nlisted in the ",(0,s.yg)("a",{parentName:"p",href:"#options"},"options")," table. These will be prompted to you when you\ncreate a new instance. However to save time and avoid answering the same\nquestions each time, you can set your answers ahead of time. You can do this\neither on the command line or in your ",(0,s.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")," file."),(0,s.yg)(r.A,{mdxType:"Tabs"},(0,s.yg)(i.A,{value:"cli",mdxType:"TabItem"},(0,s.yg)("p",null,"Lets say your project always uses a ",(0,s.yg)("inlineCode",{parentName:"p"},"js")," extension for its components. You can\nadd ",(0,s.yg)("inlineCode",{parentName:"p"},"js")," to the ",(0,s.yg)("inlineCode",{parentName:"p"},"extension")," answer when creating a new instance and you will no\nlonger be prompted that question."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --extension=js\n")),(0,s.yg)("p",null,"Depending on the rest of your answers, it will generate something similar to the\nfollowing:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.js\n    | - Nav.js\n    | - Nav.css\n"))),(0,s.yg)(i.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,s.yg)("p",null,"If you havent already initialize your repo:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,s.yg)("p",null,"Lets say your project always uses a ",(0,s.yg)("inlineCode",{parentName:"p"},"js")," extension for its components. You can\nadd ",(0,s.yg)("inlineCode",{parentName:"p"},"js")," to the ",(0,s.yg)("inlineCode",{parentName:"p"},"extension")," answer. Now when creating a new instance and you\nwill no longer be prompted that question."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "extension": "js"\n        }\n    }\n}1\n')),(0,s.yg)("p",null,"Depending on the rest of your answers, it will generate something similar to the\nfollowing:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.js\n    | - Nav.js\n    | - Nav.css\n")))),(0,s.yg)("h3",{id:"no-new-folder"},"No new folder"),(0,s.yg)("p",null,"By default, templates creates a new folder for you. If you don't want a new\nfolder for your react component, you can use the\n",(0,s.yg)("a",{parentName:"p",href:"../../api/template#new-folder"},(0,s.yg)("inlineCode",{parentName:"a"},"newFolder"))," and\n",(0,s.yg)("a",{parentName:"p",href:"./react-component#options"},(0,s.yg)("inlineCode",{parentName:"a"},"index"))," options. These options both default to\n",(0,s.yg)("inlineCode",{parentName:"p"},"true"),"."),(0,s.yg)("p",null,"The ",(0,s.yg)("a",{parentName:"p",href:"../../api/template#new-folder"},(0,s.yg)("inlineCode",{parentName:"a"},"newFolder"))," option tells templates whether\nor not to place everything into a new folder."),(0,s.yg)("p",null,"The ",(0,s.yg)("a",{parentName:"p",href:"./react-component#options"},(0,s.yg)("inlineCode",{parentName:"a"},"index"))," option determines whether a ",(0,s.yg)("inlineCode",{parentName:"p"},"index"),"\nfile should be created."),(0,s.yg)("p",null,"Lets say you have a basic react folder structure like so:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - src/\n        // highlight-start\n        | - components/\n            | - Nav.jsx\n            | - Nav.css\n            // highlight-end\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,s.yg)("p",null,"If you wanted to generate a new component called ",(0,s.yg)("inlineCode",{parentName:"p"},"footer")," in the components\nfolder without a new folder, you can do one of the following:"),(0,s.yg)(r.A,{mdxType:"Tabs"},(0,s.yg)(i.A,{value:"cli",mdxType:"TabItem"},(0,s.yg)("p",null,"You can pass in the following flags when your generating your new instance"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component footer --no-newFolder --no-index\n"))),(0,s.yg)(i.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,s.yg)("p",null,"You can add the following to your ",(0,s.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")," file to always avoid creating a\nnew folder when generating a React component in your repository directory and\nall its subdirectories."),(0,s.yg)("p",null,"If you havent already initialize your repo:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "index": false\n        },\n        "opts": {\n            "newFolder": false\n        }\n    }\n}\n')),(0,s.yg)("p",null,"Now when generating a new instance"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component footer\n")))),(0,s.yg)("p",null,"Depending on your answers, it would produce something to the following:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-text"},"| - <cwd>/\n    | - src/\n        | - components/\n            | - nav.jsx\n            | - nav.css\n            // highlight-start\n            | - footer.jsx\n            | - footer.css\n            // highlight-end\n        | - pages/\n            | - ...\n        | - index.jsx\n        | - app.jsx\n    | - package.json\n    | - package-lock.json\n")),(0,s.yg)("h3",{id:"how-to-use-with-typescript"},"How to use with typescript"),(0,s.yg)("p",null,"When generating a new instance of this template you will be asked if you want to\nuse typescript. However if you know you want to use typescript in your project\nyou can do one of the following:"),(0,s.yg)(r.A,{mdxType:"Tabs"},(0,s.yg)(i.A,{value:"cli",mdxType:"TabItem"},(0,s.yg)("p",null,"You can pass in the following flags when your generating your new instance and\nyou will no longer be prompted those questions"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --typescript --extension=tsx\n\n# or\n\ntps react-component Nav --typescript -e tsx\n")),(0,s.yg)("p",null,"Produces:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.tsx\n    | - Nav.tsx\n    | - Nav.css\n"))),(0,s.yg)(i.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,s.yg)("p",null,"You can add the following to your ",(0,s.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")," file to always use typescript\nwhen generating a react component in your repos directory and all its\nsubdirectories."),(0,s.yg)("p",null,"If you havent already initialize your repo:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps init\n")),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "typescript": true,\n            "extension": "tsx"\n        }\n    }\n}\n')),(0,s.yg)("p",null,"Now when generating a new instance you no longer will be prompted for these two\nquestions or have to supply the two flags to the cli command"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav\n")),(0,s.yg)("p",null,"Would produce:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-txt"},"| - Nav\n    | - index.tsx\n    | - Nav.tsx\n    | - Nav.css\n")))),(0,s.yg)("h3",{id:"use-all-default-answers"},"Use all default answers"),(0,s.yg)("p",null,"To bypass all prompts and use default answers, simply include the ",(0,s.yg)("inlineCode",{parentName:"p"},"--default"),"\nflag when generating a new instance."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component --default\n")),(0,s.yg)("p",null,"You can also combined this with other flags and/or in conjunction with your\n",(0,s.yg)("inlineCode",{parentName:"p"},".tps/.tpsrc")),(0,s.yg)(r.A,{mdxType:"Tabs"},(0,s.yg)(i.A,{value:"cli",mdxType:"TabItem"},(0,s.yg)("p",null,"Use typescript and use defaults for the rest of the questions. This will no\nlonger prompt you any questions"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --typescript --default\n"))),(0,s.yg)(i.A,{value:".tps/.tpsrc",mdxType:"TabItem"},(0,s.yg)("p",null,"If you have typescript set in your tpsrc file."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-json",metastring:'title=".tps/.tpsrc"',title:'".tps/.tpsrc"'},'{\n    "react-component": {\n        "answers": {\n            "typescript": true\n        }\n    }\n}\n')),(0,s.yg)("p",null,"Now when using defaults it will use the typescript, defaults for the rest of the\nquestions, and will no longer prompt any questions."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component Nav --default\n")))))}v.isMDXComponent=!0},49867:(e,n,t)=>{var a={"./new-template/default/settings.json":[34033,3,4033],"./new-test/settings.json":[43137,3,3137],"./react-component/settings.js":[80543,7,543],"./yargs-cli-cmd/settings.js":[97572,7,7572]};function o(e){if(!t.o(a,e))return Promise.resolve().then((()=>{var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=a[e],o=n[0];return t.e(n[2]).then((()=>t.t(o,16|n[1])))}o.keys=()=>Object.keys(a),o.id=49867,e.exports=o}}]);