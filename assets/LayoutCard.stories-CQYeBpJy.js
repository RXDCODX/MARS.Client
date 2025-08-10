import{j as o}from"./iframe-DfjFra_E.js";import{L as a}from"./LayoutCard-CzDlh061.js";import"./scoreboardStore-CdLYDQ0k.js";import"./Button-CxEJlOI-.js";import"./index-Chjiymov.js";import"./SignalRHubWrapper-BMh2Frid.js";import"./index-eIvpPVhI.js";import"./react-dRZq-Y5g.js";import"./Row-BPI2B81y.js";const{expect:n}=__STORYBOOK_MODULE_TEST__,g={title:"Stream Components/Scoreboard/AdminPanel/LayoutCard",component:a,parameters:{layout:"centered",docs:{description:{component:"Компонент карточки макета для админ-панели скорборда."}}},tags:["autodocs"],decorators:[t=>o.jsx("div",{style:{width:"800px",height:"600px",background:"linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",position:"relative",overflow:"hidden",padding:"20px"},children:o.jsx(t,{})})]},e={args:{},play:async({canvasElement:t})=>{await new Promise(r=>setTimeout(r,100)),n(t).toBeInTheDocument()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...e.parameters?.docs?.source}}};const y=["Default"];export{e as Default,y as __namedExportsOrder,g as default};
