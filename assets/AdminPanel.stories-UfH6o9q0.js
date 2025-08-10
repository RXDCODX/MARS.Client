import{j as l}from"./iframe-Bw5_no3n.js";import{A as p}from"./AdminPanel-Dzb0udnv.js";import{B as u}from"./chunk-QMGIS6GS-CYurCrJ-.js";import"./useSiteColors-oiAPT-7H.js";import"./Button-CBcFMe1P.js";import"./index-Chjiymov.js";import"./ActionButtons-CaC4byEC.js";import"./arrow-repeat-BPrGvQ0H.js";import"./ColorPresetCard-DMp19ThP.js";import"./scoreboardStore-DM3pdCVt.js";import"./SignalRHubWrapper-D3b8O9dU.js";import"./index-C0K1p5z2.js";import"./react-aIfyORke.js";import"./eye-Bh0rvMsD.js";import"./MetaPanel-2NPDBR96.js";import"./PlayerCard-CTOrfuMv.js";import"./index-CD2mETMy.js";import"./index-CWENsiQl.js";import"./index-tHvxiBO9.js";import"./VisibilityCard-B464IxFV.js";const{expect:t}=__STORYBOOK_MODULE_TEST__,b={title:"Admin Panel/Scoreboard Admin",component:p,parameters:{layout:"fullscreen",docs:{description:{component:"Панель администратора для управления скорбордом. Позволяет настраивать игроков, цвета, видимость и мета-информацию."}}},tags:["autodocs"],decorators:[e=>l.jsx(u,{children:l.jsx("div",{style:{width:"100vw",height:"100vh",background:"#f8f9fa",position:"relative",overflow:"auto"},children:l.jsx(e,{})})})]},a={args:{},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="adminPanel"]');t(o).toBeInTheDocument()}},s={args:{},parameters:{docs:{description:{story:"Панель администратора в десктопном режиме с полным функционалом."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll('[class*="player-card"]');t(o.length).toBeGreaterThan(0)}},n={args:{},parameters:{docs:{description:{story:"Панель администратора в мобильном режиме (автоматический редирект на /admin)."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="admin-panel"]');t(o).toBeInTheDocument()}},c={args:{},parameters:{docs:{description:{story:"Панель с предустановленными данными игроков и турнира."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll("button");t(o.length).toBeGreaterThan(0)}},m={args:{},parameters:{docs:{description:{story:"Панель с акцентом на настройку цветов скорборда."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll('input[type="color"]');t(o.length).toBeGreaterThan(0)}},i={args:{},parameters:{docs:{description:{story:"Панель с акцентом на управление данными игроков."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll('input[type="text"]');t(o.length).toBeGreaterThan(0)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие основных панелей
    const adminPanel = canvasElement.querySelector('[class*="adminPanel"]');
    expect(adminPanel).toBeInTheDocument();
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Панель администратора в десктопном режиме с полным функционалом."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие карточек игроков
    const playerCards = canvasElement.querySelectorAll('[class*="player-card"]');
    expect(playerCards.length).toBeGreaterThan(0);
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Панель администратора в мобильном режиме (автоматический редирект на /admin)."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // В мобильном режиме должен произойти редирект
    // Проверяем базовую структуру
    const container = canvasElement.querySelector('[class*="admin-panel"]');
    expect(container).toBeInTheDocument();
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Панель с предустановленными данными игроков и турнира."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие элементов управления
    const actionButtons = canvasElement.querySelectorAll("button");
    expect(actionButtons.length).toBeGreaterThan(0);
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Панель с акцентом на настройку цветов скорборда."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие цветовых настроек
    const colorInputs = canvasElement.querySelectorAll('input[type="color"]');
    expect(colorInputs.length).toBeGreaterThan(0);
  }
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Панель с акцентом на управление данными игроков."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие полей ввода для игроков
    const textInputs = canvasElement.querySelectorAll('input[type="text"]');
    expect(textInputs.length).toBeGreaterThan(0);
  }
}`,...i.parameters?.docs?.source}}};const j=["Default","Desktop","Mobile","WithCustomData","ColorCustomization","PlayerManagement"];export{m as ColorCustomization,a as Default,s as Desktop,n as Mobile,i as PlayerManagement,c as WithCustomData,j as __namedExportsOrder,b as default};
