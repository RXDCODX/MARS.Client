import{j as o}from"./iframe-PHcFrRmL.js";import{W as a}from"./WaifuRoulette-DvR85TOI.js";import"./preload-helper-D9Z9MdNV.js";import"./animate.module-CI42XwLX.js";import"./index-Dh_JeCgC.js";import"./index-mUHz-xqE.js";import"./index-Chjiymov.js";import"./index-DRkwuvcd.js";import"./index-DwFFu-Uq.js";import"./react-XNwDcf-4.js";const{expect:n}=__STORYBOOK_MODULE_TEST__,g={title:"Stream Components/WaifuAlerts/WaifuRoulette",component:a,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент рулетки для вайфу-алертов с анимацией вращения."}}},tags:["autodocs"],decorators:[t=>o.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",position:"relative",overflow:"hidden"},children:o.jsx(t,{})})]},e={args:{},play:async({canvasElement:t})=>{await new Promise(r=>setTimeout(r,100)),n(t).toBeInTheDocument()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...e.parameters?.docs?.source}}};const h=["Default"];export{e as Default,h as __namedExportsOrder,g as default};
