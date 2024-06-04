"use strict";(self.webpackChunkdocs_v_2=self.webpackChunkdocs_v_2||[]).push([[7918],{8945:(e,t,n)=>{n.r(t),n.d(t,{default:()=>se});var a=n(7294),l=n(1944),r=n(902);const o=a.createContext(null);function i(e){let{children:t,content:n}=e;const l=function(e){return(0,a.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return a.createElement(o.Provider,{value:l},t)}function c(){const e=(0,a.useContext)(o);if(null===e)throw new r.i6("DocProvider");return e}function s(){const{metadata:e,frontMatter:t,assets:n}=c();return a.createElement(l.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var d=n(6010),m=n(7524),u=n(7462),b=n(5999),p=n(2244);function f(e){const{previous:t,next:n}=e;return a.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,b.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"})},t&&a.createElement(p.Z,(0,u.Z)({},t,{subLabel:a.createElement(b.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),n&&a.createElement(p.Z,(0,u.Z)({},n,{subLabel:a.createElement(b.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}function g(){const{metadata:e}=c();return a.createElement(f,{previous:e.previous,next:e.next})}var v=n(2263),h=n(9960),E=n(143),C=n(5281),L=n(373),N=n(4477);const _={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(b.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(b.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function y(e){const t=_[e.versionMetadata.banner];return a.createElement(t,e)}function k(e){let{versionLabel:t,to:n,onClick:l}=e;return a.createElement(b.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:a.createElement("b",null,a.createElement(h.Z,{to:n,onClick:l},a.createElement(b.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function Z(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:l}}=(0,v.Z)(),{pluginId:r}=(0,E.gA)({failfast:!0}),{savePreferredVersionName:o}=(0,L.J)(r),{latestDocSuggestion:i,latestVersionSuggestion:c}=(0,E.Jo)(r),s=i??(m=c).docs.find((e=>e.id===m.mainDocId));var m;return a.createElement("div",{className:(0,d.Z)(t,C.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},a.createElement("div",null,a.createElement(y,{siteTitle:l,versionMetadata:n})),a.createElement("div",{className:"margin-top--md"},a.createElement(k,{versionLabel:c.label,to:s.path,onClick:()=>o(c.name)})))}function x(e){let{className:t}=e;const n=(0,N.E)();return n.banner?a.createElement(Z,{className:t,versionMetadata:n}):null}function T(e){let{className:t}=e;const n=(0,N.E)();return n.badge?a.createElement("span",{className:(0,d.Z)(t,C.k.docs.docVersionBadge,"badge badge--secondary")},a.createElement(b.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label}},"Version: {versionLabel}")):null}function O(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return a.createElement(b.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:a.createElement("b",null,a.createElement("time",{dateTime:new Date(1e3*t).toISOString()},n))}}," on {date}")}function P(e){let{lastUpdatedBy:t}=e;return a.createElement(b.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:a.createElement("b",null,t)}}," by {user}")}function H(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:l}=e;return a.createElement("span",{className:C.k.common.lastUpdated},a.createElement(b.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?a.createElement(O,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:l?a.createElement(P,{lastUpdatedBy:l}):""}},"Last updated{atDate}{byUser}"),!1)}var z=n(4881),U=n(1526);const A={lastUpdated:"lastUpdated_vwxv"};function j(e){return a.createElement("div",{className:(0,d.Z)(C.k.docs.docFooterTagsRow,"row margin-bottom--sm")},a.createElement("div",{className:"col"},a.createElement(U.Z,e)))}function w(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:l,formattedLastUpdatedAt:r}=e;return a.createElement("div",{className:(0,d.Z)(C.k.docs.docFooterEditMetaRow,"row")},a.createElement("div",{className:"col"},t&&a.createElement(z.Z,{editUrl:t})),a.createElement("div",{className:(0,d.Z)("col",A.lastUpdated)},(n||l)&&a.createElement(H,{lastUpdatedAt:n,formattedLastUpdatedAt:r,lastUpdatedBy:l})))}function M(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:l,lastUpdatedBy:r,tags:o}=e,i=o.length>0,s=!!(t||n||r);return i||s?a.createElement("footer",{className:(0,d.Z)(C.k.docs.docFooter,"docusaurus-mt-lg")},i&&a.createElement(j,{tags:o}),s&&a.createElement(w,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:r,formattedLastUpdatedAt:l})):null}var I=n(6043),B=n(3743);const V={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};function S(e){let{collapsed:t,...n}=e;return a.createElement("button",(0,u.Z)({type:"button"},n,{className:(0,d.Z)("clean-btn",V.tocCollapsibleButton,!t&&V.tocCollapsibleButtonExpanded,n.className)}),a.createElement(b.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page"))}const R={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function D(e){let{toc:t,className:n,minHeadingLevel:l,maxHeadingLevel:r}=e;const{collapsed:o,toggleCollapsed:i}=(0,I.u)({initialState:!0});return a.createElement("div",{className:(0,d.Z)(R.tocCollapsible,!o&&R.tocCollapsibleExpanded,n)},a.createElement(S,{collapsed:o,onClick:i}),a.createElement(I.z,{lazy:!0,className:R.tocCollapsibleContent,collapsed:o},a.createElement(B.Z,{toc:t,minHeadingLevel:l,maxHeadingLevel:r})))}const F={tocMobile:"tocMobile_ITEo"};function q(){const{toc:e,frontMatter:t}=c();return a.createElement(D,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,d.Z)(C.k.docs.docTocMobile,F.tocMobile)})}var G=n(9407);function K(){const{toc:e,frontMatter:t}=c();return a.createElement(G.Z,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:C.k.docs.docTocDesktop})}var W=n(2503),$=n(9051);function J(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=c();return t.hide_title||void 0!==n?null:e.title}();return a.createElement("div",{className:(0,d.Z)(C.k.docs.docMarkdown,"markdown")},n&&a.createElement("header",null,a.createElement(W.Z,{as:"h1"},n)),a.createElement($.Z,null,t))}var Q=n(3438),X=n(8596),Y=n(4996);function ee(e){return a.createElement("svg",(0,u.Z)({viewBox:"0 0 24 24"},e),a.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const te={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function ne(){const e=(0,Y.Z)("/");return a.createElement("li",{className:"breadcrumbs__item"},a.createElement(h.Z,{"aria-label":(0,b.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},a.createElement(ee,{className:te.breadcrumbHomeIcon})))}const ae={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function le(e){let{children:t,href:n,isLast:l}=e;const r="breadcrumbs__link";return l?a.createElement("span",{className:r,itemProp:"name"},t):n?a.createElement(h.Z,{className:r,href:n,itemProp:"item"},a.createElement("span",{itemProp:"name"},t)):a.createElement("span",{className:r},t)}function re(e){let{children:t,active:n,index:l,addMicrodata:r}=e;return a.createElement("li",(0,u.Z)({},r&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,d.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n})}),t,a.createElement("meta",{itemProp:"position",content:String(l+1)}))}function oe(){const e=(0,Q.s1)(),t=(0,X.Ns)();return e?a.createElement("nav",{className:(0,d.Z)(C.k.docs.docBreadcrumbs,ae.breadcrumbsContainer),"aria-label":(0,b.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},a.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&a.createElement(ne,null),e.map(((t,n)=>{const l=n===e.length-1;return a.createElement(re,{key:n,active:l,index:n,addMicrodata:!!t.href},a.createElement(le,{href:t.href,isLast:l},t.label))})))):null}const ie={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function ce(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=c(),n=(0,m.i)(),l=e.hide_table_of_contents,r=!l&&t.length>0;return{hidden:l,mobile:r?a.createElement(q,null):void 0,desktop:!r||"desktop"!==n&&"ssr"!==n?void 0:a.createElement(K,null)}}();return a.createElement("div",{className:"row"},a.createElement("div",{className:(0,d.Z)("col",!n.hidden&&ie.docItemCol)},a.createElement(x,null),a.createElement("div",{className:ie.docItemContainer},a.createElement("article",null,a.createElement(oe,null),a.createElement(T,null),n.mobile,a.createElement(J,null,t),a.createElement(M,null)),a.createElement(g,null))),n.desktop&&a.createElement("div",{className:"col col--3"},n.desktop))}function se(e){const t=`docs-doc-id-${e.content.metadata.unversionedId}`,n=e.content;return a.createElement(i,{content:e.content},a.createElement(l.FG,{className:t},a.createElement(s,null),a.createElement(ce,null,a.createElement(n,null))))}},4881:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(7294),l=n(5999),r=n(5281),o=n(7462),i=n(6010);const c={iconEdit:"iconEdit_Z9Sw"};function s(e){let{className:t,...n}=e;return a.createElement("svg",(0,o.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,i.Z)(c.iconEdit,t),"aria-hidden":"true"},n),a.createElement("g",null,a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function d(e){let{editUrl:t}=e;return a.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:r.k.common.editThisPage},a.createElement(s,null),a.createElement(l.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},2244:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294),l=n(6010),r=n(9960);function o(e){const{permalink:t,title:n,subLabel:o,isNext:i}=e;return a.createElement(r.Z,{className:(0,l.Z)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},o&&a.createElement("div",{className:"pagination-nav__sublabel"},o),a.createElement("div",{className:"pagination-nav__label"},n))}},9407:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(7462),l=n(7294),r=n(6010),o=n(3743);const i={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},c="table-of-contents__link toc-highlight",s="table-of-contents__link--active";function d(e){let{className:t,...n}=e;return l.createElement("div",{className:(0,r.Z)(i.tableOfContents,"thin-scrollbar",t)},l.createElement(o.Z,(0,a.Z)({},n,{linkClassName:c,linkActiveClassName:s})))}},3743:(e,t,n)=>{n.d(t,{Z:()=>p});var a=n(7462),l=n(7294),r=n(6668);function o(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...l}=e;n>=0?t[n].children.push(l):a.push(l)})),a}function i(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=i({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function c(e){const t=e.getBoundingClientRect();return t.top===t.bottom?c(e.parentNode):t}function s(e,t){let{anchorTopOffset:n}=t;const a=e.find((e=>c(e).top>=n));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(c(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function d(){const e=(0,l.useRef)(0),{navbar:{hideOnScroll:t}}=(0,r.L)();return(0,l.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function m(e){const t=(0,l.useRef)(void 0),n=d();(0,l.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:l,minHeadingLevel:r,maxHeadingLevel:o}=e;function i(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),i=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let l=t;l<=n;l+=1)a.push(`h${l}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:r,maxHeadingLevel:o}),c=s(i,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(l),e.classList.add(l),t.current=e):e.classList.remove(l)}(e,e===d)}))}return document.addEventListener("scroll",i),document.addEventListener("resize",i),i(),()=>{document.removeEventListener("scroll",i),document.removeEventListener("resize",i)}}),[e,n])}function u(e){let{toc:t,className:n,linkClassName:a,isChild:r}=e;return t.length?l.createElement("ul",{className:r?void 0:n},t.map((e=>l.createElement("li",{key:e.id},l.createElement("a",{href:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(u,{isChild:!0,toc:e.children,className:n,linkClassName:a}))))):null}const b=l.memo(u);function p(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:c="table-of-contents__link",linkActiveClassName:s,minHeadingLevel:d,maxHeadingLevel:u,...p}=e;const f=(0,r.L)(),g=d??f.tableOfContents.minHeadingLevel,v=u??f.tableOfContents.maxHeadingLevel,h=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,l.useMemo)((()=>i({toc:o(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:g,maxHeadingLevel:v});return m((0,l.useMemo)((()=>{if(c&&s)return{linkClassName:c,linkActiveClassName:s,minHeadingLevel:g,maxHeadingLevel:v}}),[c,s,g,v])),l.createElement(b,(0,a.Z)({toc:h,className:n,linkClassName:c},p))}},3008:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294),l=n(6010),r=n(9960);const o={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};function i(e){let{permalink:t,label:n,count:i}=e;return a.createElement(r.Z,{href:t,className:(0,l.Z)(o.tag,i?o.tagWithCount:o.tagRegular)},n,i&&a.createElement("span",null,i))}},1526:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(7294),l=n(6010),r=n(5999),o=n(3008);const i={tags:"tags_jXut",tag:"tag_QGVx"};function c(e){let{tags:t}=e;return a.createElement(a.Fragment,null,a.createElement("b",null,a.createElement(r.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),a.createElement("ul",{className:(0,l.Z)(i.tags,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:n}=e;return a.createElement("li",{key:n,className:i.tag},a.createElement(o.Z,{label:t,permalink:n}))}))))}},6922:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294);const l={name:"App",utils:n(4826)},r={React:a,...a,tps:l}},4826:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.transform=t.ordinalize=t.foreignKey=t.classify=t.tableize=t.demodulize=t.titleize=t.dasherize=t.capitalize=t.humanize=t.underscore=t.camelize=t.inflect=t.singularize=t.pluralize=t.snakeCase=t.sentenceCase=t.pathCase=t.pascalCase=t.paramCase=t.noCase=t.headerCase=t.dotCase=t.constantCase=t.capitalCase=t.camelCase=void 0;var a=n(1119);Object.defineProperty(t,"camelCase",{enumerable:!0,get:function(){return a.camelCase}}),Object.defineProperty(t,"capitalCase",{enumerable:!0,get:function(){return a.capitalCase}}),Object.defineProperty(t,"constantCase",{enumerable:!0,get:function(){return a.constantCase}}),Object.defineProperty(t,"dotCase",{enumerable:!0,get:function(){return a.dotCase}}),Object.defineProperty(t,"headerCase",{enumerable:!0,get:function(){return a.headerCase}}),Object.defineProperty(t,"noCase",{enumerable:!0,get:function(){return a.noCase}}),Object.defineProperty(t,"paramCase",{enumerable:!0,get:function(){return a.paramCase}}),Object.defineProperty(t,"pascalCase",{enumerable:!0,get:function(){return a.pascalCase}}),Object.defineProperty(t,"pathCase",{enumerable:!0,get:function(){return a.pathCase}}),Object.defineProperty(t,"sentenceCase",{enumerable:!0,get:function(){return a.sentenceCase}}),Object.defineProperty(t,"snakeCase",{enumerable:!0,get:function(){return a.snakeCase}});var l=n(7412);Object.defineProperty(t,"pluralize",{enumerable:!0,get:function(){return l.pluralize}}),Object.defineProperty(t,"singularize",{enumerable:!0,get:function(){return l.singularize}}),Object.defineProperty(t,"inflect",{enumerable:!0,get:function(){return l.inflect}}),Object.defineProperty(t,"camelize",{enumerable:!0,get:function(){return l.camelize}}),Object.defineProperty(t,"underscore",{enumerable:!0,get:function(){return l.underscore}}),Object.defineProperty(t,"humanize",{enumerable:!0,get:function(){return l.humanize}}),Object.defineProperty(t,"capitalize",{enumerable:!0,get:function(){return l.capitalize}}),Object.defineProperty(t,"dasherize",{enumerable:!0,get:function(){return l.dasherize}}),Object.defineProperty(t,"titleize",{enumerable:!0,get:function(){return l.titleize}}),Object.defineProperty(t,"demodulize",{enumerable:!0,get:function(){return l.demodulize}}),Object.defineProperty(t,"tableize",{enumerable:!0,get:function(){return l.tableize}}),Object.defineProperty(t,"classify",{enumerable:!0,get:function(){return l.classify}}),Object.defineProperty(t,"foreignKey",{enumerable:!0,get:function(){return l.foreignKey}}),Object.defineProperty(t,"ordinalize",{enumerable:!0,get:function(){return l.ordinalize}}),Object.defineProperty(t,"transform",{enumerable:!0,get:function(){return l.transform}})}}]);