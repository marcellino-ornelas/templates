"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[9247],{53211:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>g,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>m,toc:()=>u});var s=t(58168),o=t(96540),a=t(15680),p=t(11963),r=t(41082);const i=()=>o.createElement(p.A,{type:"caution",icon:o.createElement(r.In,{icon:"material-symbols:construction"}),title:"Under Construction"},"This page is under construction, but we are working hard to improve it."),l={},c="Prompt configuration",m={unversionedId:"api/settings/prompt",id:"api/settings/prompt",title:"Prompt configuration",description:"Prompt configuration object. We use",source:"@site/docs/api/settings/prompt.mdx",sourceDirName:"api/settings",slug:"/api/settings/prompt",permalink:"/templates/docs/api/settings/prompt",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/settings/prompt.mdx",tags:[],version:"current",frontMatter:{},sidebar:"api",previous:{title:"Settings File",permalink:"/templates/docs/api/settings/"},next:{title:"Evaluation",permalink:"/templates/docs/api/template-engine/evaluation"}},g={},u=[{value:"Examples",id:"examples",level:2},{value:"Using confirm",id:"using-confirm",level:3},{value:"Using checkbox",id:"using-checkbox",level:3}],d={toc:u},y="wrapper";function h(e){let{components:n,...t}=e;return(0,a.yg)(y,(0,s.A)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"prompt-configuration"},"Prompt configuration"),(0,a.yg)(i,{mdxType:"Contruction"}),(0,a.yg)("p",null,"Prompt configuration object. We use\n",(0,a.yg)("a",{parentName:"p",href:"https://github.com/SBoudrias/Inquirer.js/tree/v6.0.0"},"inquirer")," library for\nprompting. All inquirer prompt properties are supported when creating prompts.\nFor more information on the available properties in inquirer, you can refer to\nthe documentation ",(0,a.yg)("a",{parentName:"p",href:"https://github.com/SBoudrias/Inquirer.js/tree/v6.0.0"},"here"),"."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts",metastring:'title="Type"',title:'"Type"'},"interface Prompt {\n    /**\n     * Name of prompt\n     */\n    name: string;\n    /**\n     * Prompt description\n     */\n    description: string;\n    /**\n     * Message you would like to show user\n     */\n    message: string;\n    /**\n     * Type of prompt you would like to use\n     */\n    type: 'confirm' | 'input' | 'checkbox' | 'list' | 'rawlist' | 'password';\n    /**\n     * How you want templates to process this prompts answer\n     */\n    tpsType: 'package' | 'data';\n    /**\n     * choices for your prompt.\n     *\n     * Only needed for prompts of type `list`, `rawlist` or `checkbox`\n     */\n    choices?: string[];\n    /**\n     * Make prompt a hidden prompt\n     * @version templates@>v1.1.1\n     */\n    hidden?: boolean;\n    /**\n     * Default answer for the prompt\n     */\n    default?: any;\n}\n")),(0,a.yg)("h2",{id:"examples"},"Examples"),(0,a.yg)("h3",{id:"using-confirm"},"Using confirm"),(0,a.yg)("p",null,"Say you have this ",(0,a.yg)("inlineCode",{parentName:"p"},"react-component")," template:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"| - tps-example\n    | - .tps/\n        | - react-component/\n            | - settings.json\n            | - default/\n                | - index.js\n            | - css\n                | - {{=tps.name}}.css\n")),(0,a.yg)("p",null,"Adding this prompt will allow you to conditionally render the css package."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n    "prompts": [\n        {\n            "name": "css",\n            "type": "confirm",\n            "message": "Would you like to add a css file?"\n        }\n    ]\n}\n')),(0,a.yg)("p",null,"Now if the user answers true like so:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component App --css\n")),(0,a.yg)("p",null,"then this will be the new template:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"    | - tps-example\n        | - .tps/\n            | - ...\n        | - App\n           | - index.js\n           | - App.css\n")),(0,a.yg)("p",null,"Now if the user answers false like so:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-bash"},"tps react-component App --no-css\n")),(0,a.yg)("p",null,"then this will be the new template:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-text"},"    | - tps-example\n        | - .tps/\n            | - ...\n        | - App\n           | - index.js\n")),(0,a.yg)("h3",{id:"using-checkbox"},"Using checkbox"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n    "prompts": [\n        {\n            "name": "modules",\n            "type": "checkbox",\n            "choices": ["react", "express", "fs", "path"],\n            "tpsType": "data",\n            "message": "What node modules would you like to import into this js file?"\n        }\n    ]\n}\n')))}h.isMDXComponent=!0}}]);