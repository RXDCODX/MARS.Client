import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{M as k}from"./Message-By43CXx5.js";import{S as d}from"./index-6iYvhkm2.js";import{r as c}from"./iframe-zpiOQtGo.js";import{A as b}from"./Announce-DzI9VPIE.js";import"./index-B0qy4s_C.js";import"./animate.module-CI42XwLX.js";function g(){const[n,i]=c.useState([]),[x,S]=c.useState(!1);d.useSignalREffect("newmessage",(t,e)=>{e.id??(e.id=t),i(r=>{for(;r.length>=50;)r.pop();return r.find(C=>C.id===e.id)?r:[e,...r]})},[]),d.useSignalREffect("deletemessage",t=>{i(e=>e.filter(r=>r.id!==t))},[]);const j=c.useCallback(t=>{i(e=>e.filter(r=>r.id!==t.id))},[]);return o.jsxs(o.Fragment,{children:[!x&&o.jsx(b,{title:"Chat Horizontal",callback:()=>S(!0)}),n.map(t=>o.jsx(k,{message:t,callback:()=>j(t)},t.id))]})}g.__docgenInfo={description:"",methods:[],displayName:"ChatHorizontal"};const R={title:"Chat/ChatHorizontal",component:g,parameters:{layout:"fullscreen",docs:{description:{component:"Горизонтальный чат с анимированными сообщениями, которые проходят через экран."}}},tags:["autodocs"],decorators:[n=>o.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:o.jsx(n,{})})]},a={args:{}},s={args:{},parameters:{docs:{description:{story:"Демонстрация компонента с моковыми данными сообщений."}}}};var l,p,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {}
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,f,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация компонента с моковыми данными сообщений.'
      }
    }
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const _=["Default","WithMockData"];export{a as Default,s as WithMockData,_ as __namedExportsOrder,R as default};
