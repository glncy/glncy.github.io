(window.webpackJsonp=window.webpackJsonp||[]).push([[5,2],{339:function(n,e,t){var content=t(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,t(37).default)("2d7aa343",content,!0,{sourceMap:!1})},340:function(n,e,t){"use strict";t.r(e);var l=t(0).a.extend({props:{classIcon:{type:String,default:null},img:{type:String,default:null}}}),c=(t(341),t(26)),component=Object(c.a)(l,(function(){var n=this,e=n._self._c;n._self._setupProxy;return e("div",{staticClass:"icon-wrapper"},[n.classIcon?e("i",{class:[n.classIcon]}):n.img?e("img",{attrs:{src:n.img}}):n._e()])}),[],!1,null,"8618c726",null);e.default=component.exports},341:function(n,e,t){"use strict";t(339)},342:function(n,e,t){var l=t(36)((function(i){return i[1]}));l.push([n.i,"/*purgecss start ignore*/\n.icon-wrapper[data-v-8618c726]{\n  display:flex;\n  height:6rem;\n  width:6rem;\n  align-items:center;\n  justify-content:center;\n  border-radius:9999px;\n  background:hsla(0,0%,100%,.05);\n  -webkit-backdrop-filter:blur(5px);\n          backdrop-filter:blur(5px);\n  border:1px solid hsla(0,0%,100%,.2);\n  transition:all .1s ease-in-out;\n}\n.icon-wrapper >i[data-v-8618c726]{\n  font-size:3rem;\n  line-height:1;\n  --tw-text-opacity:1;\n  color:rgba(255, 255, 255, var(--tw-text-opacity))\n}\n.icon-wrapper >i[data-v-8618c726],.icon-wrapper >img[data-v-8618c726]{\n  transition:all .1s ease-in-out\n}\n.icon-wrapper >img[data-v-8618c726]{\n  width:4rem\n}\n.icon-wrapper[data-v-8618c726]:hover{\n  background:hsla(0,0%,100%,.2);\n  border:1.5px solid hsla(0,0%,100%,.3);\n}\n.icon-wrapper:hover >i[data-v-8618c726],.icon-wrapper:hover img[data-v-8618c726]{\n  transform:scale(1.1)\n}\n\n/*purgecss end ignore*/",""]),l.locals={},n.exports=l},343:function(n,e,t){var content=t(346);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,t(37).default)("badc113c",content,!0,{sourceMap:!1})},345:function(n,e,t){"use strict";t(343)},346:function(n,e,t){var l=t(36)((function(i){return i[1]}));l.push([n.i,'/*purgecss start ignore*/\n.page-section >.divider[data-v-0cc15957]{\n  margin-top:1rem;\n  margin-bottom:1rem;\n  width:100%;\n  height:.2px;\n  background:hsla(0,0%,100%,.5)\n}\n.page-section >.header[data-v-0cc15957]{\n  font-size:3.75rem;\n  line-height:1;\n  --tw-text-opacity:1;\n  color:rgba(229, 231, 235, var(--tw-text-opacity));\n  font-family:"Playfair Display",serif;\n  font-weight:400;\n  width:-webkit-fit-content;\n  width:-moz-fit-content;\n  width:fit-content\n}\n.page-section >.skills-wrapper[data-v-0cc15957]{\n  margin-bottom:1rem;\n}\n.page-section >.skills-wrapper >.skills-title[data-v-0cc15957]{\n  margin-bottom:1rem;\n  font-size:1.25rem;\n  line-height:1.75rem;\n  --tw-text-opacity:1;\n  color:rgba(229, 231, 235, var(--tw-text-opacity));\n  font-family:"Poppins",sans-serif;\n  font-weight:600;\n  width:-webkit-fit-content;\n  width:-moz-fit-content;\n  width:fit-content\n}\n.page-section >.skills-wrapper >.skills-list[data-v-0cc15957]{\n  display:grid;\n  grid-template-columns:repeat(3, minmax(0, 1fr));\n  gap:0.5rem;\n}\n@media (min-width: 768px){\n.page-section >.skills-wrapper >.skills-list[data-v-0cc15957]{\n    display:grid;\n    grid-template-columns:repeat(5, minmax(0, 1fr));\n    gap:0.5rem\n}\n}\n@media (min-width: 1024px){\n.page-section >.skills-wrapper >.skills-list[data-v-0cc15957]{\n    display:grid;\n    grid-template-columns:repeat(6, minmax(0, 1fr));\n    gap:0.5rem\n}\n}\n@media (min-width: 1280px){\n.page-section >.skills-wrapper >.skills-list[data-v-0cc15957]{\n    display:grid;\n    grid-template-columns:repeat(8, minmax(0, 1fr));\n    gap:1rem\n}\n}\n.page-section >.skills-wrapper >.skills-list >.skill-item[data-v-0cc15957]{\n  display:flex;\n  flex-direction:column;\n  align-items:center;\n}\n.page-section >.skills-wrapper >.skills-list >.skill-item >.skill-name[data-v-0cc15957]{\n  margin-top:0.5rem;\n  text-align:center;\n  font-size:1rem;\n  line-height:1.5rem;\n  --tw-text-opacity:1;\n  color:rgba(229, 231, 235, var(--tw-text-opacity));\n  font-family:"Poppins",sans-serif;\n  font-weight:400;\n  white-space:nowrap\n}\n.page-section >.skills-wrapper[data-v-0cc15957]:last-child{\n  margin-bottom:0px\n}\n\n/*purgecss end ignore*/',""]),l.locals={},n.exports=l},353:function(n,e,t){"use strict";t.r(e);t(27);var l=t(0),c=t(340),r=l.a.extend({components:{IconGlassWrapper:c.default},data:function(){return{skills:[{category:"Core Languages",list:[{className:"devicon-javascript-plain",name:"JavaScript"},{className:"devicon-typescript-plain",name:"TypeScript"},{className:"devicon-python-plain",name:"Python"},{className:"devicon-php-plain",name:"PHP"},{className:"devicon-html5-plain",name:"HTML"},{className:"devicon-css3-plain",name:"CSS"}]},{category:"Frontend Development",list:[{className:"devicon-sass-original",name:"SASS"},{className:"devicon-tailwindcss-plain",name:"Tailwind"},{className:"devicon-jquery-plain-wordmark",name:"jQuery"},{className:"devicon-bootstrap-plain",name:"Bootstrap"},{className:"devicon-vuejs-plain",name:"Vue.js"},{className:"devicon-react-original",name:"React"},{className:"devicon-nextjs-plain",name:"Next.js"},{className:"devicon-nuxtjs-plain",name:"Nuxt.js"},{img:"/img/cordova-icon.png",name:"Cordova"},{className:"devicon-ionic-original",name:"Ionic"}]},{category:"Backend Development",list:[{className:"devicon-nodejs-plain",name:"Node.js"},{className:"devicon-django-plain",name:"Django"},{className:"devicon-express-original",name:"Express"},{className:"devicon-mysql-plain",name:"MySQL"},{className:"devicon-amazonwebservices-plain",name:"AWS"},{className:"devicon-firebase-plain",name:"Firebase"},{className:"devicon-heroku-plain",name:"Heroku"},{className:"devicon-docker-plain",name:"Docker"},{className:"devicon-digitalocean-plain",name:"Digital Ocean"},{className:"devicon-bash-plain",name:"Bash"}]},{category:"Version Control System and CI/CD",list:[{className:"devicon-git-plain",name:"Git"},{className:"devicon-github-plain",name:"Github<br/>Actions"},{className:"devicon-gitlab-plain",name:"Gitlab<br/>CI/CD"},{className:"devicon-bitbucket-plain",name:"Bitbucket"}]},{category:"Designs & Multimedia",list:[{className:"devicon-figma-plain",name:"Figma"},{className:"devicon-photoshop-plain",name:"Photoshop"},{className:"devicon-illustrator-plain",name:"Illustrator"}]}]}}}),o=(t(345),t(26)),component=Object(o.a)(r,(function(){var n=this,e=n._self._c;n._self._setupProxy;return e("div",{staticClass:"page-section"},[e("div",{staticClass:"header"},[n._v("Skills")]),n._v(" "),e("div",{staticClass:"divider"}),n._v(" "),n._l(n.skills,(function(t,l){return e("div",{key:l,staticClass:"skills-wrapper"},[e("div",{staticClass:"skills-title"},[n._v(n._s(t.category))]),n._v(" "),e("div",{staticClass:"skills-list"},n._l(t.list,(function(t,l){return e("div",{key:l,staticClass:"skill-item"},[e("IconGlassWrapper",{attrs:{classIcon:t.className,img:t.img}}),n._v(" "),e("div",{staticClass:"skill-name",domProps:{innerHTML:n._s(t.name)}})],1)})),0)])}))],2)}),[],!1,null,"0cc15957",null);e.default=component.exports;installComponents(component,{IconGlassWrapper:t(340).default})}}]);