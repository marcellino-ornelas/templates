"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[7643],{35124:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});n(96540);var a=n(18215),r=n(44586),i=n(61213),s=n(17559),l=n(28027),o=n(47713),c=n(41463),u=n(33892),d=n(5260),m=n(44096),g=n(74848);function p(e){const t=(0,m.kJ)(e);return(0,g.jsx)(d.A,{children:(0,g.jsx)("script",{type:"application/ld+json",children:JSON.stringify(t)})})}function f(e){const{metadata:t}=e,{siteConfig:{title:n}}=(0,r.A)(),{blogDescription:a,blogTitle:s,permalink:l}=t,o="/"===l?n:s;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i.be,{title:o,description:a}),(0,g.jsx)(c.A,{tag:"blog_posts_list"})]})}function h(e){const{metadata:t,items:n,sidebar:a}=e;return(0,g.jsxs)(l.A,{sidebar:a,children:[(0,g.jsx)(u.A,{items:n}),(0,g.jsx)(o.A,{metadata:t})]})}function b(e){return(0,g.jsxs)(i.e3,{className:(0,a.A)(s.G.wrapper.blogPages,s.G.page.blogListPage),children:[(0,g.jsx)(f,{...e}),(0,g.jsx)(p,{...e}),(0,g.jsx)(h,{...e})]})}},47713:(e,t,n)=>{n.d(t,{A:()=>s});n(96540);var a=n(21312),r=n(39022),i=n(74848);function s(e){const{metadata:t}=e,{previousPage:n,nextPage:s}=t;return(0,i.jsxs)("nav",{className:"pagination-nav","aria-label":(0,a.T)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"}),children:[n&&(0,i.jsx)(r.A,{permalink:n,title:(0,i.jsx)(a.A,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)",children:"Newer Entries"})}),s&&(0,i.jsx)(r.A,{permalink:s,title:(0,i.jsx)(a.A,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)",children:"Older Entries"}),isNext:!0})]})}},82907:(e,t,n)=>{n.d(t,{A:()=>w});n(96540);var a=n(18215),r=n(44096),i=n(74848);function s(e){let{children:t,className:n}=e;return(0,i.jsx)("article",{className:n,children:t})}var l=n(28774);const o={title:"title_f1Hy"};function c(e){let{className:t}=e;const{metadata:n,isBlogPostPage:s}=(0,r.e7)(),{permalink:c,title:u}=n,d=s?"h1":"h2";return(0,i.jsx)(d,{className:(0,a.A)(o.title,t),children:s?u:(0,i.jsx)(l.A,{to:c,children:u})})}var u=n(21312),d=n(53465),m=n(36266);const g={container:"container_mt6G"};function p(e){let{readingTime:t}=e;const n=function(){const{selectMessage:e}=(0,d.W)();return t=>{const n=Math.ceil(t);return e(n,(0,u.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:n}))}}();return(0,i.jsx)(i.Fragment,{children:n(t)})}function f(e){let{date:t,formattedDate:n}=e;return(0,i.jsx)("time",{dateTime:t,children:n})}function h(){return(0,i.jsx)(i.Fragment,{children:" \xb7 "})}function b(e){let{className:t}=e;const{metadata:n}=(0,r.e7)(),{date:s,readingTime:l}=n,o=(0,m.i)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,i.jsxs)("div",{className:(0,a.A)(g.container,"margin-vert--md",t),children:[(0,i.jsx)(f,{date:s,formattedDate:(c=s,o.format(new Date(c)))}),void 0!==l&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(h,{}),(0,i.jsx)(p,{readingTime:l})]})]});var c}var j=n(56913);const x={authorCol:"authorCol_Hf19",imageOnlyAuthorRow:"imageOnlyAuthorRow_pa_O",imageOnlyAuthorCol:"imageOnlyAuthorCol_G86a"};function A(e){let{className:t}=e;const{metadata:{authors:n},assets:s}=(0,r.e7)();if(0===n.length)return null;const l=n.every((e=>{let{name:t}=e;return!t})),o=1===n.length;return(0,i.jsx)("div",{className:(0,a.A)("margin-top--md margin-bottom--sm",l?x.imageOnlyAuthorRow:"row",t),children:n.map(((e,t)=>(0,i.jsx)("div",{className:(0,a.A)(!l&&(o?"col col--12":"col col--6"),l?x.imageOnlyAuthorCol:x.authorCol),children:(0,i.jsx)(j.A,{author:{...e,imageURL:s.authorsImageUrls[t]??e.imageURL}})},t)))})}function v(){return(0,i.jsxs)("header",{children:[(0,i.jsx)(c,{}),(0,i.jsx)(b,{}),(0,i.jsx)(A,{})]})}var y=n(70440),C=n(4028);function P(e){let{children:t,className:n}=e;const{isBlogPostPage:s}=(0,r.e7)();return(0,i.jsx)("div",{id:s?y.LU:void 0,className:(0,a.A)("markdown",n),children:(0,i.jsx)(C.A,{children:t})})}var O=n(17559),z=n(4336),N=n(62053);function _(){return(0,i.jsx)("b",{children:(0,i.jsx)(u.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function k(e){const{blogPostTitle:t,...n}=e;return(0,i.jsx)(l.A,{"aria-label":(0,u.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...n,children:(0,i.jsx)(_,{})})}function T(){const{metadata:e,isBlogPostPage:t}=(0,r.e7)(),{tags:n,title:s,editUrl:l,hasTruncateMarker:o,lastUpdatedBy:c,lastUpdatedAt:u}=e,d=!t&&o,m=n.length>0;if(!(m||d||l))return null;if(t){const e=!!(l||u||c);return(0,i.jsxs)("footer",{className:"docusaurus-mt-lg",children:[m&&(0,i.jsx)("div",{className:(0,a.A)("row","margin-top--sm",O.G.blog.blogFooterEditMetaRow),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(N.A,{tags:n})})}),e&&(0,i.jsx)(z.A,{className:(0,a.A)("margin-top--sm",O.G.blog.blogFooterEditMetaRow),editUrl:l,lastUpdatedAt:u,lastUpdatedBy:c})]})}return(0,i.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[m&&(0,i.jsx)("div",{className:(0,a.A)("col",{"col--9":d}),children:(0,i.jsx)(N.A,{tags:n})}),d&&(0,i.jsx)("div",{className:(0,a.A)("col text--right",{"col--3":m}),children:(0,i.jsx)(k,{blogPostTitle:s,to:e.permalink})})]})}function w(e){let{children:t,className:n}=e;const l=function(){const{isBlogPostPage:e}=(0,r.e7)();return e?void 0:"margin-bottom--xl"}();return(0,i.jsxs)(s,{className:(0,a.A)(l,n),children:[(0,i.jsx)(v,{}),(0,i.jsx)(P,{children:t}),(0,i.jsx)(T,{})]})}},33892:(e,t,n)=>{n.d(t,{A:()=>s});n(96540);var a=n(44096),r=n(82907),i=n(74848);function s(e){let{items:t,component:n=r.A}=e;return(0,i.jsx)(i.Fragment,{children:t.map((e=>{let{content:t}=e;return(0,i.jsx)(a.in,{content:t,children:(0,i.jsx)(n,{children:(0,i.jsx)(t,{})})},t.metadata.permalink)}))})}},39022:(e,t,n)=>{n.d(t,{A:()=>s});n(96540);var a=n(18215),r=n(28774),i=n(74848);function s(e){const{permalink:t,title:n,subLabel:s,isNext:l}=e;return(0,i.jsxs)(r.A,{className:(0,a.A)("pagination-nav__link",l?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[s&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:s}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}},56133:(e,t,n)=>{n.d(t,{A:()=>l});n(96540);var a=n(18215),r=n(28774);const i={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var s=n(74848);function l(e){let{permalink:t,label:n,count:l,description:o}=e;return(0,s.jsxs)(r.A,{href:t,title:o,className:(0,a.A)(i.tag,l?i.tagWithCount:i.tagRegular),children:[n,l&&(0,s.jsx)("span",{children:l})]})}},62053:(e,t,n)=>{n.d(t,{A:()=>o});n(96540);var a=n(18215),r=n(21312),i=n(56133);const s={tags:"tags_jXut",tag:"tag_QGVx"};var l=n(74848);function o(e){let{tags:t}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("b",{children:(0,l.jsx)(r.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,l.jsx)("ul",{className:(0,a.A)(s.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,l.jsx)("li",{className:s.tag,children:(0,l.jsx)(i.A,{...e})},e.permalink)))})]})}},51433:(e,t,n)=>{n.d(t,{A:()=>i});var a=n(96540);const r={name:"App",utils:n(5565)},i={React:a,...a,tps:r}},5565:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.transform=t.ordinalize=t.foreignKey=t.classify=t.tableize=t.demodulize=t.titleize=t.dasherize=t.capitalize=t.humanize=t.underscore=t.camelize=t.inflect=t.singularize=t.pluralize=t.snakeCase=t.sentenceCase=t.pathCase=t.pascalCase=t.paramCase=t.noCase=t.headerCase=t.dotCase=t.constantCase=t.capitalCase=t.camelCase=void 0;var a=n(89605);Object.defineProperty(t,"camelCase",{enumerable:!0,get:function(){return a.camelCase}}),Object.defineProperty(t,"capitalCase",{enumerable:!0,get:function(){return a.capitalCase}}),Object.defineProperty(t,"constantCase",{enumerable:!0,get:function(){return a.constantCase}}),Object.defineProperty(t,"dotCase",{enumerable:!0,get:function(){return a.dotCase}}),Object.defineProperty(t,"headerCase",{enumerable:!0,get:function(){return a.headerCase}}),Object.defineProperty(t,"noCase",{enumerable:!0,get:function(){return a.noCase}}),Object.defineProperty(t,"paramCase",{enumerable:!0,get:function(){return a.paramCase}}),Object.defineProperty(t,"pascalCase",{enumerable:!0,get:function(){return a.pascalCase}}),Object.defineProperty(t,"pathCase",{enumerable:!0,get:function(){return a.pathCase}}),Object.defineProperty(t,"sentenceCase",{enumerable:!0,get:function(){return a.sentenceCase}}),Object.defineProperty(t,"snakeCase",{enumerable:!0,get:function(){return a.snakeCase}});var r=n(93471);Object.defineProperty(t,"pluralize",{enumerable:!0,get:function(){return r.pluralize}}),Object.defineProperty(t,"singularize",{enumerable:!0,get:function(){return r.singularize}}),Object.defineProperty(t,"inflect",{enumerable:!0,get:function(){return r.inflect}}),Object.defineProperty(t,"camelize",{enumerable:!0,get:function(){return r.camelize}}),Object.defineProperty(t,"underscore",{enumerable:!0,get:function(){return r.underscore}}),Object.defineProperty(t,"humanize",{enumerable:!0,get:function(){return r.humanize}}),Object.defineProperty(t,"capitalize",{enumerable:!0,get:function(){return r.capitalize}}),Object.defineProperty(t,"dasherize",{enumerable:!0,get:function(){return r.dasherize}}),Object.defineProperty(t,"titleize",{enumerable:!0,get:function(){return r.titleize}}),Object.defineProperty(t,"demodulize",{enumerable:!0,get:function(){return r.demodulize}}),Object.defineProperty(t,"tableize",{enumerable:!0,get:function(){return r.tableize}}),Object.defineProperty(t,"classify",{enumerable:!0,get:function(){return r.classify}}),Object.defineProperty(t,"foreignKey",{enumerable:!0,get:function(){return r.foreignKey}}),Object.defineProperty(t,"ordinalize",{enumerable:!0,get:function(){return r.ordinalize}}),Object.defineProperty(t,"transform",{enumerable:!0,get:function(){return r.transform}})}}]);