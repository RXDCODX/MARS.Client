import{r as m,j as s}from"./iframe-DqfnGlCG.js";import{w as j,e as r}from"./index-BnesSBbZ.js";import{S as g}from"./v4-BLKDVEyC.js";import{M as f}from"./baza-BnLwLixe.js";import{F as E,C as P,a as M}from"./Firework-CtmgnzYJ.js";import"./index-BMWlM-xT.js";import"./index-BekxroER.js";import"./index-D97MGZuM.js";function k(){const[e,o]=m.useState(0),[a,c]=m.useState([]),[l,B]=m.useState([]);g.useSignalREffect("MakeScreenParticles",t=>{const n={type:t,id:e};o(e+1),c(i=>[...i,n])},[]),g.useSignalREffect("MakeScreenEmojisParticles",t=>{const n={input:t,id:e};o(e+1),B(i=>[...i,n])},[]);const d=m.useCallback(t=>{c(n=>n.filter(i=>i.id!==t))},[]);return s.jsxs(s.Fragment,{children:[a.length>0&&a.map(t=>{switch(t.type){case f.Confetty:return s.jsx(P,{callback:()=>d(t.id)},t.id);case f.Fireworks:return s.jsx(E,{callback:()=>d(t.id)},t.id)}}),l.length>0&&l.map(t=>s.jsx(M,{input:t.input},t.id))]})}k.__docgenInfo={description:"",methods:[],displayName:"Manager"};const R={title:"Particles/Manager",component:k,parameters:{layout:"fullscreen",docs:{description:{component:"Менеджер экранных частиц для создания различных визуальных эффектов (конфетти, фейерверки, эмодзи)."}}},tags:["autodocs"],decorators:[e=>s.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:s.jsx(e,{})})]},p={args:{},play:async({canvasElement:e})=>{j(e),await new Promise(c=>setTimeout(c,100)),r(e).toBeInTheDocument();const o=e.querySelectorAll("canvas");r(o.length).toBe(0);const a=e.querySelectorAll('[class*="emoji"]');r(a.length).toBe(0)}},u={args:{},parameters:{docs:{description:{story:"Пустой менеджер частиц без активных эффектов."}}},play:async({canvasElement:e})=>{j(e),await new Promise(l=>setTimeout(l,100)),r(e).toBeInTheDocument();const o=e.querySelectorAll("canvas");r(o.length).toBe(0);const a=e.querySelectorAll('[class*="confetti"]');r(a.length).toBe(0);const c=e.querySelectorAll('[class*="firework"]');r(c.length).toBe(0)}};var h,y,w;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет активных частиц изначально
    const particles = canvasElement.querySelectorAll('canvas');
    expect(particles.length).toBe(0);

    // Проверяем, что нет эмодзи-частиц
    const emojiParticles = canvasElement.querySelectorAll('[class*="emoji"]');
    expect(emojiParticles.length).toBe(0);
  }
}`,...(w=(y=p.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var S,v,x;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Пустой менеджер частиц без активных эффектов.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет частиц
    const particles = canvasElement.querySelectorAll('canvas');
    expect(particles.length).toBe(0);

    // Проверяем, что нет конфетти
    const confetti = canvasElement.querySelectorAll('[class*="confetti"]');
    expect(confetti.length).toBe(0);

    // Проверяем, что нет фейерверков
    const fireworks = canvasElement.querySelectorAll('[class*="firework"]');
    expect(fireworks.length).toBe(0);
  }
}`,...(x=(v=u.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const _=["Default","Empty"];export{p as Default,u as Empty,_ as __namedExportsOrder,R as default};
