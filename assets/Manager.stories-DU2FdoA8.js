import{r as m,j as s}from"./iframe-DfjFra_E.js";import"./SignalRHubWrapper-BMh2Frid.js";import{T as g}from"./data-contracts-97ndRDDy.js";import{S as f}from"./index-oSaGBWdX.js";import{F as S,C as v,a as w}from"./Firework-Bx7jC9SX.js";import"./index-eIvpPVhI.js";import"./index-DY_TwEYy.js";import"./index-DDUjKJzf.js";import"./index-73zqftOg.js";import"./index-Chjiymov.js";import"./react-dRZq-Y5g.js";function y(){const[e,a]=m.useState(0),[r,c]=m.useState([]),[l,h]=m.useState([]);f.useSignalREffect("MakeScreenParticles",t=>{const n={type:t,id:e};a(e+1),c(i=>[...i,n])},[]),f.useSignalREffect("MakeScreenEmojisParticles",t=>{const n={input:t,id:e};a(e+1),h(i=>[...i,n])},[]);const d=m.useCallback(t=>{c(n=>n.filter(i=>i.id!==t))},[]);return s.jsxs(s.Fragment,{children:[r.length>0&&r.map(t=>{switch(t.type){case g.Confetty:return s.jsx(v,{callback:()=>d(t.id)},t.id);case g.Fireworks:return s.jsx(S,{callback:()=>d(t.id)},t.id)}}),l.length>0&&l.map(t=>s.jsx(w,{input:t.input},t.id))]})}y.__docgenInfo={description:"",methods:[],displayName:"Manager"};const{expect:o}=__STORYBOOK_MODULE_TEST__,C={title:"Stream Components/ScreenParticles/Manager",component:y,parameters:{layout:"fullscreen",docs:{description:{component:"Менеджер экранных частиц для создания различных визуальных эффектов (конфетти, фейерверки, эмодзи)."}}},tags:["autodocs"],decorators:[e=>s.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:s.jsx(e,{})})]},p={args:{},play:async({canvasElement:e})=>{await new Promise(c=>setTimeout(c,100)),o(e).toBeInTheDocument();const a=e.querySelectorAll("canvas");o(a.length).toBe(0);const r=e.querySelectorAll('[class*="emoji"]');o(r.length).toBe(0)}},u={args:{},parameters:{docs:{description:{story:"Пустой менеджер частиц без активных эффектов."}}},play:async({canvasElement:e})=>{await new Promise(l=>setTimeout(l,100)),o(e).toBeInTheDocument();const a=e.querySelectorAll("canvas");o(a.length).toBe(0);const r=e.querySelectorAll('[class*="confetti"]');o(r.length).toBe(0);const c=e.querySelectorAll('[class*="firework"]');o(c.length).toBe(0)}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};const b=["Default","Empty"];export{p as Default,u as Empty,b as __namedExportsOrder,C as default};
