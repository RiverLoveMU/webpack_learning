if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,t)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const o={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return o;default:return e(r)}})).then(e=>{const r=t(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-666e1ebe"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/build.80ef72694f.css",revision:"7ff9c6b357e2218f8a40d4d7bce69c52"},{url:"index.html",revision:"86ad71d4d3c01efdec1e34da441e4ab5"},{url:"js/build.ef563b2124.js",revision:"350ecebf8f5f4ec4d26f61f64030a1ec"}],{})}));
//# sourceMappingURL=service-worker.js.map
