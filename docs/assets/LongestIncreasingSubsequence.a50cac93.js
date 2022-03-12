import{a as N,E as V}from"./el-link.45f2bc84.js";import{c as B,r as H,E as S,a as z,b as D,d as R,_ as F}from"./CdHome.b3841bcb.js";import{_ as I}from"./index.31cb429b.js";import{r as A,o as a,e as c,h as n,w as _,g as x,F as f,f as k,C as d,t as E,D as j,A as q}from"./vendor.a36ecd6c.js";const w=()=>{let i;const s=new Promise(o=>{i=o});return{resolve:i,promise:s}},O={components:{CaretRight:B,RefreshLeft:H},data(){const i=[0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15];return{distance:40,textarea:i.join(","),input:i,curIndex:-1,result:[],stepHold:w()}},methods:{nextStep(){this.stepHold.resolve(),this.stepHold=w()},updateInput(){this.textarea&&(this.input=this.textarea.split(",").map(Number),this.startAnimation())},async startAnimation(){this.curIndex=-1;const i=this.input.map(e=>({value:e,prev:null,left:null,x:1,y:1,isActive:!1}));this.result=[];const s=this.result;let o=[],r=null;for(let e=0;e<i.length;e++){if(await this.stepHold.promise,this.curIndex=e,r=i[e],!e){s.push([r]);continue}if(o=s.map(g=>g[g.length-1]),o[o.length-1].value<r.value){Object.assign(r,{prev:o[o.length-1],y:s.length+1}),s.push([r]);continue}let t=0,u=o.length-1,p=0;for(;t<u;)p=t+u>>1,o[p].value<r.value?t=p+1:u=p;let h=t>=0&&o[t]||null;Object.assign(r,{prev:t&&o[t-1]||null,left:h,x:h?h.x+1:1,y:h?h.y:1}),s[t].push(r)}await this.stepHold.promise,this.curIndex=-1;{let e=s[s.length-1],t=e[e.length-1];for(;t;)t.isActive=!0,t=t.prev}}},mounted(){this.startAnimation()}},M=x("span",null,"\u6700\u957F\u9012\u589E\u5B50\u5E8F\u5217\uFF08\u52A8\u6001\u89C4\u5212 + \u4E8C\u5206\u67E5\u627E\uFF09",-1),P=d(" Wikipedia "),T=d(" LeetCode "),U=d(" Confirm "),W={style:{"font-size":"20px"}},$=d(" > input : [ "),G=d(" ] "),J=d(" Next \xA0 "),K=d(" Reset \xA0 "),Q={style:{width:"100%",height:"300px"}},X=["x","y","fill"],Y=["d","stroke"];function Z(i,s,o,r,e,t){const u=S,p=V,h=z,g=D,y=R,b=A("caret-right"),C=N,L=A("refresh-left");return a(),c("div",null,[n(h,{style:{margin:"40px 0","font-size":"20px"}},{default:_(()=>[M,n(u,{direction:"vertical"}),n(p,{target:"_blank",href:"https://zh.wikipedia.org/wiki/%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97"},{default:_(()=>[P]),_:1}),n(u,{direction:"vertical"}),n(p,{target:"_blank",href:"https://leetcode-cn.com/problems/longest-increasing-subsequence/"},{default:_(()=>[T]),_:1})]),_:1}),n(g,{modelValue:e.textarea,"onUpdate:modelValue":s[0]||(s[0]=m=>e.textarea=m),rows:2,type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u4EE5 , \u5206\u5272\u7684\u6570\u5B57",style:{"font-size":"20px"}},null,8,["modelValue"]),n(y,{type:"primary",style:{"margin-top":"20px"},onClick:t.updateInput},{default:_(()=>[U]),_:1},8,["onClick"]),x("p",W,[$,(a(!0),c(f,null,k(e.input,(m,v)=>(a(),c(f,{key:v},[d(E(v?" , ":"")+" ",1),x("span",{style:j({color:v===e.curIndex?"coral":"#000"})},E(m),5)],64))),128)),G]),x("div",null,[n(y,{type:"primary",onClick:t.nextStep},{default:_(()=>[J,n(C,null,{default:_(()=>[n(b)]),_:1})]),_:1},8,["onClick"]),n(y,{type:"primary",onClick:t.startAnimation},{default:_(()=>[K,n(C,null,{default:_(()=>[n(L)]),_:1})]),_:1},8,["onClick"])]),(a(),c("svg",Q,[(a(!0),c(f,null,k(e.result,(m,v)=>(a(),c(f,{key:m[0].value},[(a(!0),c(f,null,k(m,l=>(a(),c(f,{key:l.value},[x("text",{x:l.x*e.distance,y:l.y*e.distance,fill:l.isActive?"coral":"#606266",style:{"dominant-baseline":"middle","text-anchor":"middle"}},E(l.value),9,X),l.prev?(a(),c("path",{key:0,d:`M${l.x*e.distance},${l.y*e.distance-10}L${l.prev.x*e.distance},${l.prev.y*e.distance+10}`,fill:"none",stroke:l.isActive?"coral":"green"},null,8,Y)):q("",!0)],64))),128))],64))),128))]))])}var ee=I(O,[["render",Z]]);const te={},ne={style:{width:"800px","padding-top":"40px",margin:"0 auto"}};function se(i,s,o,r,e,t){const u=F,p=ee;return a(),c("div",ne,[n(u),n(p)])}var ae=I(te,[["render",se]]);export{ae as default};
