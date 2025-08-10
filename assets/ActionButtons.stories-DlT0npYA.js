import{j as p}from"./iframe-PHcFrRmL.js";import{A as l}from"./ActionButtons-C2gPUM5g.js";import"./preload-helper-D9Z9MdNV.js";import"./Button-loYsoPvK.js";import"./index-Chjiymov.js";import"./arrow-repeat-j2VKlrAk.js";const{expect:t}=__STORYBOOK_MODULE_TEST__,S={title:"Stream Components/Scoreboard/AdminPanel/ActionButtons",component:l,parameters:{layout:"centered",docs:{description:{component:"Кнопки действий для управления скорбордом: смена имен игроков, смена позиций и сброс настроек."}}},tags:["autodocs"],argTypes:{onSwapNames:{action:"swap names clicked"},onSwapPlayers:{action:"swap players clicked"},onReset:{action:"reset clicked"}},decorators:[e=>p.jsx("div",{style:{width:"300px",padding:"20px",background:"#f8f9fa"},children:p.jsx(e,{})})]},n={args:{},play:async({canvasElement:e})=>{await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll("button");t(o.length).toBeGreaterThan(0)}},a={args:{},parameters:{docs:{description:{story:"Все кнопки действий доступны."}}},play:async({canvasElement:e})=>{await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll("button");t(o.length).toBe(3)}},r={args:{},parameters:{docs:{description:{story:"Кнопка для смены имен игроков."}}},play:async({canvasElement:e})=>{await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('button[title*="names"]');t(o).toBeInTheDocument()}},c={args:{},parameters:{docs:{description:{story:"Кнопка для смены позиций игроков."}}},play:async({canvasElement:e})=>{await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('button[title*="players"]');t(o).toBeInTheDocument()}},m={args:{},parameters:{docs:{description:{story:"Кнопка для сброса всех настроек."}}},play:async({canvasElement:e})=>{await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('button[title*="reset"]');t(o).toBeInTheDocument()}},i={args:{},parameters:{docs:{description:{story:"Различные стили кнопок действий."}}},play:async({canvasElement:e})=>{await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelectorAll("i");t(o.length).toBeGreaterThan(0)}},u={args:{},parameters:{docs:{description:{story:"Адаптивная компоновка кнопок действий."}}},play:async({canvasElement:e})=>{await new Promise(s=>setTimeout(s,100)),t(e).toBeInTheDocument();const o=e.querySelector('[class*="action-buttons"]');t(o).toBeInTheDocument()}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие кнопок действий
    const buttons = canvasElement.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Все кнопки действий доступны."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие всех трех кнопок
    const buttons = canvasElement.querySelectorAll("button");
    expect(buttons.length).toBe(3);
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Кнопка для смены имен игроков."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие кнопки смены имен
    const swapNamesButton = canvasElement.querySelector('button[title*="names"]');
    expect(swapNamesButton).toBeInTheDocument();
  }
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Кнопка для смены позиций игроков."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие кнопки смены игроков
    const swapPlayersButton = canvasElement.querySelector('button[title*="players"]');
    expect(swapPlayersButton).toBeInTheDocument();
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Кнопка для сброса всех настроек."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие кнопки сброса
    const resetButton = canvasElement.querySelector('button[title*="reset"]');
    expect(resetButton).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Различные стили кнопок действий."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие иконок в кнопках
    const icons = canvasElement.querySelectorAll("i");
    expect(icons.length).toBeGreaterThan(0);
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Адаптивная компоновка кнопок действий."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие контейнера кнопок
    const container = canvasElement.querySelector('[class*="action-buttons"]');
    expect(container).toBeInTheDocument();
  }
}`,...u.parameters?.docs?.source}}};const g=["Default","AllButtons","SwapNamesButton","SwapPlayersButton","ResetButton","ButtonStyles","ResponsiveLayout"];export{a as AllButtons,i as ButtonStyles,n as Default,m as ResetButton,u as ResponsiveLayout,r as SwapNamesButton,c as SwapPlayersButton,g as __namedExportsOrder,S as default};
