import{j as p}from"./iframe-PHcFrRmL.js";import{V as u}from"./VisibilityCard-BZeYkUAv.js";import"./preload-helper-D9Z9MdNV.js";import"./useSiteColors-BsKrCtLD.js";import"./scoreboardStore-CgHsYiJp.js";import"./Button-loYsoPvK.js";import"./index-Chjiymov.js";import"./SignalRHubWrapper-CTmjHOC8.js";import"./index-DwFFu-Uq.js";import"./react-XNwDcf-4.js";import"./eye-DCJRkGPt.js";const{expect:t}=__STORYBOOK_MODULE_TEST__,S={title:"Stream Components/Scoreboard/AdminPanel/VisibilityCard",component:u,parameters:{layout:"centered",docs:{description:{component:"Карточка для управления видимостью скорборда и настройки времени анимации."}}},tags:["autodocs"],argTypes:{onVisibilityChange:{action:"visibility changed"},onAnimationDurationChange:{action:"animation duration changed"}},decorators:[e=>p.jsx("div",{style:{width:"400px",padding:"20px",background:"#f8f9fa"},children:p.jsx(e,{})})]},s={args:{isVisible:!0,animationDuration:800},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="visibility-card"]');t(o).toBeInTheDocument()}},r={args:{isVisible:!0,animationDuration:800},parameters:{docs:{description:{story:"Скорборд видим на экране."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),t(e).toBeInTheDocument();const o=e.querySelector('input[type="checkbox"]');t(o).toBeInTheDocument()}},n={args:{isVisible:!1,animationDuration:800},parameters:{docs:{description:{story:"Скорборд скрыт с экрана."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),t(e).toBeInTheDocument();const o=e.querySelector('input[type="checkbox"]');t(o).toBeInTheDocument()}},i={args:{isVisible:!0,animationDuration:300},parameters:{docs:{description:{story:"Быстрая анимация появления/исчезновения."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),t(e).toBeInTheDocument();const o=e.querySelector('input[type="range"]');t(o).toBeInTheDocument()}},c={args:{isVisible:!0,animationDuration:1500},parameters:{docs:{description:{story:"Медленная анимация появления/исчезновения."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll("label");t(o.length).toBeGreaterThan(0)}},m={args:{isVisible:!0,animationDuration:0},parameters:{docs:{description:{story:"Без анимации (мгновенное появление/исчезновение)."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="card"]');t(o).toBeInTheDocument()}},l={args:{isVisible:!0,animationDuration:3e3},parameters:{docs:{description:{story:"Максимальное время анимации."}}},play:async({canvasElement:e})=>{await new Promise(a=>setTimeout(a,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll('[class*="form-control"]');t(o.length).toBeGreaterThan(0)}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isVisible: true,
    animationDuration: 800
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие карточки видимости
    const card = canvasElement.querySelector('[class*="visibility-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isVisible: true,
    animationDuration: 800
  },
  parameters: {
    docs: {
      description: {
        story: "Скорборд видим на экране."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие переключателя видимости
    const toggle = canvasElement.querySelector('input[type="checkbox"]');
    expect(toggle).toBeInTheDocument();
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    isVisible: false,
    animationDuration: 800
  },
  parameters: {
    docs: {
      description: {
        story: "Скорборд скрыт с экрана."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем состояние переключателя
    const toggle = canvasElement.querySelector('input[type="checkbox"]');
    expect(toggle).toBeInTheDocument();
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isVisible: true,
    animationDuration: 300
  },
  parameters: {
    docs: {
      description: {
        story: "Быстрая анимация появления/исчезновения."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие слайдера времени анимации
    const slider = canvasElement.querySelector('input[type="range"]');
    expect(slider).toBeInTheDocument();
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    isVisible: true,
    animationDuration: 1500
  },
  parameters: {
    docs: {
      description: {
        story: "Медленная анимация появления/исчезновения."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие лейбла времени анимации
    const labels = canvasElement.querySelectorAll("label");
    expect(labels.length).toBeGreaterThan(0);
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    isVisible: true,
    animationDuration: 0
  },
  parameters: {
    docs: {
      description: {
        story: "Без анимации (мгновенное появление/исчезновение)."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие карточки
    const card = canvasElement.querySelector('[class*="card"]');
    expect(card).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    isVisible: true,
    animationDuration: 3000
  },
  parameters: {
    docs: {
      description: {
        story: "Максимальное время анимации."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие всех элементов управления
    const controls = canvasElement.querySelectorAll('[class*="form-control"]');
    expect(controls.length).toBeGreaterThan(0);
  }
}`,...l.parameters?.docs?.source}}};const I=["Default","Visible","Hidden","FastAnimation","SlowAnimation","NoAnimation","MaximumAnimation"];export{s as Default,i as FastAnimation,n as Hidden,l as MaximumAnimation,m as NoAnimation,c as SlowAnimation,r as Visible,I as __namedExportsOrder,S as default};
