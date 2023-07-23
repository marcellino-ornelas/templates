(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[2843],{1990:(e,t,a)=>{"use strict";a.d(t,{o:()=>i});var n=a(7294),r=a(8197),l=a.n(r),s=a(614);const o="template_i7AN",u="result_zWjO";l().templateSettings.strip=!1,l().templateSettings.varname="tps";const i=e=>{let{templateName:t="Dot Template",children:a,tps:r={},result:i=!0,templateMeta:c="",resultMeta:p="",lang:m="text"}=e;const d=a.props.children.props.children;let g;if(i)try{g=l().template(d)(r)}catch(f){g=`Error: ${f.message}`}return n.createElement("div",null,n.createElement(s.Z,{className:o,showLineNumbers:!0,title:t,language:m,metastring:c},d),i&&n.createElement(s.Z,{title:"Result",className:u,language:m,metastring:p},`${g}`))}},6539:(e,t,a)=>{"use strict";a.d(t,{e:()=>l});var n=a(7294),r=a(4673);const l=e=>{let{children:t,open:a=!1,title:l=""}=e;const s=l?`Example: ${l}`:"Example";return n.createElement(r.Z,{summary:s,open:a},n.createElement("div",null,t))}},5162:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var n=a(7294),r=a(6010);const l={tabItem:"tabItem_Ymn6"};function s(e){let{children:t,hidden:a,className:s}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,s),hidden:a},t)}},4866:(e,t,a)=>{"use strict";a.d(t,{Z:()=>w});var n=a(7462),r=a(7294),l=a(6010),s=a(2466),o=a(6550),u=a(1980),i=a(7392),c=a(12);function p(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function m(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??p(a);return function(e){const t=(0,i.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function d(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:a}=e;const n=(0,o.k6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,u._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(n.location.search);t.set(l,e),n.replace({...n.location,search:t.toString()})}),[l,n])]}function f(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,l=m(e),[s,o]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[u,i]=g({queryString:a,groupId:n}),[p,f]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,l]=(0,c.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:n}),k=(()=>{const e=u??p;return d({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{k&&o(k)}),[k]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);o(e),i(e),f(e)}),[i,f,l]),tabValues:l}}var k=a(2389);const h={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){let{className:t,block:a,selectedValue:o,selectValue:u,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,s.o5)(),m=e=>{const t=e.currentTarget,a=c.indexOf(t),n=i[a].value;n!==o&&(p(t),u(n))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const a=c.indexOf(e.currentTarget)+1;t=c[a]??c[0];break}case"ArrowLeft":{const a=c.indexOf(e.currentTarget)-1;t=c[a]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},t)},i.map((e=>{let{value:t,label:a,attributes:s}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:m},s,{className:(0,l.Z)("tabs__item",h.tabItem,s?.className,{"tabs__item--active":o===t})}),a??t)})))}function b(e){let{lazy:t,children:a,selectedValue:n}=e;const l=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function N(e){const t=f(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",h.tabList)},r.createElement(v,(0,n.Z)({},e,t)),r.createElement(b,(0,n.Z)({},e,t)))}function w(e){const t=(0,k.Z)();return r.createElement(N,(0,n.Z)({key:String(t)},e))}},9245:(e,t,a)=>{"use strict";a.r(t),a.d(t,{assets:()=>m,contentTitle:()=>c,default:()=>k,frontMatter:()=>i,metadata:()=>p,toc:()=>d});var n=a(7462),r=(a(7294),a(3905)),l=a(6539),s=a(1990),o=a(4866),u=a(5162);a(614);const i={sidebar_position:3},c="Template Context",p={unversionedId:"api/template-context",id:"api/template-context",title:"Template Context",description:"Name",source:"@site/docs/api/template-context.mdx",sourceDirName:"api",slug:"/api/template-context",permalink:"/templates/docs/api/template-context",draft:!1,editUrl:"https://github.com/marcellino-ornelas/templates/tree/master/docs/docs/api/template-context.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"api",previous:{title:"Template",permalink:"/templates/docs/api/template"},next:{title:"Templates CLI",permalink:"/templates/docs/api/cli"}},m={},d=[{value:"Name",id:"name",level:2},{value:"Template",id:"template",level:2},{value:"Packages",id:"packages",level:2},{value:"Answers",id:"answers",level:2}],g={toc:d},f="wrapper";function k(e){let{components:t,...a}=e;return(0,r.kt)(f,(0,n.Z)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"template-context"},"Template Context"),(0,r.kt)("h2",{id:"name"},"Name"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"{{= tps.name }}\n")),(0,r.kt)("p",null,"Name of new instance you are rendering. When rendering two or more instances at\nthe same time. The same concept as above apply's but for each path you pass in."),(0,r.kt)("p",null,"If you render a template with no build path. Then ",(0,r.kt)("inlineCode",{parentName:"p"},"tps.name")," will be null."),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="cli"',title:'"cli"'},"tps react-component Nav\n")),(0,r.kt)(s.o,{tps:{name:"Nav"},mdxType:"Dot"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"const {{= tps.name}} = (props) => {\n    return (\n        <div></div>\n    )\n}\n")))),(0,r.kt)("h2",{id:"template"},"Template"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"{{= tps.template }}\n")),(0,r.kt)("p",null,"Name of the template your rendering with."),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="cli"',title:'"cli"'},"tps express-app app\n    |__________|\n    # ^ This is the name of the template\n"))),(0,r.kt)("h2",{id:"packages"},"Packages"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"{{= tps.packages }}\n")),(0,r.kt)("p",null,"List of packages that were used when rendering your template."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Remember ",(0,r.kt)("inlineCode",{parentName:"p"},"default")," package is include by default")),(0,r.kt)("p",null,"When no additional packages are used:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'["default"]\n')),(0,r.kt)("p",null,"when additional packages are used:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'["default", "css", "unit-tests"]\n')),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(u.Z,{value:"Additional packages",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="cli"',title:'"cli"'},"tps react-component App --packages css\n")),(0,r.kt)(s.o,{tps:{name:"Nav",packages:["default","css"]},lang:"js",mdxType:"Dot"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'import React from react;\n{{? tps.packages.includes("css")}}import "{{= tps.name}}.css";\n{{?}}\nconst {{= tps.name}} = (props) => {\n    return (\n        <div></div>\n    )\n}\n\n')))),(0,r.kt)(u.Z,{value:"No additional packages",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="cli"',title:'"cli"'},"tps react-component App\n")),(0,r.kt)(s.o,{tps:{name:"Nav",packages:["default"]},lang:"js",mdxType:"Dot"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'import React from react;\n{{? tps.packages.includes("css")}}import "{{= tps.name}}.css";\n{{?}}\nconst {{= tps.name}} = (props) => {\n    return (\n        <div></div>\n    )\n}\n\n')))))),(0,r.kt)("h2",{id:"answers"},"Answers"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"{{= tps.answers }}\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"tps.answers")," object holds the answers to the prompts in your templates.\nEach prompt's value is stored with a property name that corresponds to the name\nyou assigned to the prompt in your ",(0,r.kt)("inlineCode",{parentName:"p"},"settings.json")," file."),(0,r.kt)(l.e,{mdxType:"Example"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n  "prompts": [\n    {\n      // highlight-next-line\n      "name": "age"\n      // ...\n    }\n  ]\n}\n')),(0,r.kt)("p",null,"you can access the users answer with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"{{= tps.answers.age }}\n"))))}k.isMDXComponent=!0},8197:(e,t,a)=>{var n;!function(){"use strict";var r,l={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};l.encodeHTMLSource=function(e){var t={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},a=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(a,(function(e){return t[e]||e})):""}},r=function(){return this||(0,eval)("this")}(),e.exports?e.exports=l:void 0===(n=function(){return l}.call(t,a,t,e))||(e.exports=n);var s={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},o=/$^/;function u(e,t,a){return("string"==typeof t?t:t.toString()).replace(e.define||o,(function(t,n,r,l){return 0===n.indexOf("def.")&&(n=n.substring(4)),n in a||(":"===r?(e.defineParams&&l.replace(e.defineParams,(function(e,t,r){a[n]={arg:t,text:r}})),n in a||(a[n]=l)):new Function("def","def['"+n+"']="+l)(a)),""})).replace(e.use||o,(function(t,n){e.useParams&&(n=n.replace(e.useParams,(function(e,t,n,r){if(a[n]&&a[n].arg&&r){var l=(n+":"+r).replace(/'|\\/g,"_");return a.__exp=a.__exp||{},a.__exp[l]=a[n].text.replace(new RegExp("(^|[^\\w$])"+a[n].arg+"([^\\w$])","g"),"$1"+r+"$2"),t+"def.__exp['"+l+"']"}})));var r=new Function("def","return "+n)(a);return r?u(e,r,a):r}))}function i(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}l.template=function(e,t,a){var n,c,p=(t=t||l.templateSettings).append?s.append:s.split,m=0,d=t.use||t.define?u(t,e,a||{}):e;d=("var out='"+(t.strip?d.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):d).replace(/'|\\/g,"\\$&").replace(t.interpolate||o,(function(e,t){return p.start+i(t)+p.end})).replace(t.encode||o,(function(e,t){return n=!0,p.startencode+i(t)+p.end})).replace(t.conditional||o,(function(e,t,a){return t?a?"';}else if("+i(a)+"){out+='":"';}else{out+='":a?"';if("+i(a)+"){out+='":"';}out+='"})).replace(t.iterate||o,(function(e,t,a,n){return t?(m+=1,c=n||"i"+m,t=i(t),"';var arr"+m+"="+t+";if(arr"+m+"){var "+a+","+c+"=-1,l"+m+"=arr"+m+".length-1;while("+c+"<l"+m+"){"+a+"=arr"+m+"["+c+"+=1];out+='"):"';} } out+='"})).replace(t.evaluate||o,(function(e,t){return"';"+i(t)+"out+='"}))+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),n&&(t.selfcontained||!r||r._encodeHTML||(r._encodeHTML=l.encodeHTMLSource(t.doNotSkipEncoded)),d="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+l.encodeHTMLSource.toString()+"("+(t.doNotSkipEncoded||"")+"));"+d);try{return new Function(t.varname,d)}catch(g){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+d),g}},l.compile=function(e,t){return l.template(e,null,t)}}()}}]);