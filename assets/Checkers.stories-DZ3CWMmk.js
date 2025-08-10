import{j as n}from"./iframe-DfjFra_E.js";function o(){return n.jsx("div",{})}o.__docgenInfo={description:"",methods:[],displayName:"Checkers"};const{expect:r}=__STORYBOOK_MODULE_TEST__,c={title:"Stream Components/Checkers",component:o,parameters:{layout:"fullscreen",docs:{description:{component:"Компонент для отображения игры в шашки в OBS."}}},tags:["autodocs"],decorators:[t=>n.jsx("div",{style:{width:"100vw",height:"100vh",background:"linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",position:"relative",overflow:"hidden"},children:n.jsx(t,{})})]},e={args:{},play:async({canvasElement:t})=>{await new Promise(s=>setTimeout(s,100)),r(t).toBeInTheDocument()}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {},
  play: async ({
    canvasElement
  }) => {
    // Ждем появления компонента
    await new Promise(resolve => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();
  }
}`,...e.parameters?.docs?.source}}};const i=["Default"];export{e as Default,i as __namedExportsOrder,c as default};
