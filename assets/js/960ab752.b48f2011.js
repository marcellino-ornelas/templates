"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[9247],{42542:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>p,metadata:()=>l,toc:()=>m});var t=s(74848),i=s(28453),r=(s(96540),s(27293)),o=s(41082);const a=()=>(0,t.jsx)(r.A,{type:"caution",icon:(0,t.jsx)(o.In,{icon:"material-symbols:construction"}),title:"Under Construction",children:"This page is under construction, but we are working hard to improve it."}),p={},c="Prompt configuration",l={id:"api/settings/prompt",title:"Prompt configuration",description:"Prompt configuration object. We use",source:"@site/docs/api/settings/prompt.mdx",sourceDirName:"api/settings",slug:"/api/settings/prompt",permalink:"/templates/docs/api/settings/prompt",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/settings/prompt.mdx",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Settings File",permalink:"/templates/docs/api/settings/"},next:{title:"Evaluation",permalink:"/templates/docs/api/template-engine/evaluation"}},d={},m=[{value:"Examples",id:"examples",level:2},{value:"Using confirm",id:"using-confirm",level:3},{value:"Using checkbox",id:"using-checkbox",level:3}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"prompt-configuration",children:"Prompt configuration"})}),"\n",(0,t.jsx)(a,{}),"\n",(0,t.jsxs)(n.p,{children:["Prompt configuration object. We use\n",(0,t.jsx)(n.a,{href:"https://github.com/SBoudrias/Inquirer.js/tree/v6.0.0",children:"inquirer"})," library for\nprompting. All inquirer prompt properties are supported when creating prompts.\nFor more information on the available properties in inquirer, you can refer to\nthe documentation ",(0,t.jsx)(n.a,{href:"https://github.com/SBoudrias/Inquirer.js/tree/v6.0.0",children:"here"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:'title="Type"',children:"interface Prompt {\n    /**\n     * Name of prompt\n     */\n    name: string;\n    /**\n     * Prompt description\n     */\n    description: string;\n    /**\n     * Message you would like to show user\n     */\n    message: string;\n    /**\n     * Type of prompt you would like to use\n     */\n    type: 'confirm' | 'input' | 'checkbox' | 'list' | 'rawlist' | 'password';\n    /**\n     * How you want templates to process this prompts answer\n     */\n    tpsType: 'package' | 'data';\n    /**\n     * choices for your prompt.\n     *\n     * Only needed for prompts of type `list`, `rawlist` or `checkbox`\n     */\n    choices?: string[];\n    /**\n     * Make prompt a hidden prompt\n     * @version templates@>v1.1.1\n     */\n    hidden?: boolean;\n    /**\n     * Default answer for the prompt\n     */\n    default?: any;\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,t.jsx)(n.h3,{id:"using-confirm",children:"Using confirm"}),"\n",(0,t.jsxs)(n.p,{children:["Say you have this ",(0,t.jsx)(n.code,{children:"react-component"})," template:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"| - tps-example\n    | - .tps/\n        | - react-component/\n            | - settings.json\n            | - default/\n                | - index.js\n            | - css\n                | - {{=tps.name}}.css\n"})}),"\n",(0,t.jsx)(n.p,{children:"Adding this prompt will allow you to conditionally render the css package."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="settings.json"',children:'{\n    "prompts": [\n        {\n            "name": "css",\n            "type": "confirm",\n            "message": "Would you like to add a css file?"\n        }\n    ]\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"Now if the user answers true like so:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps react-component App --css\n"})}),"\n",(0,t.jsx)(n.p,{children:"then this will be the new template:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"    | - tps-example\n        | - .tps/\n            | - ...\n        | - App\n           | - index.js\n           | - App.css\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now if the user answers false like so:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tps react-component App --no-css\n"})}),"\n",(0,t.jsx)(n.p,{children:"then this will be the new template:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",children:"    | - tps-example\n        | - .tps/\n            | - ...\n        | - App\n           | - index.js\n"})}),"\n",(0,t.jsx)(n.h3,{id:"using-checkbox",children:"Using checkbox"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",metastring:'title="settings.json"',children:'{\n    "prompts": [\n        {\n            "name": "modules",\n            "type": "checkbox",\n            "choices": ["react", "express", "fs", "path"],\n            "tpsType": "data",\n            "message": "What node modules would you like to import into this js file?"\n        }\n    ]\n}\n'})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}}}]);