webpackJsonp([1],{"/Vkn":function(t,e){},HXef:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{list:[],background:{cover:"",visible:!1}}},created:function(){var t=this;new AV.Query("book").find().then(function(e){t.list=e.map(function(t){return{name:t.get("name"),cover:t.get("cover"),id:t.id}})})},methods:{mEnter:function(t){this.background.visible=!0,this.background.cover=t.cover},mOut:function(){this.background.visible=!1}}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("transition",{attrs:{name:"fade"}},[t.background.visible?n("div",{staticClass:"cover-bg"},[n("img",{attrs:{src:t.background.cover,alt:""}})]):t._e()]),t._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"title"},[t._v("\n      列表🦉\n    ")]),t._v(" "),n("div",{staticClass:"list"},t._l(t.list,function(e,i){return n("div",{key:i,staticClass:"item",on:{mouseenter:function(n){t.mEnter(e)},mouseout:function(n){t.mOut(e)},click:function(n){t.$router.push({name:"Read",params:{id:e.id}})}}},[n("div",{staticClass:"cover"},[n("img",{attrs:{src:e.cover,alt:""}})]),t._v(" "),n("div",{staticClass:"name"},[t._v("\n          "+t._s(e.name)+"\n        ")])])}))])],1)},staticRenderFns:[]};var a=n("VU/8")(i,s,!1,function(t){n("/Vkn")},"data-v-209f0ee2",null);e.default=a.exports}});
//# sourceMappingURL=1.d0fb2dc3bad1b394a2c0.js.map