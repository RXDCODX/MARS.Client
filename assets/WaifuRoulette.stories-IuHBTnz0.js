import{j as o}from"./iframe-DfjFra_E.js";import{W as a}from"./WaifuRoulette-9MDMxMK0.js";import"./animate.module-CI42XwLX.js";import"./index-DDUjKJzf.js";import"./index-73zqftOg.js";import"./index-Chjiymov.js";import"./index-oSaGBWdX.js";import"./index-eIvpPVhI.js";import"./react-dRZq-Y5g.js";const{expect:n}=__STORYBOOK_MODULE_TEST__,v={title:"Stream Components/WaifuAlerts/WaifuRoulette",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент рулетки для вайфу-алертов с анимацией вращения."}}},tags:["autodocs"],decorators:[t=>o.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:o.jsx(t,{})})]},e={args:{},play:async({canvasElement:t})=>{await new Promise(r=>setTimeout(r,100)),n(t).toBeInTheDocument()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...e.parameters?.docs?.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,v as default};
