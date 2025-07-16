import{r as m,j as s}from"./iframe-rOG4V-f_.js";import{S as g}from"./v4-iD3dpYiY.js";import{M as f}from"./baza-BnLwLixe.js";import{F as v,C as S,a as w}from"./Firework-LkKJI-px.js";import"./index-DuitOnhg.js";import"./index-HRd8Acv_.js";import"./index-BHbUthkP.js";function y(){const[e,o]=m.useState(0),[r,c]=m.useState([]),[i,h]=m.useState([]);g.useSignalREffect("MakeScreenParticles",t=>{const n={type:t,id:e};o(e+1),c(l=>[...l,n])},[]),g.useSignalREffect("MakeScreenEmojisParticles",t=>{const n={input:t,id:e};o(e+1),h(l=>[...l,n])},[]);const d=m.useCallback(t=>{c(n=>n.filter(l=>l.id!==t))},[]);return s.jsxs(s.Fragment,{children:[r.length>0&&r.map(t=>{switch(t.type){case f.Confetty:return s.jsx(S,{callback:()=>d(t.id)},t.id);case f.Fireworks:return s.jsx(v,{callback:()=>d(t.id)},t.id)}}),i.length>0&&i.map(t=>s.jsx(w,{input:t.input},t.id))]})}y.__docgenInfo={description:"",methods:[],displayName:"Manager"};const{expect:a}=__STORYBOOK_MODULE_TEST__,T={title:"Particles/Manager",component:y,parameters:{layout:"fullscreen",docs:{description:{component:"Менеджер экранных частиц для создания различных визуальных эффектов (конфетти, фейерверки, эмодзи)."}}},tags:["autodocs"],decorators:[e=>s.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:s.jsx(e,{})})]},p={args:{},play:async({canvasElement:e})=>{await new Promise(c=>setTimeout(c,100)),a(e).toBeInTheDocument();const o=e.querySelectorAll("canvas");a(o.length).toBe(0);const r=e.querySelectorAll('[class*="emoji"]');a(r.length).toBe(0)}},u={args:{},parameters:{docs:{description:{story:"Пустой менеджер частиц без активных эффектов."}}},play:async({canvasElement:e})=>{await new Promise(i=>setTimeout(i,100)),a(e).toBeInTheDocument();const o=e.querySelectorAll("canvas");a(o.length).toBe(0);const r=e.querySelectorAll('[class*="confetti"]');a(r.length).toBe(0);const c=e.querySelectorAll('[class*="firework"]');a(c.length).toBe(0)}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет активных частиц изначально
    const particles = canvasElement.querySelectorAll("canvas");
    expect(particles.length).toBe(0);

    // Проверяем, что нет эмодзи-частиц
    const emojiParticles = canvasElement.querySelectorAll('[class*="emoji"]');
    expect(emojiParticles.length).toBe(0);
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Пустой менеджер частиц без активных эффектов."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    // const canvas = within(canvasElement); // Unused variable

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем, что нет частиц
    const particles = canvasElement.querySelectorAll("canvas");
    expect(particles.length).toBe(0);

    // Проверяем, что нет конфетти
    const confetti = canvasElement.querySelectorAll('[class*="confetti"]');
    expect(confetti.length).toBe(0);

    // Проверяем, что нет фейерверков
    const fireworks = canvasElement.querySelectorAll('[class*="firework"]');
    expect(fireworks.length).toBe(0);
  }
}`,...u.parameters?.docs?.source}}};const q=["Default","Empty"];export{p as Default,u as Empty,q as __namedExportsOrder,T as default};
