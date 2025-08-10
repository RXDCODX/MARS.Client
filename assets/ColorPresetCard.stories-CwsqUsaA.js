import{j as p}from"./iframe-DfjFra_E.js";import{C as i}from"./ColorPresetCard-Bbz-8HX_.js";import"./useSiteColors-tsaUY5WF.js";import"./scoreboardStore-CdLYDQ0k.js";import"./Button-CxEJlOI-.js";import"./index-Chjiymov.js";import"./SignalRHubWrapper-BMh2Frid.js";import"./index-eIvpPVhI.js";import"./react-dRZq-Y5g.js";import"./eye-DOi86Vlm.js";import"./Row-BPI2B81y.js";const{expect:t}=__STORYBOOK_MODULE_TEST__,I={title:"Stream Components/Scoreboard/AdminPanel/ColorPresetCard",component:i,parameters:{layout:"centered",docs:{description:{component:"Карточка для настройки цветовой схемы скорборда. Позволяет изменять все цвета элементов интерфейса."}}},tags:["autodocs"],argTypes:{onColorChange:{action:"color changed"}},decorators:[e=>p.jsx("div",{style:{width:"600px",padding:"20px",background:"#f8f9fa"},children:p.jsx(e,{})})]},s={args:{},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const r=e.querySelector('[class*="color-preset-card"]');t(r).toBeInTheDocument()}},a={args:{},parameters:{docs:{description:{story:"Синяя цветовая схема для скорборда."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const r=e.querySelectorAll('input[type="color"]');t(r.length).toBeGreaterThan(0)}},n={args:{},parameters:{docs:{description:{story:"Красная цветовая схема для скорборда."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const r=e.querySelectorAll("button");t(r.length).toBeGreaterThan(0)}},c={args:{},parameters:{docs:{description:{story:"Зеленая цветовая схема для скорборда."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const r=e.querySelectorAll('input[type="range"]');t(r.length).toBeGreaterThan(0)}},l={args:{},parameters:{docs:{description:{story:"Фиолетовая цветовая схема для скорборда."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const r=e.querySelectorAll("label");t(r.length).toBeGreaterThan(0)}},m={args:{},parameters:{docs:{description:{story:"Кастомная цветовая схема с индивидуальными настройками."}}},play:async({canvasElement:e})=>{await new Promise(o=>setTimeout(o,100)),t(e).toBeInTheDocument();const r=e.querySelectorAll('[class*="color-control"]');t(r.length).toBeGreaterThan(0)}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие карточки цветов
    const card = canvasElement.querySelector('[class*="color-preset-card"]');
    expect(card).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Синяя цветовая схема для скорборда."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие цветовых полей
    const colorInputs = canvasElement.querySelectorAll('input[type="color"]');
    expect(colorInputs.length).toBeGreaterThan(0);
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Красная цветовая схема для скорборда."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие пресетов
    const presetButtons = canvasElement.querySelectorAll("button");
    expect(presetButtons.length).toBeGreaterThan(0);
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Зеленая цветовая схема для скорборда."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие полей прозрачности
    const transparencyInputs = canvasElement.querySelectorAll('input[type="range"]');
    expect(transparencyInputs.length).toBeGreaterThan(0);
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Фиолетовая цветовая схема для скорборда."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие лейблов цветов
    const labels = canvasElement.querySelectorAll("label");
    expect(labels.length).toBeGreaterThan(0);
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Кастомная цветовая схема с индивидуальными настройками."
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(canvasElement).toBeInTheDocument();

    // Проверяем наличие всех элементов управления цветом
    const colorControls = canvasElement.querySelectorAll('[class*="color-control"]');
    expect(colorControls.length).toBeGreaterThan(0);
  }
}`,...m.parameters?.docs?.source}}};const D=["Default","BlueTheme","RedTheme","GreenTheme","PurpleTheme","CustomColors"];export{a as BlueTheme,m as CustomColors,s as Default,c as GreenTheme,l as PurpleTheme,n as RedTheme,D as __namedExportsOrder,I as default};
