import{j as p}from"./iframe-PHcFrRmL.js";import{A as l}from"./AdminPanel-317I9hJF.js";import{B as u}from"./chunk-QMGIS6GS-DUqn_Z09.js";import"./preload-helper-D9Z9MdNV.js";import"./useSiteColors-BsKrCtLD.js";import"./Button-loYsoPvK.js";import"./index-Chjiymov.js";import"./ActionButtons-C2gPUM5g.js";import"./arrow-repeat-j2VKlrAk.js";import"./ColorPresetCard-DFlDj8dV.js";import"./scoreboardStore-CgHsYiJp.js";import"./SignalRHubWrapper-CTmjHOC8.js";import"./index-DwFFu-Uq.js";import"./react-XNwDcf-4.js";import"./eye-DCJRkGPt.js";import"./Row-C553akRT.js";import"./LayoutCard-CHj3KDep.js";import"./MetaPanel-D89qBjud.js";import"./PlayerCard-9pBg6370.js";import"./index-Dh_JeCgC.js";import"./index-mUHz-xqE.js";import"./index-DRkwuvcd.js";import"./VisibilityCard-BZeYkUAv.js";const{expect:t}=__STORYBOOK_MODULE_TEST__,O={title:"Stream Components/Scoreboard/AdminPanel",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Панель администратора для управления скорбордом. Позволяет настраивать игроков, цвета, видимость и мета-информацию."}}},tags:["autodocs"],decorators:[e=>p.jsx(u,{children:p.jsx("div",{style:{width:"100vw",height:"100vh",background:"#f8f9fa",position:"relative",overflow:"auto"},children:p.jsx(e,{})})})]},a={args:{},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="adminPanel"]');t(o).toBeInTheDocument()}},s={args:{},parameters:{docs:{description:{story:"Панель администратора в десктопном режиме с полным функционалом."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll('[class*="player-card"]');t(o.length).toBeGreaterThan(0)}},n={args:{},parameters:{docs:{description:{story:"Панель администратора в мобильном режиме (автоматический редирект на /admin)."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="admin-panel"]');t(o).toBeInTheDocument()}},c={args:{},parameters:{docs:{description:{story:"Панель с предустановленными данными игроков и турнира."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll("button");t(o.length).toBeGreaterThan(0)}},m={args:{},parameters:{docs:{description:{story:"Панель с акцентом на настройку цветов скорборда."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll('input[type="color"]');t(o.length).toBeGreaterThan(0)}},i={args:{},parameters:{docs:{description:{story:"Панель с акцентом на управление данными игроков."}}},play:async({canvasElement:e})=>{await new Promise(r=>setTimeout(r,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll('input[type="text"]');t(o.length).toBeGreaterThan(0)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const k=["Default","Desktop","Mobile","WithCustomData","ColorCustomization","PlayerManagement"];export{m as ColorCustomization,a as Default,s as Desktop,n as Mobile,i as PlayerManagement,c as WithCustomData,k as __namedExportsOrder,O as default};
