import{j as o}from"./iframe-PHcFrRmL.js";import{L as a}from"./LayoutCard-CHj3KDep.js";import"./preload-helper-D9Z9MdNV.js";import"./scoreboardStore-CgHsYiJp.js";import"./Button-loYsoPvK.js";import"./index-Chjiymov.js";import"./SignalRHubWrapper-CTmjHOC8.js";import"./index-DwFFu-Uq.js";import"./react-XNwDcf-4.js";import"./Row-C553akRT.js";const{expect:n}=__STORYBOOK_MODULE_TEST__,y={title:"Stream Components/Scoreboard/AdminPanel/LayoutCard",component:a,parameters:{layout:"centered",docs:{description:{component:"Компонент карточки макета для админ-панели скорборда."}}},tags:["autodocs"],decorators:[t=>o.jsx("div",{style:{width:"800px",height:"600px",background:"linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",position:"relative",overflow:"hidden",padding:"20px"},children:o.jsx(t,{})})]},e={args:{},play:async({canvasElement:t})=>{await new Promise(r=>setTimeout(r,100)),n(t).toBeInTheDocument()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...e.parameters?.docs?.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,y as default};
