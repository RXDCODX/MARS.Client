import{r as m,j as s}from"./iframe-DP1K2Eq5.js";import{S as g}from"./v4-BZBaoDxX.js";import{M as f}from"./baza-BnLwLixe.js";import{F as B,C as k,a as P}from"./Firework-DdtCNCeQ.js";import"./index-Dw71gUWx.js";import"./index-CBKuLTKt.js";import"./index-y9Nr13TW.js";function E(){const[e,o]=m.useState(0),[r,c]=m.useState([]),[i,j]=m.useState([]);g.useSignalREffect("MakeScreenParticles",t=>{const n={type:t,id:e};o(e+1),c(l=>[...l,n])},[]),g.useSignalREffect("MakeScreenEmojisParticles",t=>{const n={input:t,id:e};o(e+1),j(l=>[...l,n])},[]);const d=m.useCallback(t=>{c(n=>n.filter(l=>l.id!==t))},[]);return s.jsxs(s.Fragment,{children:[r.length>0&&r.map(t=>{switch(t.type){case f.Confetty:return s.jsx(k,{callback:()=>d(t.id)},t.id);case f.Fireworks:return s.jsx(B,{callback:()=>d(t.id)},t.id)}}),i.length>0&&i.map(t=>s.jsx(P,{input:t.input},t.id))]})}E.__docgenInfo={description:"",methods:[],displayName:"Manager"};const{expect:a}=__STORYBOOK_MODULE_TEST__,D={title:"Particles/Manager",component:E,parameters:{layout:"fullscreen",docs:{description:{component:"Менеджер экранных частиц для создания различных визуальных эффектов (конфетти, фейерверки, эмодзи)."}}},tags:["autodocs"],decorators:[e=>s.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:s.jsx(e,{})})]},p={args:{},play:async({canvasElement:e})=>{await new Promise(c=>setTimeout(c,100)),a(e).toBeInTheDocument();const o=e.querySelectorAll("canvas");a(o.length).toBe(0);const r=e.querySelectorAll('[class*="emoji"]');a(r.length).toBe(0)}},u={args:{},parameters:{docs:{description:{story:"Пустой менеджер частиц без активных эффектов."}}},play:async({canvasElement:e})=>{await new Promise(i=>setTimeout(i,100)),a(e).toBeInTheDocument();const o=e.querySelectorAll("canvas");a(o.length).toBe(0);const r=e.querySelectorAll('[class*="confetti"]');a(r.length).toBe(0);const c=e.querySelectorAll('[class*="firework"]');a(c.length).toBe(0)}};var y,h,v;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(v=(h=p.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var S,w,x;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(x=(w=u.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};const I=["Default","Empty"];export{p as Default,u as Empty,I as __namedExportsOrder,D as default};
