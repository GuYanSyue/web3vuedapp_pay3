if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const o=e=>i(e,l),t={module:{uri:l},exports:a,require:o};s[l]=Promise.all(r.map((e=>t[e]||o(e)))).then((e=>(n(...e),a)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"about.html",revision:"a36e8414059ec1ca4edcf22d40b17dec"},{url:"assets/_...all_.0caaf5d9.js",revision:null},{url:"assets/_name_.cab0eb29.js",revision:null},{url:"assets/404.038903a2.js",revision:null},{url:"assets/about.6d8b7ac9.js",revision:null},{url:"assets/app.01ff22f0.js",revision:null},{url:"assets/home.8470d156.js",revision:null},{url:"assets/index.8c3b4d4b.css",revision:null},{url:"assets/README.c56ecdfc.js",revision:null},{url:"assets/virtual_pwa-register.e77bf6fa.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"b745476c54e15db4b68d6b24ce9c27df"},{url:"readme.html",revision:"5b19055efad0cd168ebdc0ef23731ef9"},{url:"favicon.svg",revision:"50eaa5ff03f3d89bea3e4450aefa60af"},{url:"safari-pinned-tab.svg",revision:"21a5632e21f7421e63e58f3a8a3e205e"},{url:"pwa-192x192.png",revision:"65f6c00ff3d88d8371df0480c1ba0272"},{url:"pwa-512x512.png",revision:"20a2db7d5040eb315e6acf49c6983de9"},{url:"manifest.webmanifest",revision:"5a0ea2adbf52e543960f8bbf1134443c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));