"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[4417],{96431:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>m,contentTitle:()=>p,default:()=>g,frontMatter:()=>h,metadata:()=>u,toc:()=>x});var i=s(74848),r=s(28453),t=s(85174),a=s(83167),o=s(11470),l=s(19365),d=s(60081),c=s(1549);const h={description:"Template to generate ai",keywords:["ai","ai scaffold","ai boilerplate","ai generator","chatgpt","Large Language Models","code gen"],sidebar_label:"ai"},p="ai",u={id:"main/templates/ai",title:"ai",description:"Template to generate ai",source:"@site/docs/main/templates/ai.mdx",sourceDirName:"main/templates",slug:"/main/templates/ai",permalink:"/templates/docs/main/templates/ai",draft:!1,unlisted:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/main/templates/ai.mdx",tags:[],version:"current",frontMatter:{description:"Template to generate ai",keywords:["ai","ai scaffold","ai boilerplate","ai generator","chatgpt","Large Language Models","code gen"],sidebar_label:"ai"},sidebar:"docs",previous:{title:"Template Gallery",permalink:"/templates/docs/main/templates/"},next:{title:"express-app (alpha)",permalink:"/templates/docs/main/templates/express-app"}},m={},x=[{value:"Usage",id:"usage",level:2},{value:"Installation",id:"installation",level:2},{value:"Options",id:"options",level:2},{value:"Configuration",id:"configuration",level:2},{value:"AI Providers",id:"ai-providers",level:2},{value:"OpenAI",id:"openai",level:3},{value:"Anthropic (alpha)",id:"anthropic-alpha",level:3},{value:"Amazon Bedrock (alpha)",id:"amazon-bedrock-alpha",level:3},{value:"Google (alpha)",id:"google-alpha",level:3},{value:"Deepseek (alpha)",id:"deepseek-alpha",level:3},{value:"Azure (alpha)",id:"azure-alpha",level:3},{value:"Examples",id:"examples",level:2},{value:"How to use",id:"how-to-use",level:3},{value:"Build path",id:"build-path",level:4},{value:"No Build Path",id:"no-build-path",level:4},{value:"Base Url",id:"base-url",level:3},{value:"Additional Prompts",id:"additional-prompts",level:3},{value:"Inspiration",id:"inspiration",level:2}];function j(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"ai",children:"ai"})}),"\n",(0,i.jsxs)(c._Q,{children:[(0,i.jsx)(c.km,{version:"1.0.5",library:"tps-ai"}),(0,i.jsx)(c.km,{version:">1.2.11",library:"templates"})]}),"\n",(0,i.jsx)(n.p,{children:"Generate any codebase in any language, setup files for any library, or bring any\nidea to life\u2014all powered by AI."}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsx)(n.p,{children:"Have ideas for new features or improvements? We'd love to hear from you! Please\nshare your thoughts by submitting a feature request using the button below."}),(0,i.jsx)(d.$,{to:"https://github.com/marcellino-ornelas/templates/discussions/categories/tps-ai-feature-requests-feedback",text:"Submit feature request",size:"sm",onClick:()=>{"function"==typeof gtag&&gtag("event","feedback_request_click",{event_category:"Feedback",event_label:"tps-ai"})}})]}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",metastring:'title="Usage"',children:"tps ai [app-name]\n\n# or in a directory\n\ntps ai ./path/to/dir/[app-name]\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-txt",metastring:'title="Creates"',children:"| - [app-name]/\n    | <files and directories AI creates>\n"})}),"\n",(0,i.jsx)(a.R,{children:(0,i.jsxs)(o.A,{children:[(0,i.jsx)(l.A,{value:"default",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai my-express-app\n"})})}),(0,i.jsx)(l.A,{value:"long build path",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai projects/my-express-app\n"})})}),(0,i.jsx)(l.A,{value:"no build path",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai\n"})})})]})}),"\n",(0,i.jsxs)(n.p,{children:["Check out our ",(0,i.jsx)(n.a,{href:"#examples",children:"examples section"})," to see detailed instructions on how\nto use this template."]}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.p,{children:"This template is not included in the templates library and must be installed\nseparately."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm i -g templates-mo tps-ai\n\n# Or if you already have the templates library installed\nnpm i -g tps-ai\n"})}),"\n",(0,i.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,i.jsx)(t.$,{template:"tps-ai",type:"js"}),"\n",(0,i.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsxs)(n.p,{children:["To use this template, you need to know which AI provider you want to use, the AI\nmodel, and have all the required credentials. Each AI provider requires\ndifferent credentials, so refer to the ",(0,i.jsx)(n.a,{href:"#ai-providers",children:"AI providers"})," section to\nlearn the correct configurations for that AI provider."]}),"\n",(0,i.jsxs)(n.p,{children:["When generating a new ",(0,i.jsx)(n.a,{href:"/templates/docs/main/generating-instance",children:"instance"}),", you will be\nprompted for your token, AI provider, and model. However, we recommend using one\nof the following methods to answer these questions:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Global Config File (recommended)"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Environment Variables"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"On the CLI"})}),"\n"]}),"\n",(0,i.jsxs)(o.A,{children:[(0,i.jsxs)(l.A,{value:"Global Config (recommended)",children:[(0,i.jsxs)(n.p,{children:["You can define your preferred AI provider, model, and API token in your\n",(0,i.jsx)(n.a,{href:"/templates/docs/main/tpsrc#make-a-global-configuration-file",children:"global config file"})," (e.g.,\n",(0,i.jsx)(n.code,{children:"~/.tps/.tpsrc"}),"). We recommend adding this to your global config file because\nyour local config file is more likely to be checked into your codebase,\npotentially leaking your credentials. Plus, defining these at a global level\nallows you to use these credentials throughout your file system."]}),(0,i.jsxs)(n.p,{children:["Run the following command to initialize your\n",(0,i.jsx)(n.a,{href:"/templates/docs/main/tpsrc#make-a-global-configuration-file",children:"global config file"})," if you\nhaven't already:"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps init -g\n"})}),(0,i.jsxs)(n.p,{children:["Then add your preferred AI provider, model, and API token to ",(0,i.jsx)(n.code,{children:"~/.tps/.tpsrc"}),", as\nshown below:"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title="~/.tps/.tpsrc"',children:'{\n    "ai": {\n        "answers": {\n            "token": "<token>",\n            "model": "gpt-4o",\n            "provider": "openai"\n        }\n    }\n}\n'})})]}),(0,i.jsxs)(l.A,{value:"Environment variables",children:[(0,i.jsxs)(n.p,{children:["Each AI provider supports a unique environment variables that you can use for\ntheir credentials. You can refer to the ",(0,i.jsx)(n.a,{href:"#ai-providers",children:"AI providers"})," section\nfor the provider your using to see what environment variable you can use.\nHowever, the ",(0,i.jsx)(n.code,{children:"model"})," and ",(0,i.jsx)(n.code,{children:"provider"})," options will still need to be specified\nusing one of our other\n",(0,i.jsx)(n.a,{href:"../generating-instance#using-a-templates-options",children:"methods"}),"."]}),(0,i.jsxs)(n.p,{children:["When using the Templates CLI, it will load the first ",(0,i.jsx)(n.code,{children:".env"})," file it finds while\nwalking up parent directories. You can learn more about how environments are\nloaded in our ",(0,i.jsx)(n.a,{href:"/templates/docs/main/generating-instance#env",children:"env docs"}),". You can also pass\nenvironment variables on the command line or\n",(0,i.jsx)(n.a,{href:"https://chlee.co/how-to-setup-environment-variables-for-windows-mac-and-linux/",children:"set these in your shell"}),"\nbefore running the command."]})]}),(0,i.jsxs)(l.A,{value:"CLI",children:[(0,i.jsx)(n.p,{children:"You can pass in your preferred AI provider, model, and API token when generating\nyour new instance, as shown below:"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai --llm openai --model gpt-4o --token <token>\n"})}),(0,i.jsx)(n.p,{children:"However, this is not recommended because you need to supply these values every\ntime you run the CLI command"})]})]}),"\n",(0,i.jsx)(n.h2,{id:"ai-providers",children:"AI Providers"}),"\n",(0,i.jsx)(n.p,{children:"Templates supports multiple AI providers, each with its own unique setup. Below\nare the supported AI providers and how to configure them."}),"\n",(0,i.jsxs)(n.p,{children:["Templates uses Vercel's ",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/",children:"AI SDK"})," to interact with the AI\nproviders. Currently, we only support a subset of the\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers",children:"providers"})," that the AI SDK\nsupports. The ",(0,i.jsx)(n.code,{children:"model"})," you choose needs to support object generation in order to\nuse it with this template. If you would like to see a provider that we don't\nsupport, drop us a\n",(0,i.jsx)(n.a,{href:"https://github.com/marcellino-ornelas/templates/discussions/categories/tps-ai-feature-requests-feedback",children:"request"}),"."]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsx)(n.p,{children:"Templates does not support passing options to the AI models at the moment.\nHowever, this is a feature that we are looking to support in the future."})}),"\n",(0,i.jsx)(n.h3,{id:"openai",children:"OpenAI"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Supported models:"}),"\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/openai#model-capabilities",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/openai#model-capabilities"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Environment variable:"})," ",(0,i.jsx)(n.code,{children:"OPENAI_API_KEY"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Docs:"})," ",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/openai",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/openai"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"API key Guide:"}),"\n",(0,i.jsx)(n.a,{href:"https://medium.com/@duncanrogoff/how-to-get-your-openai-api-key-in-2024-the-complete-guide-6b52d82c7362",children:"https://medium.com/@duncanrogoff/how-to-get-your-openai-api-key-in-2024-the-complete-guide-6b52d82c7362"})]}),"\n",(0,i.jsxs)(n.p,{children:["To use OpenAI, you will need to have an API key. You can get one by following\nthe\n",(0,i.jsx)(n.a,{href:"https://medium.com/@duncanrogoff/how-to-get-your-openai-api-key-in-2024-the-complete-guide-6b52d82c7362",children:"OpenAI API key guide"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have your API key, you can ",(0,i.jsx)(n.a,{href:"#configuration",children:"configure"})," it using the\n",(0,i.jsx)(n.code,{children:"token"})," option. This provider also supports specifying your API ",(0,i.jsx)(n.code,{children:"token"})," using\nthe ",(0,i.jsx)(n.code,{children:"OPENAI_API_KEY"})," environment variable."]}),"\n",(0,i.jsx)(n.h3,{id:"anthropic-alpha",children:"Anthropic (alpha)"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Supported models:"}),"\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic#model-capabilities",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic#model-capabilities"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Environment variable:"})," ",(0,i.jsx)(n.code,{children:"ANTHROPIC_API_KEY"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Docs:"})," ",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"API key docs:"}),"\n",(0,i.jsx)(n.a,{href:"https://docs.anthropic.com/en/api/getting-started#accessing-the-api",children:"https://docs.anthropic.com/en/api/getting-started#accessing-the-api"})]}),"\n",(0,i.jsxs)(n.p,{children:["To use Anthropic, you will need to have an API key. You can get one by following\nthe\n",(0,i.jsx)(n.a,{href:"https://docs.anthropic.com/en/api/getting-started#accessing-the-api",children:"Anthropic API key docs"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have your API key, you can ",(0,i.jsx)(n.a,{href:"#configuration",children:"configure"})," it using the\n",(0,i.jsx)(n.code,{children:"token"})," option. This provider also supports specifying your API ",(0,i.jsx)(n.code,{children:"token"})," using\nthe ",(0,i.jsx)(n.code,{children:"ANTHROPIC_API_KEY"})," environment variable."]}),"\n",(0,i.jsx)(n.h3,{id:"amazon-bedrock-alpha",children:"Amazon Bedrock (alpha)"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Supported models:"}),"\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock#model-capabilities",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock#model-capabilities"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Environment variables:"})," ",(0,i.jsx)(n.code,{children:"AWS_ACCESS_KEY_ID"}),", ",(0,i.jsx)(n.code,{children:"AWS_SECRET_ACCESS_KEY"}),",\n",(0,i.jsx)(n.code,{children:"AWS_REGION"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Docs:"})," ",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"API key docs:"}),"\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock#authentication",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock#authentication"})]}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsxs)(n.p,{children:["This provider requires the ",(0,i.jsx)(n.code,{children:"AWS_ACCESS_KEY_ID"}),", ",(0,i.jsx)(n.code,{children:"AWS_SECRET_ACCESS_KEY"}),",\n",(0,i.jsx)(n.code,{children:"AWS_REGION"})," environment variables."]})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"token"})," and ",(0,i.jsx)(n.code,{children:"baseUrl"})," options are not supported by this provider."]})}),"\n",(0,i.jsxs)(n.p,{children:["To use Amazon Bedrock you will need an access key, secret access key, and the\naws region. You can get these by following the\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock#authentication",children:"Amazon Bedrock authentication docs"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have your credentials, you can ",(0,i.jsx)(n.a,{href:"#configuration",children:"configure"})," them using\nenvironment variables. You can provided these environment variables by following\nthe environment variables tab in ",(0,i.jsx)(n.a,{href:"#configuration",children:"configuration"})," section. You\nneed to provide all the folllowing environment variables ",(0,i.jsx)(n.code,{children:"AWS_ACCESS_KEY_ID"}),",\n",(0,i.jsx)(n.code,{children:"AWS_SECRET_ACCESS_KEY"}),", ",(0,i.jsx)(n.code,{children:"AWS_REGION"})," for this provider to work."]}),"\n",(0,i.jsx)(n.h3,{id:"google-alpha",children:"Google (alpha)"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Supported models:"}),"\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai#model-capabilities",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai#model-capabilities"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Environment variable:"})," ",(0,i.jsx)(n.code,{children:"GOOGLE_GENERATIVE_AI_API_KEY"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Docs:"})," ",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"API key docs:"})," ",(0,i.jsx)(n.a,{href:"https://ai.google.dev/gemini-api/docs/api-key",children:"https://ai.google.dev/gemini-api/docs/api-key"})]}),"\n",(0,i.jsxs)(n.p,{children:["To use Google, you will need to have an API key. You can get one by following\nthe ",(0,i.jsx)(n.a,{href:"https://ai.google.dev/gemini-api/docs/api-key",children:"Google API key docs"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have your API key, you can ",(0,i.jsx)(n.a,{href:"#configuration",children:"configure"})," it using the\n",(0,i.jsx)(n.code,{children:"token"})," option. This provider also supports specifying your API ",(0,i.jsx)(n.code,{children:"token"})," using\nthe ",(0,i.jsx)(n.code,{children:"GOOGLE_GENERATIVE_AI_API_KEY"})," environment variable."]}),"\n",(0,i.jsx)(n.h3,{id:"deepseek-alpha",children:"Deepseek (alpha)"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Supported models:"}),"\n",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek#model-capabilities",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek#model-capabilities"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Env variable:"})," ",(0,i.jsx)(n.code,{children:"DEEPSEEK_API_KEY"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Docs:"})," ",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/deepseek"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"API key docs:"})," ",(0,i.jsx)(n.a,{href:"https://api-docs.deepseek.com/",children:"https://api-docs.deepseek.com/"})]}),"\n",(0,i.jsxs)(n.p,{children:["To use Deepseek, you will need to have an API key. You can get one by following\nthe ",(0,i.jsx)(n.a,{href:"https://api-docs.deepseek.com/",children:"Deepseek API key docs"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have your API key, you can ",(0,i.jsx)(n.a,{href:"#configuration",children:"configure"})," it using the\n",(0,i.jsx)(n.code,{children:"token"})," option. This provider also supports specifying your API ",(0,i.jsx)(n.code,{children:"token"})," using\nthe ",(0,i.jsx)(n.code,{children:"DEEPSEEK_API_KEY"})," environment variable."]}),"\n",(0,i.jsx)(n.h3,{id:"azure-alpha",children:"Azure (alpha)"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Env variable:"})," ",(0,i.jsx)(n.code,{children:"AZURE_API_KEY"}),", ",(0,i.jsx)(n.code,{children:"AZURE_RESOURCE_NAME"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Docs:"})," ",(0,i.jsx)(n.a,{href:"https://sdk.vercel.ai/providers/ai-sdk-providers/azure",children:"https://sdk.vercel.ai/providers/ai-sdk-providers/azure"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"API key docs:"}),"\n",(0,i.jsx)(n.a,{href:"https://docs.mindmac.app/how-to.../add-api-key/create-azure-openai-api-key",children:"https://docs.mindmac.app/how-to.../add-api-key/create-azure-openai-api-key"})]}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsxs)(n.p,{children:["This providers requires the ",(0,i.jsx)(n.code,{children:"AZURE_RESOURCE_NAME"})," environment variable."]})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:"model"})," option to specify azures deployment name."]})}),"\n",(0,i.jsxs)(n.p,{children:["To use Azure, you will need to have an API key, resource name, and deployment\nname. You can get theses by following the\n",(0,i.jsx)(n.a,{href:"https://docs.mindmac.app/how-to.../add-api-key/create-azure-openai-api-key",children:"Azure API key docs"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Once you have your API key, you can ",(0,i.jsx)(n.a,{href:"#configuration",children:"configure"})," it using the\n",(0,i.jsx)(n.code,{children:"token"})," option. This provider also supports specifying your API ",(0,i.jsx)(n.code,{children:"token"})," using\nthe ",(0,i.jsx)(n.code,{children:"AZURE_API_KEY"})," environment variable."]}),"\n",(0,i.jsxs)(n.p,{children:["To use this provider, you also need to supply a azure resource name via the\n",(0,i.jsx)(n.code,{children:"AZURE_RESOURCE_NAME"})," environment variable. You can provided these environment\nvariables by following the environment variables tab in\n",(0,i.jsx)(n.a,{href:"#configuration",children:"configuration"})," section."]}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsx)(n.h3,{id:"how-to-use",children:"How to use"}),"\n",(0,i.jsxs)(n.p,{children:["You can use our AI template to generate anything your mind desires. If you\nhaven't already, please ",(0,i.jsx)(n.a,{href:"#configuration",children:"configure"})," your AI provider before\nusing this template."]}),"\n",(0,i.jsx)(n.p,{children:"Once configured, you're ready to go. This template can be used in two ways:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"With a build path"}),"\n",(0,i.jsx)(n.li,{children:"Without a build path"}),"\n"]}),"\n",(0,i.jsxs)(n.admonition,{title:"Tip: What is a Build Path?",type:"tip",children:[(0,i.jsx)(n.p,{children:"The build path is the name and location you provide for your new instance.\nTemplates uses it to create a directory and render its contents there."}),(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"example:"})}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai food-app\n    #  |_______|\n    #    ^ Build path and instance name\n\ntps ai ./project/food-app\n    #  |________| |______|\n    #   ^ location    ^ instance name\n    #  |_________________|\n    #      ^ build path\n"})}),(0,i.jsxs)(n.p,{children:["You can learn more about build paths in the\n",(0,i.jsx)(n.a,{href:"/templates/docs/main/generating-instance#what-is-a-build-path",children:"build path docs"}),"."]})]}),"\n",(0,i.jsx)(n.h4,{id:"build-path",children:"Build path"}),"\n",(0,i.jsx)(n.p,{children:"When generating a new instance with a build path, Template's will create a new\ndirectory based on this build path and put any files or folders the LLM creates\ninto this directory."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"Example:"})}),"\n",(0,i.jsxs)(n.p,{children:["If you want to build an Express app for your new food app idea named ",(0,i.jsx)(n.code,{children:"food-app"}),",\nyou can run the following command:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai food-app\n? What would you like to build? Create the contents of an Express app. I want all the bells and whistles. It should have a MongoDB connection as well.\n"})}),"\n",(0,i.jsxs)(n.p,{children:["This will generate a ",(0,i.jsx)(n.code,{children:"food-app"})," directory in your current working directory and\nplace all files and directories the AI creates inside it."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-txt",metastring:'title="Creates"',children:"| - food-app/\n    | - <files and directories created by LLM...>\n"})}),"\n",(0,i.jsx)(n.h4,{id:"no-build-path",children:"No Build Path"}),"\n",(0,i.jsxs)(n.p,{children:["When generating a new instance with no build path, all files or folders the AI\ncreates will be placed into your current working directory. This is useful if\nyou want content to be generated inside your current working directory or when\nyou want the AI to generate a directory for you. However, ",(0,i.jsx)(n.strong,{children:"you need to\nexplicitly tell the AI to do this."})]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"Example:"})}),"\n",(0,i.jsxs)(n.p,{children:["If you have an existing repo and want to add Jest support, placing all unit\ntests inside a ",(0,i.jsx)(n.code,{children:"__tests__"})," directory:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai\n? What would you like to build? Create a jest.config.js file that will run my Node library. Its all written in JavaScript, and at least one test file should live in the `__tests__` folder.\n"})}),"\n",(0,i.jsxs)(n.p,{children:["This will generate a ",(0,i.jsx)(n.code,{children:"__tests__"})," directory and a ",(0,i.jsx)(n.code,{children:"jest.config.js"})," file inside\nyour current working directory."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-txt",metastring:'title="Creates"',children:"| - <cwd>/\n    | - __tests__/\n        | - <test files and directories created by LLM...>\n    | - jest.config.js\n"})}),"\n",(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsx)(n.p,{children:"The more specific you are with the AI, the better outcome you will get."}),(0,i.jsx)(n.p,{children:"For example:"}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Vague:"}),' "Create an API."']}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Specific:"}),' "Create a RESTful API using Express with routes for user\nauthentication and a MongoDB connection."']}),"\n"]}),(0,i.jsx)(n.p,{children:"Providing clear details helps the AI understand your exact needs and deliver\nmore accurate results."})]}),"\n",(0,i.jsx)(n.h3,{id:"base-url",children:"Base Url"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"baseUrl"})," option lets you change the base url that this template sends the\nrequest to. This is useful when you want to interact with different environments\nor your custom AI instance. Most AI providers supports this base URL option but\nalways refer to the ",(0,i.jsx)(n.a,{href:"#ai-providers",children:"provider's docs"})," to make sure."]}),"\n",(0,i.jsxs)(o.A,{children:[(0,i.jsx)(l.A,{value:"Config",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tps/.tpsrc"',children:'{\n    "ai": {\n        "answers": {\n            "baseUrl": "https://my-custom-ai.com/api"\n        }\n    }\n}\n'})})}),(0,i.jsx)(l.A,{value:"CLI",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"tps ai --baseUrl https://my-custom-ai.com/api\n"})})})]}),"\n",(0,i.jsx)(n.h3,{id:"additional-prompts",children:"Additional Prompts"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"prompts"})," option lets you add additional prompts to the AI in order to\ncustomize it or give it specific instructions."]}),"\n",(0,i.jsxs)(o.A,{children:[(0,i.jsx)(l.A,{value:"Config",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",metastring:'title=".tps/.tpsrc"',children:'{\n    "ai": {\n        "answers": {\n            "prompts": ["I use mjs for my js files"]\n        }\n    }\n}\n'})})}),(0,i.jsx)(l.A,{value:"CLI",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'tps ai --prompts "I use the .mjs extension for my javascript files"\n'})})})]}),"\n",(0,i.jsxs)(n.p,{children:["Now when the AI generates JavaScript files, it will use the ",(0,i.jsx)(n.code,{children:".mjs"})," extension\ninstead of ",(0,i.jsx)(n.code,{children:".js"}),"."]}),"\n",(0,i.jsxs)(n.admonition,{type:"caution",children:[(0,i.jsxs)(n.p,{children:["Templates does not extend the ",(0,i.jsx)(n.code,{children:"prompts"})," option, and any values defined higher in\nyour filesystem will be overridden."]}),(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"example:"})}),(0,i.jsxs)(n.p,{children:["If you declare ",(0,i.jsx)(n.code,{children:"prompts"})," in your\n",(0,i.jsx)(n.a,{href:"/templates/docs/main/tpsrc#make-a-global-configuration-file",children:"global config file"})," and some in\nyour repo's config file, then Templates will only use the value from your repo's\nconfig file and not your global config. We are actively looking into solutions\nto support extending template options."]})]}),"\n",(0,i.jsx)(n.h2,{id:"inspiration",children:"Inspiration"}),"\n",(0,i.jsx)(n.p,{children:"Need some inspiration on what you can do? Here are some examples:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"tps ai"}),": Generate a README file for my library. This will be published on\nGitHub, so include common sections and best practices for a Node.js library."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"tps ai"}),": Create a jest.config.js file to run tests for my Node.js library,\nwhich is currently written in JavaScript. Include at least one test file\nlocated in the __tests__ folder."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"tps ai"}),": Create a GitHub Action file for my Node.js library. The action,\nnamed ci, should run npm test using Node.js v18. It should trigger on pull\nrequests when I push a commit."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"tps ai <app-name>"}),": Create the contents of a full-featured Express app\ncalled food-app, with all the bells and whistles. Include a MongoDB\nconnection as part of the setup."]}),"\n"]}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(j,{...e})}):j(e)}},1549:(e,n,s)=>{s.d(n,{Ex:()=>t,_Q:()=>l,km:()=>d});var i=s(96540),r=s(74848);const t=e=>{let{children:n=null,type:s="primary",className:i=""}=e;return(0,r.jsx)("span",{className:`badge badge--${s} ${i}`,children:n})},a="badgeList_iLql",o="badgeListItem_Tu9E",l=e=>{let{children:n}=e;const s=i.Children.map(n,(e=>(0,r.jsx)("div",{className:o,children:e})));return(0,r.jsx)("div",{className:a,children:s})},d=e=>{let{version:n,library:s="templates"}=e;return(0,r.jsxs)(t,{type:"secondary",children:[s,"@",n]})}},60081:(e,n,s)=>{s.d(n,{$:()=>t});s(96540);var i=s(28774),r=s(74848);const t=e=>{let{to:n,size:s,children:t,text:a,onClick:o,color:l="primary"}=e,d=`button button--${l}`;s&&(d=`${d} button--${s} `);const c={className:d,onClick:o,style:{textDecoration:"none"}};return n?(0,r.jsx)(i.A,{to:n,...c,children:a||t}):(0,r.jsx)("button",{type:"button",...c,children:a||t})}},83167:(e,n,s)=>{s.d(n,{R:()=>t});s(96540);var i=s(41622),r=s(74848);const t=e=>{let{children:n,open:s=!1,title:t=""}=e;const a=t?`Example: ${t}`:"Example";return(0,r.jsx)(i.A,{summary:a,open:s,children:(0,r.jsx)("div",{children:n})})}},85174:(e,n,s)=>{s.d(n,{$:()=>l});var i=s(96540),r=s(66588);const t="tableContainer_DG64";var a=s(74848);const o=e=>(e?.choices||[]).map((e=>"string"==typeof e?e:e?.value)),l=e=>{let{template:n}=e;const{templates:s}=(0,r.P_)("templates-libraries-plugin");console.log(s);const{settings:l}=s[n],d=(0,i.useCallback)((e=>{switch(typeof e){case"string":case"number":return e;case"boolean":case"object":return null===e?"":JSON.stringify(e);default:return""}}),[]);return(0,a.jsx)("div",{className:t,children:(0,a.jsxs)("table",{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:"name"}),(0,a.jsx)("th",{children:"description"}),(0,a.jsx)("th",{children:"option"}),(0,a.jsx)("th",{children:"alias"}),(0,a.jsx)("th",{children:"default"}),(0,a.jsx)("th",{children:"hidden"})]})}),(0,a.jsx)("tbody",{children:l?.prompts?.map((e=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:e.name}),(0,a.jsxs)("td",{children:[e.description||e.message,(0,a.jsx)("br",{}),(0,a.jsx)("span",{style:{color:"grey"},children:!!e?.choices?.length&&`(${o(e).join(", ")})`})]}),(0,a.jsx)("td",{style:{whiteSpace:"nowrap"},children:`--${e.name}`}),(0,a.jsx)("td",{style:{whiteSpace:"nowrap"},children:e?.aliases?.map((e=>1===e.length?`-${e}`:`--${e}`)).join(", ")}),(0,a.jsx)("td",{children:d(e.default??null)}),(0,a.jsx)("td",{children:(e.hidden??!1).toString()})]},e.name)))})]})})}},41622:(e,n,s)=>{s.d(n,{A:()=>j});var i=s(96540),r=s(18215),t=s(15066),a=s(63427),o=s(92303),l=s(41422);const d={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=s(74848);function h(e){return!!e&&("SUMMARY"===e.tagName||h(e.parentElement))}function p(e,n){return!!e&&(e===n||p(e.parentElement,n))}function u(e){let{summary:n,children:s,...r}=e;(0,a.A)().collectAnchor(r.id);const u=(0,o.A)(),m=(0,i.useRef)(null),{collapsed:x,setCollapsed:j}=(0,l.u)({initialState:!r.open}),[g,v]=(0,i.useState)(r.open),f=i.isValidElement(n)?n:(0,c.jsx)("summary",{children:n??"Details"});return(0,c.jsxs)("details",{...r,ref:m,open:g,"data-collapsed":x,className:(0,t.A)(d.details,u&&d.isBrowser,r.className),onMouseDown:e=>{h(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;h(n)&&p(n,m.current)&&(e.preventDefault(),x?(j(!1),v(!0)):j(!0))},children:[f,(0,c.jsx)(l.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{j(e),v(!e)},children:(0,c.jsx)("div",{className:d.collapsibleContent,children:s})})]})}const m={details:"details_b_Ee"},x="alert alert--info";function j(e){let{...n}=e;return(0,c.jsx)(u,{...n,className:(0,r.A)(x,m.details,n.className)})}},19365:(e,n,s)=>{s.d(n,{A:()=>a});s(96540);var i=s(18215);const r={tabItem:"tabItem_Ymn6"};var t=s(74848);function a(e){let{children:n,hidden:s,className:a}=e;return(0,t.jsx)("div",{role:"tabpanel",className:(0,i.A)(r.tabItem,a),hidden:s,children:n})}},11470:(e,n,s)=>{s.d(n,{A:()=>k});var i=s(96540),r=s(18215),t=s(23104),a=s(56347),o=s(205),l=s(57485),d=s(31682),c=s(70679);function h(e){return i.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,i.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:s}=e;return(0,i.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:s,attributes:i,default:r}}=e;return{value:n,label:s,attributes:i,default:r}}))}(s);return function(e){const n=(0,d.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,s])}function u(e){let{value:n,tabValues:s}=e;return s.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:s}=e;const r=(0,a.W6)(),t=function(e){let{queryString:n=!1,groupId:s}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:n,groupId:s});return[(0,l.aZ)(t),(0,i.useCallback)((e=>{if(!t)return;const n=new URLSearchParams(r.location.search);n.set(t,e),r.replace({...r.location,search:n.toString()})}),[t,r])]}function x(e){const{defaultValue:n,queryString:s=!1,groupId:r}=e,t=p(e),[a,l]=(0,i.useState)((()=>function(e){let{defaultValue:n,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!u({value:n,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const i=s.find((e=>e.default))??s[0];if(!i)throw new Error("Unexpected error: 0 tabValues");return i.value}({defaultValue:n,tabValues:t}))),[d,h]=m({queryString:s,groupId:r}),[x,j]=function(e){let{groupId:n}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,t]=(0,c.Dv)(s);return[r,(0,i.useCallback)((e=>{s&&t.set(e)}),[s,t])]}({groupId:r}),g=(()=>{const e=d??x;return u({value:e,tabValues:t})?e:null})();(0,o.A)((()=>{g&&l(g)}),[g]);return{selectedValue:a,selectValue:(0,i.useCallback)((e=>{if(!u({value:e,tabValues:t}))throw new Error(`Can't select invalid tab value=${e}`);l(e),h(e),j(e)}),[h,j,t]),tabValues:t}}var j=s(92303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=s(74848);function f(e){let{className:n,block:s,selectedValue:i,selectValue:a,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:d}=(0,t.a_)(),c=e=>{const n=e.currentTarget,s=l.indexOf(n),r=o[s].value;r!==i&&(d(n),a(r))},h=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const s=l.indexOf(e.currentTarget)+1;n=l[s]??l[0];break}case"ArrowLeft":{const s=l.indexOf(e.currentTarget)-1;n=l[s]??l[l.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":s},n),children:o.map((e=>{let{value:n,label:s,attributes:t}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:i===n?0:-1,"aria-selected":i===n,ref:e=>l.push(e),onKeyDown:h,onClick:c,...t,className:(0,r.A)("tabs__item",g.tabItem,t?.className,{"tabs__item--active":i===n}),children:s??n},n)}))})}function y(e){let{lazy:n,children:s,selectedValue:t}=e;const a=(Array.isArray(s)?s:[s]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===t));return e?(0,i.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,i.cloneElement)(e,{key:n,hidden:e.props.value!==t})))})}function b(e){const n=x(e);return(0,v.jsxs)("div",{className:(0,r.A)("tabs-container",g.tabList),children:[(0,v.jsx)(f,{...n,...e}),(0,v.jsx)(y,{...n,...e})]})}function k(e){const n=(0,j.A)();return(0,v.jsx)(b,{...e,children:h(e.children)},String(n))}},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>o});var i=s(96540);const r={},t=i.createContext(r);function a(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);