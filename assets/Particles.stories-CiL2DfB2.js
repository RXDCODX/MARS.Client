import{r as m,j as o}from"./iframe-B_oz8dKo.js";import{C as d,F as y,a as h}from"./Firework-_9SI6ykd.js";import"./index-DxDdCQOu.js";import"./index-P3iobJrg.js";import"./index-BU3mIPC_.js";import"./v4-BBZMrhdn.js";const{expect:a,userEvent:p,within:w}=__STORYBOOK_MODULE_TEST__,f=({children:e,onActivate:n})=>o.jsxs("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:[o.jsx("button",{id:"activate-button",onClick:n,style:{position:"absolute",top:"20px",left:"20px",zIndex:1e3,padding:"10px 20px",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontSize:"16px"},children:"Активировать эффект"}),e]}),S={title:"Particles/Effects",parameters:{layout:"fullscreen",docs:{description:{component:"Компоненты для создания различных визуальных эффектов частиц."}}},tags:["autodocs"]},l={render:()=>{const[e,n]=m.useState(!1);return o.jsx(f,{onActivate:()=>n(!0),children:e&&o.jsx(d,{callback:()=>n(!1)})})},play:async({canvasElement:e})=>{const n=w(e);await new Promise(t=>setTimeout(t,100));const s=n.getByRole("button",{name:/активировать эффект/i});a(s).toBeInTheDocument();const r=e.querySelectorAll("canvas");a(r.length).toBe(0),await p.click(s),await new Promise(t=>setTimeout(t,500));const c=e.querySelectorAll("canvas");a(c.length).toBeGreaterThan(0),await new Promise(t=>setTimeout(t,10500));const i=e.querySelectorAll("canvas");a(i.length).toBe(0)},parameters:{docs:{description:{story:"Эффект конфетти с радужными цветами. Активируется кнопкой и автоматически завершается через 10 секунд."}}}},v={render:()=>{const[e,n]=m.useState(!1);return o.jsx(f,{onActivate:()=>n(!0),children:e&&o.jsx(y,{callback:()=>n(!1)})})},play:async({canvasElement:e})=>{const n=w(e);await new Promise(t=>setTimeout(t,100));const s=n.getByRole("button",{name:/активировать эффект/i});a(s).toBeInTheDocument();const r=e.querySelectorAll("canvas");a(r.length).toBe(0),await p.click(s),await new Promise(t=>setTimeout(t,500));const c=e.querySelectorAll("canvas");a(c.length).toBeGreaterThan(0),await new Promise(t=>setTimeout(t,10500));const i=e.querySelectorAll("canvas");a(i.length).toBe(0)},parameters:{docs:{description:{story:"Эффект фейерверка. Активируется кнопкой и автоматически завершается через 10 секунд."}}}},u={render:()=>{const[e,n]=m.useState(!1);return o.jsx(f,{onActivate:()=>n(!0),children:e&&o.jsx(h,{input:"🎉🎊🎈"})})},play:async({canvasElement:e})=>{const n=w(e);await new Promise(t=>setTimeout(t,100));const s=n.getByRole("button",{name:/активировать эффект/i});a(s).toBeInTheDocument();const r=e.querySelectorAll("canvas");a(r.length).toBe(0),await p.click(s),await new Promise(t=>setTimeout(t,2e3));const c=e.querySelectorAll("canvas");a(c.length).toBeGreaterThan(0),await new Promise(t=>setTimeout(t,12e3));const i=e.querySelectorAll("canvas");a(i.length).toBe(0)},parameters:{docs:{description:{story:"Эффект частиц эмодзи. Активируется кнопкой и автоматически завершается через 10 секунд. Использует эмодзи из текста."}}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isActive, setIsActive] = useState(false);
    return <TestWrapper onActivate={() => setIsActive(true)}>\r
        {isActive && <Confettyv2 callback={() => setIsActive(false)} />}\r
      </TestWrapper>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что кнопка существует
    const activateButton = canvas.getByRole("button", {
      name: /активировать эффект/i
    });
    expect(activateButton).toBeInTheDocument();

    // Проверяем, что эффект не активен изначально
    const confettiCanvas = canvasElement.querySelectorAll("canvas");
    expect(confettiCanvas.length).toBe(0);

    // Нажимаем кнопку активации
    await userEvent.click(activateButton);

    // Ждем появления эффекта
    await new Promise(resolve => setTimeout(resolve, 500));

    // Проверяем, что эффект активировался
    const activeConfettiCanvas = canvasElement.querySelectorAll("canvas");
    expect(activeConfettiCanvas.length).toBeGreaterThan(0);

    // Ждем завершения эффекта
    await new Promise(resolve => setTimeout(resolve, 10500));

    // Проверяем, что эффект завершился
    const finalCanvas = canvasElement.querySelectorAll("canvas");
    expect(finalCanvas.length).toBe(0);
  },
  parameters: {
    docs: {
      description: {
        story: "Эффект конфетти с радужными цветами. Активируется кнопкой и автоматически завершается через 10 секунд."
      }
    }
  }
}`,...l.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isActive, setIsActive] = useState(false);
    return <TestWrapper onActivate={() => setIsActive(true)}>\r
        {isActive && <Firework callback={() => setIsActive(false)} />}\r
      </TestWrapper>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что кнопка существует
    const activateButton = canvas.getByRole("button", {
      name: /активировать эффект/i
    });
    expect(activateButton).toBeInTheDocument();

    // Проверяем, что эффект не активен изначально
    const fireworkCanvas = canvasElement.querySelectorAll("canvas");
    expect(fireworkCanvas.length).toBe(0);

    // Нажимаем кнопку активации
    await userEvent.click(activateButton);

    // Ждем появления эффекта
    await new Promise(resolve => setTimeout(resolve, 500));

    // Проверяем, что эффект активировался
    const activeFireworkCanvas = canvasElement.querySelectorAll("canvas");
    expect(activeFireworkCanvas.length).toBeGreaterThan(0);

    // Ждем завершения эффекта
    await new Promise(resolve => setTimeout(resolve, 10500));

    // Проверяем, что эффект завершился
    const finalCanvas = canvasElement.querySelectorAll("canvas");
    expect(finalCanvas.length).toBe(0);
  },
  parameters: {
    docs: {
      description: {
        story: "Эффект фейерверка. Активируется кнопкой и автоматически завершается через 10 секунд."
      }
    }
  }
}`,...v.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isActive, setIsActive] = useState(false);
    return <TestWrapper onActivate={() => setIsActive(true)}>\r
        {isActive && <EmojiParticles input="🎉🎊🎈" />}\r
      </TestWrapper>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что кнопка существует
    const activateButton = canvas.getByRole("button", {
      name: /активировать эффект/i
    });
    expect(activateButton).toBeInTheDocument();

    // Проверяем, что эффект не активен изначально
    const emojiCanvas = canvasElement.querySelectorAll("canvas");
    expect(emojiCanvas.length).toBe(0);

    // Нажимаем кнопку активации
    await userEvent.click(activateButton);

    // Ждем появления эффекта (эмодзи требуют больше времени для загрузки)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Проверяем, что эффект активировался
    const activeEmojiCanvas = canvasElement.querySelectorAll("canvas");
    expect(activeEmojiCanvas.length).toBeGreaterThan(0);

    // Ждем завершения эффекта
    await new Promise(resolve => setTimeout(resolve, 12000));

    // Проверяем, что эффект завершился
    const finalCanvas = canvasElement.querySelectorAll("canvas");
    expect(finalCanvas.length).toBe(0);
  },
  parameters: {
    docs: {
      description: {
        story: "Эффект частиц эмодзи. Активируется кнопкой и автоматически завершается через 10 секунд. Использует эмодзи из текста."
      }
    }
  }
}`,...u.parameters?.docs?.source}}};const E=["ConfettyEffect","FireworkEffect","EmojiParticlesEffect"];export{l as ConfettyEffect,u as EmojiParticlesEffect,v as FireworkEffect,E as __namedExportsOrder,S as default};
